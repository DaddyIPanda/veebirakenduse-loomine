import { createStore } from 'vuex'
import { ENDPOINTS } from '../shared/config/endpoints'

const LIKE_COUNTS_STORAGE_KEY = 'snatchpost-like-counts'

function readSavedLikeCounts() {
  const savedCounts = window.localStorage.getItem(LIKE_COUNTS_STORAGE_KEY)
  if (!savedCounts) return {}

  let parsedCounts
  try {
    parsedCounts = JSON.parse(savedCounts)
  } catch (error) {
    console.error('Failed to parse saved like counts:', error)
    return {}
  }

  if (parsedCounts && typeof parsedCounts === 'object' && !Array.isArray(parsedCounts)) {
    return parsedCounts
  }

  console.error('Saved like counts must be an object.')
  return {}
}

function persistLikeCounts(posts) {
  const counts = Object.fromEntries(posts.map((post) => [post.id, post.likes]))
  window.localStorage.setItem(LIKE_COUNTS_STORAGE_KEY, JSON.stringify(counts))
}

export default createStore({
  state: {
    posts: [],
    loading: false,
    error: null,
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
    SET_POSTS(state, { posts, savedCounts }) {
      state.posts = posts.map((post) => {
        const savedCount = savedCounts[post.id]
        const likes = Number.isFinite(savedCount) && savedCount >= 0
          ? savedCount
          : Number.isFinite(post.likes) && post.likes >= 0
            ? post.likes
            : 0

        return {
          ...post,
          likes,
        }
      })
    },
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
    async fetchPosts({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const response = await fetch(ENDPOINTS.postsLocal)
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
        
        const posts = await response.json()
        if (!Array.isArray(posts)) throw new Error('Invalid data format')
        
        commit('SET_POSTS', { posts, savedCounts: readSavedLikeCounts() })
      } catch (e) {
        console.error('Failed to load posts:', e)
        commit('SET_ERROR', e.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    likePost({ commit, state }, postId) {
      const post = state.posts.find((item) => item.id === postId)
      if (!post) throw new Error(`Post ${postId} was not found.`)

      const updatedPosts = state.posts.map((item) => (
        item.id === postId ? { ...item, likes: item.likes + 1 } : item
      ))
      persistLikeCounts(updatedPosts)
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
        id: Math.max(0, ...state.posts.map((p) => p.id)) + 1,
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
