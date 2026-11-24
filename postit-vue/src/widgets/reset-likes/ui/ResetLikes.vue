<script setup lang="ts">
// Resets every post's like count and reports storage failures to the user.
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const errorMessage = ref('')

async function resetLikes() {
  errorMessage.value = ''
  try {
    await store.dispatch('resetAllLikes')
  } catch (error) {
    console.error('Failed to reset likes:', error)
    errorMessage.value = 'Could not reset likes. Please try again.'
  }
}
</script>

<template>
  <section class="reset-likes">
    <button class="reset-likes-button" type="button" @click="resetLikes">
      Reset all likes
    </button>
    <p v-if="errorMessage" class="reset-likes-error" role="alert">{{ errorMessage }}</p>
  </section>
</template>

<style scoped>
.reset-likes {
  max-width: 200px;
  margin: 16px auto;
  padding: 0 18px;
}

.reset-likes-button {
  width: 100%;
  padding: 16px 20px;
  border: 0;
  border-radius: 12px;
  background: #d94f4f;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
}

.reset-likes-button:hover,
.reset-likes-button:focus-visible {
  background: #b83d3d;
}

.reset-likes-button:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 3px;
}

.reset-likes-error {
  color: #ffffff;
  text-align: center;
}
</style>
