<script setup lang="ts">
import GameCard from './GameCard.vue'
import type { Game } from '~/types'
import { useGameStore } from '~/stores/game'
import { usePlayerStore } from '~/stores/player'

const gameStore = useGameStore()
const gameList = ref<Game[]>([])
const playerStore = usePlayerStore()

onBeforeMount(() => {
  gameStore.getGames().then(() => {
    gameList.value = gameStore.results
  })
  playerStore.getPlayers()
})
</script>

<template>
  <div class="forms">
    <div class="game-list-container">
      <h2>Current Game List</h2>
      <div class="game-list">
        <div class="header">
          <span style="padding-left: 80px;">Players</span>
          <span style="padding-right: 10px;">Score</span>
        </div>
        <div style="overflow: auto; max-height: 450px;">
          <div v-for="game in gameList" :key="game.id" class="game-list-cards">
            <GameCard :game="game" />
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
.game-list-container {
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
    margin-bottom: 1rem;
  }
  h2 {
    margin-bottom: 1rem;
    font-size: 28px;
  }
}

@include phone {
  .forms {
    width: 100%;
    padding: 0 15px !important;
  }
}

.game-list-cards {
  margin-bottom: 10px;
}
</style>
