
<script setup lang="ts">
// Validates signup passwords and returns users to the home page on success.
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '../../../shared/config/routes'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const passwordTouched = ref(false)

const passwordErrors = computed(() => {
  const value = password.value
  const errors = []

  // Keep each failed password rule so the form can explain all violations.
  if (value.length < 8 || value.length >= 15) {
    errors.push('At least 8 characters and fewer than 15 characters')
  }
  if (!/[A-Z]/.test(value)) {
    errors.push('Includes at least one uppercase alphabet character')
  }
  if ((value.match(/[a-z]/g) || []).length < 2) {
    errors.push('Includes at least two lowercase alphabet characters')
  }
  if (!/[0-9]/.test(value)) {
    errors.push('Includes at least one numeric value')
  }
  if (!/^[A-Z]/.test(value)) {
    errors.push('Starts with an uppercase letter')
  }
  if (!value.includes('_')) {
    errors.push('Includes the character "_"')
  }

  return errors
})

const passwordValidationMessage = computed(() => {
  if (!passwordTouched.value || passwordErrors.value.length === 0) return ''
  return `The password is not valid - ${passwordErrors.value.join('; ')}`
})

function onSubmit() {
  passwordTouched.value = true
  if (passwordErrors.value.length > 0) return

  router.push(ROUTES.home)
}
</script>

<template>
  <!-- Collects signup credentials, explains invalid passwords, and offers visibility control. -->
  <main class="form-layout">
    <section class="form-card signup-card">
      <h1>Create an account</h1>

      <form class="signup-form" @submit.prevent="onSubmit">
        <label for="signup-email">Email</label>
        <input
          id="signup-email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="Email"
          required
        >

        <label for="signup-password">Password</label>
        <div class="password-input">
          <input
            id="signup-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            placeholder="Password"
            required
            @input="passwordTouched = true"
            @blur="passwordTouched = true"
          >
          <button
            class="password-toggle"
            type="button"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Hide password' : 'Show password' }}
          </button>
        </div>

        <p v-if="passwordValidationMessage" class="password-error" role="alert">
          {{ passwordValidationMessage }}
        </p>

        <button type="submit">Sign up</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.signup-card {
  text-align: center;
}

.signup-form {
  margin-top: 20px;
  text-align: left;
}

.signup-form input {
  width: 100%;
}

.password-input {
  display: flex;
  align-items: stretch;
  gap: 8px;
}

.password-toggle {
  align-self: stretch;
  padding: 8px;
  font-size: 0.9rem;
  white-space: nowrap;
}

.password-error {
  margin: 0;
  color: #b00020;
}
</style>
