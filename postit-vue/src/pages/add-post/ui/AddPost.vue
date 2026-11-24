<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Dropdown from '../../../shared/ui/components/Dropdown.vue'

const store = useStore()
const router = useRouter()
const text = ref('')
const file = ref<File | null>(null)

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  file.value = target.files?.[0] || null
}

async function onSubmit() {
  await store.dispatch('addPost', { text: text.value, file: file.value })
  router.push('/')
}
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/add">Add Post</RouterLink>
    </nav>
    <Dropdown />
  </header>

  <main class="form-layout">
    <section class="form-card">
      <h1>Add a post</h1>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label for="post-body">Post body</label>
          <textarea id="post-body" rows="5" placeholder="Write your message" v-model="text"></textarea>
        </div>
        <div class="field">
          <label for="post-file">Select file</label>
          <input id="post-file" type="file" accept="image/*" @change="onFileChange">
        </div>
        <button type="submit">Create post</button>
      </form>
    </section>
  </main>
</template>
