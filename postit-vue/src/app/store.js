// Centralizes post data and actions, including like counts persisted in browser storage.
import { createStore } from 'vuex'
import initialPosts from '../../../public/posts/page-1.json'
import { ENDPOINTS } from '../shared/config/endpoints'

const LIKE_COUNTS_STORAGE_KEY = 'snatchpost-like-counts'

function readSavedLikeCounts() {
  let savedCounts
  try {
    savedCounts = window.localStorage.getItem(LIKE_COUNTS_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to read saved like counts:', error)
    return {}
  }

  if (!savedCounts) return {}

  let parsedCounts
  try {
    parsedCounts = JSON.parse(savedCounts)
  } catch (error) {
    // Ignore malformed stored data after reporting it so the feed can still load.
    console.error('Failed to parse saved like counts:', error)
    return {}
  }

  if (parsedCounts && typeof parsedCounts === 'object' && !Array.isArray(parsedCounts)) {
    return parsedCounts
  }

  console.error('Saved like counts must be an object.')
  return {}
}

function postsWithLikes(posts, savedCounts) {
  return posts.map((post) => {
    const savedCount = savedCounts[post.id]
    const likes = Number.isFinite(savedCount) && savedCount >= 0
      ? savedCount
      : Number.isFinite(post.likes) && post.likes >= 0
        ? post.likes
        : 0

    return { ...post, likes }
  })
}

function persistLikeCounts(posts, preserveExisting = false) {
  const counts = preserveExisting ? readSavedLikeCounts() : {}
  posts.forEach((post) => {
    counts[post.id] = post.likes
  })
  window.localStorage.setItem(LIKE_COUNTS_STORAGE_KEY, JSON.stringify(counts))
}

export default createStore({
  state: {
    posts: postsWithLikes(initialPosts, readSavedLikeCounts()),
    loading: false,
    error: null,
    hasMorePosts: true,
    nextPostsPage: 2,
  },
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
      })
    },
    likeCount: (state) => (postId) => state.posts.find((post) => post.id === postId)?.likes ?? 0,
  },
  mutations: {
    SET_LOADING(state, v) { state.loading = v },
    SET_ERROR(state, e) { state.error = e },
    APPEND_POSTS(state, { posts, savedCounts }) {
      state.posts.push(...postsWithLikes(posts, savedCounts))
    },
    SET_NEXT_POSTS_PAGE(state, page) { state.nextPostsPage = page },
    SET_HAS_MORE_POSTS(state, hasMore) { state.hasMorePosts = hasMore },
    ADD_POST(state, post) { state.posts.push(post) },
    INCREMENT_LIKE(state, postId) {
      const post = state.posts.find((item) => item.id === postId)
      if (post) post.likes += 1
    },
    RESET_LIKES(state) {
      state.posts.forEach((post) => {
        post.likes = 0
      })
    },
  },
  actions: {
    async fetchNextPosts({ commit, state }) {
      if (state.loading || !state.hasMorePosts) return

      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const page = state.nextPostsPage
        const response = await fetch(ENDPOINTS.postsPage(page))
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
        
        const posts = await response.json()
        if (!Array.isArray(posts)) throw new Error('Invalid data format')
        
        commit('APPEND_POSTS', { posts, savedCounts: readSavedLikeCounts() })
        commit('SET_NEXT_POSTS_PAGE', page + 1)
        commit('SET_HAS_MORE_POSTS', posts.length === ENDPOINTS.postsPageSize)
      } catch (e) {
        console.error('Failed to load more posts:', e)
        commit('SET_ERROR', e.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    likePost({ commit, state }, postId) {
      const post = state.posts.find((item) => item.id === postId)
      if (!post) throw new Error(`Post ${postId} was not found.`)

      // Persist the next count before changing Vuex state so failed writes are visible.
      const updatedPosts = state.posts.map((item) => (
        item.id === postId ? { ...item, likes: item.likes + 1 } : item
      ))
      persistLikeCounts(updatedPosts, true)
      commit('INCREMENT_LIKE', postId)
    },
    resetAllLikes({ commit, state }) {
      persistLikeCounts(state.posts.map((post) => ({ ...post, likes: 0 })))
      commit('RESET_LIKES')
    },
    async addPost({ commit, state }, { text, file }) {
      let imageUrl = null
      if (file) {
        imageUrl = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      }
      const newPost = {
        id: Math.max(Date.now(), ...state.posts.map((p) => Number(p.id) || 0)) + 1,
        author: 'Jaan Tamm',
        avatar: 'https://i.pravatar.cc/80?img=1',
        createdAt: new Date().toISOString(),
        likes: 0,
        text: text || 'No content provided.',
        image: imageUrl,
      }
      commit('ADD_POST', newPost)
    },
  },
})
