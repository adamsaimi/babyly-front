<script setup lang="ts">
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import { usePlayerStore } from '~/stores/player'

import type { Game } from '~/types'

const props = defineProps<{
  game: Game
}>()

const playerStore = usePlayerStore()
const playerList = ref<Player[]>([])

const teamWinner = computed(() => {
  if (props.game.teams[0].score > props.game.teams[1].score)
    return 0
  else if (props.game.teams[0].score < props.game.teams[1].score)
    return 1
  else
    return -1
})

function injectPlayer() {
  props.game.teams[0].players.forEach((el) => {
    const pl = playerList.value.find(pl => pl.id === el.player)
    el.player = pl
  })
  props.game.teams[1].players.forEach((el) => {
    const pl = playerList.value.find(pl => pl.id === el.player)
    el.player = pl
  })
}

onBeforeMount(() => {
  if (playerStore.results.length) {
    playerList.value = playerStore.results
    injectPlayer()
    return
  }
  playerStore.getPlayers().then(() => {
    playerList.value = playerStore.results
    injectPlayer()
  })
})
</script>

<template>
  <Card>
    <template #title>
      <div class="card">
        <div class="name">
          <div class="team flex justify-start">
            <div class="player">
              <Avatar
                v-tooltip.top="game.teams[0].players[0].player_name" :class="{ 'winner-logo': teamWinner === 0 }"
                :image="game.teams[0].players[0].player.profile_pic"
                :label="game.teams[0].players[0].player.profile_pic ? '' : game.teams[0].players[0].player_name.charAt(0)"
                size="medium" shape="circle" class="avatar"
              />
              <div class="win_text">
                +{{ (game.teams[0].players[0].win_elo - game.teams[0].players[0].player_elo).toFixed(1) }}
              </div>
            </div>
            <div v-if="game.teams[0].players.length > 1" class="player">
              <Avatar
                v-tooltip.top="game.teams[0].players[1].player_name" :class="{ 'winner-logo': teamWinner === 0 }"
                :image="game.teams[0].players[1].player.profile_pic"
                :label="game.teams[0].players[1].player.profile_pic ? '' : game.teams[0].players[1].player_name.charAt(0)"
                size="medium" shape="circle" class="avatar"
              />
              <div class="win_text">
                +{{ (game.teams[0].players[1].win_elo - game.teams[0].players[1].player_elo).toFixed(1) }}
              </div>
            </div>
          </div>
          vs
          <div class="team flex justify-end">
            <div class="player">
              <Avatar
                v-tooltip.top="game.teams[1].players[0].player_name" :class="{ 'winner-logo': teamWinner === 1 }"
                :image="game.teams[1].players[0].player.profile_pic"
                :label="game.teams[1].players[0].player.profile_pic ? '' : game.teams[1].players[0]?.player_name?.charAt(0)"
                size="medium" shape="circle" class="avatar"
              />
              <div class="loose_text">
                -{{ (game.teams[1].players[0].win_elo - game.teams[1].players[0].player_elo).toFixed(1) }}
              </div>
            </div>
            <div v-if="game.teams[1].players.length > 1" class="player">
              <Avatar
                v-tooltip.top="game.teams[1].players[1].player_name"
                :image="game.teams[1].players[1].player.profile_pic"
                :label="game.teams[1].players[1].player.profile_pic ? '' : game.teams[1].players[1].player_name.charAt(0)"
                :class="{ 'winner-logo': teamWinner === 1 }" size="medium" shape="circle" class="avatar"
              />
              <div class="loose_text">
                -{{ (game.teams[1].players[1].win_elo - game.teams[1].players[1].player_elo).toFixed(1) }}
              </div>
            </div>
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
  padding: 10px 25px !important;
  gap: 0 !important;
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

  .team {
    .player {
      width: 50px;
      display: flex;
      flex-direction: column;
      margin: 0 5px;

      .avatar {
        margin: auto;
      }

      .loose_text {
        color: red;
      }

      .win_text {
        color: green;
      }
    }
  }
}

.winner-logo {
  border: 2px solid green;
}
</style>
