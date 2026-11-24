<script setup lang="ts">
import Dropdown from '../shared/ui/components/Dropdown.vue'
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/add">Add Post</RouterLink>
      <RouterLink to="/add">Add Post</RouterLink>
    </nav>
    <!-- Вызываем умный Vue-компонент дропдауна -->
    <Dropdown />
  </header>

  <!-- Сюда будут подставляться страницы (Login, Home, AddPost) -->
  <RouterView />
  
  <footer class="site-footer">SnatchPost</footer>
</template>
