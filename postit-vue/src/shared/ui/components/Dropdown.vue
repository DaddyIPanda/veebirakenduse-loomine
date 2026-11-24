<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function handleDocClick(e: MouseEvent) {
  // Если кликнули вне контейнера с меню — закрываем
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleDocClick))
onBeforeUnmount(() => document.removeEventListener('click', handleDocClick))
</script>

<template>
  <div class="profile-menu-container" ref="containerRef">
    <a class="profile" href="#" id="profileBtn" aria-label="User menu" @click.prevent="toggle">
      <span class="material-symbols-outlined">account_circle</span>
    </a>
    <!-- Обрати внимание на :class="{ show: isOpen }" -->
    <div class="dropdown-menu" :class="{ show: isOpen }" id="profileDropdown">
      <div class="dropdown-header">
        <strong>Jaan Tamm</strong>
        <span>jaan.tamm@example.com</span>
      </div>
      <hr>
      <RouterLink to="/login" class="logout-btn" @click="isOpen = false">Logout</RouterLink>
    </div>
  </div>
</template>
