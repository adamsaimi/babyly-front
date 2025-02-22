<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Avatar from 'primevue/avatar'
import Select from 'primevue/select'
import Message from 'primevue/message'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Levioso } from '@tresjs/cientos'
import BabyFoot from './BabyFoot.vue'
import { useGameStore } from '~/stores/game'
import { usePlayerStore } from '~/stores/player'
import type { GameForm, PlayerForm } from '~/types'
import Submit from '~/design_system/Submit.vue'

const gameStore = useGameStore()
const playerStore = usePlayerStore()
const game = ref<GameForm>(
  {
    teams: [
      {
        players: [
          undefined,
          undefined,
        ],
        score: undefined,
      },
      {
        players: [
          undefined,
          undefined,
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
    if (!team.players[0] && !team.players[1])
      return false
  }

  return true
}

function validateScore() {
  if (game.value.teams[0].score == null || game.value.teams[1].score == null)
    return false

  if (game.value.teams[0].score === game.value.teams[1].score)
    return false

  return true
}
const currentPlayerList = ref<any[]>([])
const currentPlayerUsed = ref<(string | undefined)[]>([undefined, undefined, undefined, undefined])

function saveGame() {
  game.value.teams.forEach((team) => {
    team.players = team.players?.filter(el => !!el?.id)
  })

  gameStore.saveGame(game.value).then(() => {
    game.value = {
      teams: [
        {
          players: [
            undefined,
            undefined,
          ],
          score: undefined,
        },
        {
          players: [
            undefined,
            undefined,
          ],
          score: undefined,
        },
      ],
    }

    currentPlayerUsed.value = [undefined, undefined, undefined, undefined]
  })
}

function selectPlayer(playerSelected: PlayerForm, indexPlayer: 0 | 1 | 2 | 3) {
  currentPlayerUsed.value[indexPlayer] = playerSelected?.name
}

function getPlayers() {
  return currentPlayerList.value?.filter(player => !currentPlayerUsed.value?.includes(player.name)).map(player => ({ ...player, player: player.id }))
}

const camera = ref()
const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta
})

onBeforeMount(() => {
  playerStore.getPlayers().then(() => {
    currentPlayerList.value = playerStore.results
  })
})
</script>

<template>
  <div v-if="isComputer()" class="canvas">
    <TresCanvas>
      <TresPerspectiveCamera ref="camera" visible :zoom="1" :near="0.1" :up="[0, 1, 0]" :fov="50" />
      <Levioso>
        <Suspense>
          <BabyFoot />
        </Suspense>
        <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" />
      </Levioso>
    </TresCanvas>
  </div>

  <form class="forms gameForm">
    <h1>Add a Game</h1>
    <h2>TEAMS</h2>
    <div class="game-team">
      <div class="team team-one" style="align-items: end;">
        <div class="flex flex-row gap-2">
          <Transition name="slide-left">
            <Avatar
              v-if="game.teams[0].players[0]"
              v-style-class="{ enterFromClass: 'my-hidden', enterActiveClass: 'my-fadein' }"
              :image="game.teams[0].players[0].profile_pic"
              :label="game.teams[0].players[0].profile_pic ? '' : game.teams[0].players[0]?.name?.charAt(0)"
              class="avatar-select" size="medium" shape="circle"
            />
          </Transition>
          <Select
            v-model="game.teams[0].players[0]" show-clear class="select-player w-full" :options="getPlayers()"
            option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[0].players[0], 0)"
          >
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
        </div>
        <div class="flex flex-row gap-2">
          <Transition name="slide-left">
            <Avatar
              v-if="game.teams[0].players[1]" :image="game.teams[0].players[1].profile_pic"
              :label="game.teams[0].players[1].profile_pic ? '' : game.teams[0].players[1].name.charAt(0)"
              class="avatar-select" size="medium" shape="circle"
            />
          </Transition>

          <Select
            v-model="game.teams[0].players[1]" show-clear class="select-player" :options="getPlayers()"
            option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[0].players[1], 1)"
          >
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
        </div>
      </div>

      <div>
        VS
      </div>

      <div class="team team-two">
        <div class="flex flex-row gap-2">
          <Select
            v-model="game.teams[1].players[0]" show-clear class="select-player" :options="getPlayers()"
            option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[1].players[0], 2)"
          >
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
          <Transition name="slide-right">
            <Avatar
              v-if="game.teams[1].players[0]"
              v-style-class="{ enterFromClass: 'my-hidden', enterActiveClass: 'my-fadein' }"
              :image="game.teams[1].players[0].profile_pic"
              :label="game.teams[1].players[0].profile_pic ? '' : game.teams[1].players[0]?.name?.charAt(0)"
              class="avatar-select" size="medium" shape="circle"
            />
          </Transition>
        </div>
        <div class="flex flex-row gap-2">
          <Select
            v-model="game.teams[1].players[1]" show-clear class="select-player" :options="getPlayers()"
            option-label="name" placeholder="Select a Player" @change="selectPlayer(game.teams[1].players[1], 3)"
          >
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
          <Transition name="slide-right">
            <Avatar
              v-if="game.teams[1].players[1]"
              v-style-class="{ enterFromClass: 'my-hidden', enterActiveClass: 'my-fadein' }"
              :image="game.teams[1].players[1].profile_pic"
              :label="game.teams[1].players[1].profile_pic ? '' : game.teams[1].players[1]?.name?.charAt(0)"
              class="avatar-select" size="medium" shape="circle"
            />
          </Transition>
        </div>
      </div>
    </div>

    <h2>
      SCORE
    </h2>

    <div class="scores mt-5">
      <div class="score">
        <InputNumber v-model="game.teams[0].score" placeholder="Score" input-id="integeronly" aria-label="score" />
        <Message v-if="!scoreEmpty && !validateScore()" severity="error" icon="pi pi-times-circle" />
      </div>
      <div>
        -
      </div>
      <div class="score">
        <InputNumber v-model="game.teams[1].score" placeholder="Score" input-id="integeronly" aria-label="score" />
        <Message v-if="!scoreEmpty && !validateScore()" severity="error" icon="pi pi-times-circle" />
      </div>
    </div>

    <Submit
      id="submitButton" size="normal" class="submit-button" label="Submit" :disabled="!canSubmit"
      @click="saveGame()"
    />
  </form>
