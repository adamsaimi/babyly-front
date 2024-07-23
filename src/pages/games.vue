<script setup lang="ts">
import GameList from '~/components/GameList.vue'

defineOptions({
  name: 'GamePage',
})
</script>

<template>
  <div class="contain">
    <GameList />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style>
.contain {
  height: calc(100% - 121px);
  width: 100%;
}
</style>
