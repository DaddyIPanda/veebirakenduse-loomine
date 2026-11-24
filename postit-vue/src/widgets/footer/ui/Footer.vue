<script setup>
// Displays the shared site footer with an automatically updated copyright year.
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <small>© {{ currentYear }} SnatchPost. All rights reserved.</small>
  </footer>
</template>
