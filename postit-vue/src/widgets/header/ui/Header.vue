<script setup lang="ts">
import Dropdown from '../../../shared/ui/components/Dropdown.vue'
import { ROUTES } from '../../../shared/config/routes'
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main navigation">
      <RouterLink :to="ROUTES.home">Home</RouterLink>
      <RouterLink :to="ROUTES.add">Add Post</RouterLink>
    </nav>
    <Dropdown />
  </header>
</template>
