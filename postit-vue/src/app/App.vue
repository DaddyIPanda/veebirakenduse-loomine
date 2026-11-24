<script setup lang="ts">
// Composes the shared application shell around the route selected by Vue Router.
import Footer from '../widgets/footer/ui/Footer.vue'
import Header from '../widgets/header/ui/Header.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>
