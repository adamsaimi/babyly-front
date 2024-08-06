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
          <span style="padding-left: 50px;" class="name">Name</span>
          <div class="score-header flex justify-between">
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
@import '../assets/variables.scss';
.forms {
  display: flex;
  justify-content: center;
  height: 100%;
  text-align: center;
  position: relative;
}

.players-list-container {
  vertical-align: middle;
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

@include phone {
  .forms {
    width: 100%;
    padding: 0 15px !important;
  }

  .players-list-container {
    width: 100%;
  }

  .name {
    font-size: 12px;
  }
  .score-header {
    width: 40%;
    gap: 1rem;
    font-size: 12px;
  }
}

@include computer {
  .players-list-container {
    width: 800px;
  }
  .score-header {
    gap: 2.5rem;
  }
}
</style>
