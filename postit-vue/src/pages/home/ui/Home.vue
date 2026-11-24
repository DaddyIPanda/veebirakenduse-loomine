<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import PostCard from '../../../shared/ui/components/PostCard.vue'

const store = useStore()
const posts = computed(() => store.getters.sortedPosts)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

onMounted(() => {
  // Загружаем посты только если их еще нет в хранилище
  if (store.state.posts.length === 0) {
    store.dispatch('fetchPosts')
  }
})
</script>

<template>
  <!-- Остался только main, никаких header -->
  <main class="feed-layout">
    <aside class="side-panel"></aside>
    <section class="feed">
      <h1 class="feed-title">Latest posts</h1>
      <div class="posts-list">
        <p v-if="loading">Loading posts...</p>
        <p v-else-if="error" style="color:red;">Error loading posts.</p>
        <template v-else>
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </template>
      </div>
    </section>
    <aside class="side-panel"></aside>
  </main>
</template>
