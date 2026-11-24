<script setup lang="js">
// Loads the shared post feed once and exposes its state to the page.
import ResetLikes from '../../../widgets/reset-likes/ui/ResetLikes.vue'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import PostCard from '../../../shared/ui/components/PostCard.vue'

const store = useStore()
const posts = computed(() => store.getters.sortedPosts)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

onMounted(() => {
  // Avoid refetching posts already held in the global store.
  if (store.state.posts.length === 0) {
    store.dispatch('fetchPosts')
  }
})
</script>

<template>
  <main class="feed-layout">
    <aside class="side-panel" aria-label="Left decorative panel"></aside>
    <section class="feed" aria-label="Posts">
      <h1 class="feed-title">Latest posts</h1>
      <div class="posts-list">
        <p v-if="loading">Loading posts...</p>
        <p v-else-if="error" style="color:red;">Error loading posts.</p>
        <template v-else>
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </template>
      </div>
    </section>
    <aside class="side-panel" aria-label="Right decorative panel"></aside>
  </main>
  <ResetLikes />
</template>