<script setup lang="js">
// Shows the initial feed immediately and loads later pages on demand.
import ResetLikes from '../../../widgets/reset-likes/ui/ResetLikes.vue'
import { onBeforeUnmount, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import PostCard from '../../../shared/ui/components/PostCard.vue'

const store = useStore()
const posts = computed(() => store.getters.sortedPosts)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)
const hasMorePosts = computed(() => store.state.hasMorePosts)
const loadMoreTrigger = ref(null)
let observer

function loadMorePosts() {
  if (!loading.value && hasMorePosts.value) {
    store.dispatch('fetchNextPosts')
  }
}

function observeLoadMoreTrigger() {
  if (!loadMoreTrigger.value || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      loadMorePosts()
    }
  }, { rootMargin: '250px 0px' })
  observer.observe(loadMoreTrigger.value)
}

onMounted(() => {
  window.addEventListener('scroll', observeLoadMoreTrigger, { once: true, passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', observeLoadMoreTrigger)
  observer?.disconnect()
})
</script>

<template>
  <main class="feed-layout">
    <aside class="side-panel" aria-label="Left decorative panel"></aside>
    <section class="feed" aria-label="Posts">
      <h1 class="feed-title">Latest posts</h1>
      <div class="posts-list">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
        <p v-if="loading" role="status">Loading more posts...</p>
        <div v-if="error" role="alert" class="load-more-error">
          <p>Error loading posts.</p>
          <button type="button" @click="loadMorePosts">Try again</button>
        </div>
        <div v-if="hasMorePosts" ref="loadMoreTrigger" class="load-more-trigger">
          <button type="button" @click="loadMorePosts">Load more posts</button>
        </div>
      </div>
    </section>
    <aside class="side-panel" aria-label="Right decorative panel"></aside>
  </main>
  <ResetLikes />
</template>