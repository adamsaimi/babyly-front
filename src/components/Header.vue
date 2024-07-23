<script setup lang="ts">
</script>

<template>
  <div class="header">
    <router-link to="/">
      <h1>Babyly</h1>
    </router-link>
    <nav>
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/players">
        Players
      </router-link>
      <router-link to="/games">
        Games
      </router-link>
    </nav>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
  border-bottom: 1px solid #ddd;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
