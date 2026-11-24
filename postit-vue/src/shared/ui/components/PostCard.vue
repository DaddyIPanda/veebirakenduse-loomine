<script setup>
// Renders one post and reads or updates its like count through Vuex.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
const store = useStore()

const likeCount = computed(() => store.getters.likeCount(props.post.id))
const likeError = ref('')

async function onLike() {
  likeError.value = ''
  try {
    await store.dispatch('likePost', props.post.id)
  } catch (error) {
    console.error('Failed to save like:', error)
    likeError.value = 'Could not save this like. Please try again.'
  }
}

function formatDate(isoString) {
  const date = new Date(isoString)
  if (isNaN(date.getTime())) return isoString
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}

const dateText = computed(() => props.post.createdAt ? formatDate(props.post.createdAt) : 'Unknown date')
</script>

<template>
  <article class="post">
    <header class="post-header">
      <img v-if="post.avatar" class="post-avatar" :src="post.avatar" :alt="`${post.author || 'User'}'s avatar`" width="32" height="32" loading="lazy" decoding="async">
      <span>{{ post.author || 'Anonymous' }}</span>
    </header>

    <img v-if="post.image" class="post-image" :src="post.image" :alt="`Image posted by ${post.author || 'user'}`" loading="lazy" decoding="async">

    <p>{{ post.text || 'No content provided.' }}</p>

    <button type="button" class="like-icon" aria-label="Like this post" @click="onLike">
      👍 <span>{{ likeCount }}</span>
    </button>
    <p v-if="likeError" role="alert">{{ likeError }}</p>

    <time v-if="post.createdAt" :datetime="post.createdAt">{{ dateText }}</time>
    <time v-else>{{ dateText }}</time>
  </article>
</template>
