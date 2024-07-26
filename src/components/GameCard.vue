<script setup lang="ts">
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'

import type { Game } from '~/types'

const props = defineProps<{
  game: Game
}>()

const teamWinner = computed(() => {
  if (props.game.teams[0].score > props.game.teams[1].score)
    return 0
  else if (props.game.teams[0].score < props.game.teams[1].score)
    return 1
  else
    return -1
})
</script>

<template>
  <Card>
    <template #title>
      <div class="card">
        <div class="name">
          <div class="team flex justify-start">
            <Avatar v-tooltip.top="game.teams[0].players[0].player_name" :class="{ 'winner-logo': teamWinner === 0 }" :label="game.teams[0].players[0].player_name.charAt(0)" class="mr-2" size="medium" shape="circle" />
            <Avatar v-if="game.teams[0].players.length > 1" v-tooltip.top="game.teams[0].players[1].player_name" :class="{ 'winner-logo': teamWinner === 0 }" :label="game.teams[0].players[1].player_name.charAt(0)" class="mr-2" size="medium" shape="circle" />
          </div>
          vs
          <div class="team flex justify-end">
            <Avatar v-tooltip.top="game.teams[1].players[0].player_name" :class="{ 'winner-logo': teamWinner === 1 }" :label="game.teams[1].players[0].player_name.charAt(0)" class="mr-2" size="medium" shape="circle" />
            <Avatar v-if="game.teams[1].players.length > 1" v-tooltip.top="game.teams[1].players[1].player_name" :class="{ 'winner-logo': teamWinner === 1 }" label="P" class="mr-2" size="medium" shape="circle" />
          </div>
        </div>
        <div>
          <span>{{ game.teams[0].score }}</span>
          -
          <span>{{ game.teams[1].score }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.players-list-container {
  vertical-align: middle;
  align-self: center;
}
:deep(.p-card-body) {
  padding: 10px 25px !important ;
  gap: 0 !important;
}

.team {
  width: 80px;
}
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  font-size: 16px;
  .name {
    font-size: 16px;
    gap: 1rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
  }
}

.winner-logo {
  border: 2px solid green;
}
</style>
