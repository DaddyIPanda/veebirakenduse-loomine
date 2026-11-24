<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from '../../../shared/ui/components/Dropdown.vue'

const router = useRouter()
const email = ref('')
const password = ref('')

function onSubmit() {
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
    <section class="form-card login-card">
      <h1>Welcome to SnatchPost</h1>
      <a href="#account-note">Create an account</a>
      <p>or<br><br>Please log in</p>

      <form @submit.prevent="onSubmit">
        <input id="email" type="email" placeholder="Email" v-model="email" required>
        <input id="password" type="password" placeholder="Password" v-model="password" required>
        <button type="submit">Login</button>
      </form>

      <a href="#password-note">Forgot password</a>
      <p id="account-note" class="form-note">Account creation is outside this static demo.</p>
      <p id="password-note" class="form-note">Password recovery is outside this static demo.</p>
    </section>
  </main>
</template>
