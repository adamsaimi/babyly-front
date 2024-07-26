<script setup lang="ts">
import PlayerCard from './PlayerCard.vue'
import { usePlayerStore } from '~/stores/player'
import type { Player } from '~/types'

const playerStore = usePlayerStore()
const isEditing = ref(false)
const playerList = ref<Player[]>([])
function addPlayer(player: { name?: string, profile_pic?: any }) {
  isEditing.value = false
  playerStore.savePlayer(player).then(() => {
    playerStore.getPlayers().then(() => {
      playerList.value = playerStore.results
    })
  })
}
onBeforeMount(() => {
  playerStore.getPlayers().then(() => {
    playerList.value = playerStore.results
  })
})
</script>

<template>
  <div class="forms">
    <div class="players-list-container">
      <h2>Current Player List</h2>
      <div class="players-list">
        <div class="header">
          <span style="padding-left: 50px;">Name</span>
          <div class="flex justify-between gap-10">
            <span>Victory</span>
            <span>Defeat</span>
            <span>Elo</span>
          </div>
        </div>
        <div class="add-player-button">
          <button @click="isEditing = !isEditing">
            +
          </button>
          <PlayerCard v-if="isEditing" :editing="true" @submit="addPlayer" />
        </div>
        <div style="overflow: auto; max-height: 450px;">
          <div v-for="player in playerList" :key="player.id" class="player-list-cards">
            <PlayerCard :player="player" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forms {
  display: flex;
  justify-content: center;
  height: 100%;
  text-align: center;
}
.players-list-container {
  vertical-align: middle;
  width: 800px;
  padding-top: 30px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
  }
  .add-player-button {
    margin-bottom: 1rem;
  }
  h2 {
    margin-bottom: 1rem;
    font-size: 28px;
  }
}

.player-list-cards {
  margin-bottom: 10px;
}
</style>
