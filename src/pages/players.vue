<script setup lang="ts">
import PlayersList from '~/components/PlayersList.vue'

defineOptions({
  name: 'PlayersPage',
})
</script>

<template>
  <div class="contain">
    <PlayersList />
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