</template>

<style lang="scss" scoped>
@import '../assets/variables.scss';

.gameForm {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    vertical-align: baseline;
    margin-bottom: 20px;
  }

  .select-player {
    height: 40px;
  }

  .avatar-select {
    align-self: center;
  }
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
  gap: 25px;

  .score {
    display: flex;
    flex-direction: row;
  }
}

.canvas {
  height: calc(100% - 121px);
  width: 100%;
  position: absolute;
  top: 121px;
  z-index: 0;
  float: left;
}

.forms {
  position: relative;
}

@include computer {
  .team {
    width: 240px;
  }

  .select-player {
    width: 200px;
  }

  .forms {
    width: 50%;
    float: right;
  }

  .submit-button {
    margin-top: 50px;
  }

  .game-team {
    margin-bottom: 50px;
  }
}

@include phone {
  h1 {
    font-size: 24px;
  }

  .team {
    width: 240px;
  }

  .team-two {
    margin-left: calc(0.5rem + 32px);
  }

  .team-one {
    margin-right: calc(0.5rem + 32px);
  }

  .select-player {
    width: 200px;
  }

  .game-form {
    width: 100%;
  }

  :deep(.p-inputtext) {
    width: 100px !important;
  }

  .game-team {
    flex-direction: column;
    margin-bottom: 10px;
    gap: 10px;
  }

  .submit-button {
    margin-top: 20px;
  }
}

// Animation
.slide-right-enter-active,
.slide-left-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
