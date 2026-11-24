import { createStore } from 'vuex'
import { ENDPOINTS } from '../shared/config/endpoints'

export default createStore({
  state: {
    posts: [],
    loading: false,
    error: null,
    likes: {},
  },
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
      })
    },
    likeCount: (state) => (postId) => state.likes[postId] || 0,
  },
  mutations: {
    SET_LOADING(state, v) { state.loading = v },
    SET_ERROR(state, e) { state.error = e },
    SET_POSTS(state, posts) { state.posts = posts },
    ADD_POST(state, post) { state.posts.push(post) },
    INCREMENT_LIKE(state, postId) {
      state.likes[postId] = (state.likes[postId] || 0) + 1
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
        
        commit('SET_POSTS', posts)
      } catch (e) {
        console.error('Failed to load posts:', e)
        commit('SET_ERROR', e.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    likePost({ commit }, postId) {
      commit('INCREMENT_LIKE', postId)
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
        text: text || 'No content provided.',
        image: imageUrl,
      }
      commit('ADD_POST', newPost)
    },
  },
})
