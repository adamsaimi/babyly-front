<script setup lang="ts">
function toggleColorScheme() {
  const element = document.querySelector('html')
  const isDarkMode = element?.classList.toggle('dark-mode-switch')

  toggleDark(isDarkMode)
}

onBeforeMount(() => {
  const element = document.querySelector('html')
  element?.classList.toggle('dark-mode-switch')

  if (isDark.value && !element?.classList.contains('dark-mode-switch'))
    element?.classList.toggle('dark-mode-switch')

  if (!isDark.value && element?.classList.contains('dark-mode-switch'))
    element?.classList.toggle('dark-mode-switch')
},
)
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

    <div class="flex gap-10">
      <button @click="toggleColorScheme()">
        <i v-if="isDark" class="pi pi-moon" />
        <i v-else class="pi pi-sun" />
      </button>
    </div>
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
