<script setup lang="ts">
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

import InputNumber from 'primevue/inputnumber'

import Select from 'primevue/select'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { TresCanvas } from '@tresjs/core'
import BabyFoot from './BabyFoot.vue'
import { useGameStore } from '~/stores/game'
import { usePlayerStore } from '~/stores/player'

const gameStore = useGameStore()
const playerStore = usePlayerStore()
const game = ref(
  {
    teams: [
      {
        players: [
          { player: '' },
          { player: '' },
        ],
        score: undefined,
      },
      {
        players: [
          { player: '' },
          { player: '' },
        ],
        score: undefined,
      },
    ],
  },
)

const scoreEmpty = computed(() => game.value.teams[0].score == null || game.value.teams[1].score == null)
const canSubmit = computed(() => {
  return validateScore() && validateTeams()
})

function validateTeams() {
  for (const team of game.value.teams) {
    if (team.players[0].player === '' && team.players[1].player === '')
      return false
  }

  return true
}
const renderAudio = ref(false)
const submitted = ref(false)
function validateScore() {
  if (game.value.teams[0].score == null || game.value.teams[1].score == null)
    return false

  if (game.value.teams[0].score === game.value.teams[1].score)
    return false

  renderAudio.value = true
  return true
}
const currentPlayerList = ref<any[]>([])
const currentPlayerUsed = ref<string[]>([])
function saveGame() {
  game.value.teams.forEach((team) => {
    team.players = team.players.filter(el => el.player !== '')
  })

  gameStore.saveGame(game.value).then(() => {
    submitted.value = true
    setTimeout(
      () => { submitted.value = false },
      2000,
    )
    game.value = {
      teams: [
        {
          players: [
            { player: '' },
            { player: '' },
          ],
          score: undefined,
        },
        {
          players: [
            { player: '' },
            { player: '' },
          ],
          score: undefined,
        },
      ],
    }
  })
}

function selectPlayer(playerSelected: any) {
  if (playerSelected)
    currentPlayerUsed.value?.push(playerSelected.name)
  else
    currentPlayerUsed.value = currentPlayerUsed.value?.filter(player => player !== playerSelected.name)
}
function getPlayers() {
  return currentPlayerList.value?.filter(player => !currentPlayerUsed.value?.includes(player.name)).map(
    (player) => {
      return {
        player: player.id,
        name: player.name,
      }
    },
  )
}

onBeforeMount(() => {
  playerStore.getPlayers().then(() => {
    currentPlayerList.value = playerStore.results
  })
})
</script>

<template>
  <div class="canvas">
    <TresCanvas>
      <TresPerspectiveCamera visible :position="[0, 120, 150]" />
      <Suspense>
        <BabyFoot :submitted="submitted" :render-audio="renderAudio" submit-button-id="submitButton" />
      </Suspense>
      <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
    </TresCanvas>
  </div>

  <form class="forms">
    <h2>TEAMS</h2>

    <div class="game-team">
      <div class="team">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <Select v-model="game.teams[0].players[0]" class="select-player" :options="getPlayers()" option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[0].players[0])">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>
                  {{ slotProps.value.name }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <Select v-model="game.teams[0].players[1]" class="select-player" :options="getPlayers()" option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[0].players[1])">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
        </InputGroup>
      </div>

      <div>
        VS
      </div>

      <div class="team">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <Select v-model="game.teams[1].players[0]" class="select-player" :options="getPlayers()" option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[1].players[0])">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>
                  {{ slotProps.value.name }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user" />
          </InputGroupAddon>
          <Select v-model="game.teams[1].players[1]" class="select-player" :options="getPlayers()" option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[1].players[1])">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
        </InputGroup>
      </div>
    </div>

    <h2 style="margin-top: 50px;">
      SCORE
    </h2>

    <div
      class="scores"
    >
      <div class="score">
        <InputNumber v-model="game.teams[0].score" placeholder="Score" aria-label="score" />
        <Message v-if="!scoreEmpty && !validateScore()" severity="error" icon="pi pi-times-circle" />
      </div>

      -
      <div class="score">
        <InputNumber v-model="game.teams[1].score" placeholder="Score" aria-label="score" />
        <Message v-if="!scoreEmpty && !validateScore()" severity="error" icon="pi pi-times-circle" />
      </div>
    </div>

    <Button id="submitButton" class="submit-button" label="Submit" :disabled="!canSubmit" @click.prevent="saveGame()" />
  </form>
</template>

<style lang="scss" scoped>
.forms {
  width: 100%;
  height: calc(50% + 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.team {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
}
.game-team {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
}

.scores {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
  .score {
    display: flex;
    flex-direction: row;
  }
}

.p-inputgroup {
  width: 200px !important;
  height: 50px !important;
}

.submit-button {
  margin-top: 50px;
}
.canvas {
  height: calc(100% - 121px);
  width: 100%;
  position: absolute;
  top: 121px;
  z-index: 0;
}
</style>
