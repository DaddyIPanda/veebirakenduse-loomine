<script setup lang="ts">
// Provides the demo login form and returns to the home page after submission.
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '../../../shared/config/routes'

const router = useRouter()
const email = ref('')
const password = ref('')

function onSubmit() {
  router.push('/')
}
</script>

<template>
  <main class="form-layout">
    <section class="form-card login-card">
      <h1>Welcome to SnatchPost</h1>
      <RouterLink :to="ROUTES.signup">Create an account</RouterLink>
      <p>or<br><br>Please log in</p>

      <form @submit.prevent="onSubmit">
        <input id="email" type="email" placeholder="Email" v-model="email" required>
        <input id="password" type="password" placeholder="Password" v-model="password" required>
        <button type="submit">Login</button>
      </form>

      <a href="#password-note">Forgot password</a>
      <p id="password-note" class="form-note">Password recovery is outside this static demo.</p>
    </section>
  </main>
</template>
