<script setup lang="ts">
import { Stars } from '@tresjs/cientos';
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import Avatar from 'primevue/avatar';
import Card from 'primevue/card';
import ScrollTop from 'primevue/scrolltop';
import { usePlayerStore } from '~/stores/player';
import type { Player } from '../types';

// const playerData = ref<Record<string, never>[] | undefined>()
// player Data: [ Total game played and kda, Rank among players, Lowest elo and highest elo , Longest winning streak and losing streak, Head-to-Head Records ]

const playerStore = usePlayerStore()

const playerList = ref<Player[]>([])
const currentPlayer = ref<Player>()

function selectPlayer(player: Player) {
  currentPlayer.value = player
}
const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta
})

onBeforeMount(() => {
  playerStore.getPlayers().then(() => {
    playerList.value = playerStore.results
  })
})


</script>
<template>
  <div class="wrap-canvas">
    <TresCanvas window-size>
      <Stars
        :rotation="[0, yRotation, 0]"
        :radius="50"
        :depth="50"
        :count="5000"
        :size="0.3"
        :size-attenuation="true"
      />
    </TresCanvas>
  </div>
  <div class="flex flex-col items-center">
    <div class="h-[5rem]" />
    <h1 class="items-center">Choose a player</h1>
    <div class="h-[5rem]" />
    <div class="flex flex-wrap gap-1 avatar-select items-center justify-center">
        <div class="avatar-select-object" v-for="player in playerList" :key="player.id">
          <Avatar v-tooltip.bottom="player?.name" :label="player.name.charAt(0)" style="cursor: grab;" size="large" shape="circle" @click.prevent="selectPlayer(player)"/>
        </div>
    </div>
    <div class="h-[5rem]" />
    <h2 style="font-size: 28px;" class="items-center pa-2" v-if="currentPlayer">Hi {{ currentPlayer?.name }}, here's your season wrap up</h2>
    <div class="h-[5rem]" />
    <div v-if="currentPlayer" class="items-center">
        <span class="slidedown-icon h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
            <i class="pi pi-arrow-down" />
        </span>
    </div>
    <div v-if="currentPlayer">
      <div class="h-[30rem]" />
      <div v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }" class="animate-duration-1000 animate-ease-in-out">
        <div class="review-card">
          <Card class="card">
            <template #header>
              <img width="100%" src="/kda.png" alt="">
            </template>
            <template #title class="card">
              <i class="pi pi-crown"></i> Your KDA
            </template>
            <template #content class="card">
              <h2>You played 30 games, won 30, and lost 10</h2>
            </template>
          </Card>
        </div>
      </div>
      <div class="h-[30rem]" />
      <div v-animateonscroll="{ enterClass: 'animate-fadeinleft', leaveClass: 'animate-fadeoutleft' }" class="animate-duration-1000 animate-ease-in-out">
        <div class="review-card">
          <Card class="card">
            <template #header>
              <img width="100%" src="/rank.png" alt="">
            </template>
            <template #title class="card">
              <i class="pi pi-trophy"></i>
              Your rank
            </template>
            <template #content class="card">
              <h2 class>You are the #1 player out of 20 competitors.</h2>
            </template>
          </Card>
        </div>
      </div>
      <div class="h-[30rem]" />
      <div v-animateonscroll="{ enterClass: 'animate-fadeinright', leaveClass: 'animate-fadeoutright' }" class="animate-duration-1000 animate-ease-in-out">
        <div class="review-card">
          <Card class="card">
            <template #header>
              <img width="100%" src="/elo.png" alt="">
            </template>
            <template #title class="card">
              <i class="pi pi-chart-line"></i>
              Your elo
            </template>
            <template #content class="card">
              <h2 class>You highest elo was 1200 and lowest 700.</h2>
            </template>
          </Card>
        </div>
      </div>
      <div class="h-[30rem]" />
      <div v-animateonscroll="{ enterClass: 'animate-zoomin', leaveClass: 'animate-fadeout' }" class="animate-duration-1000 animate-ease-in-out">
        <div class="review-card">
          <Card class="card">
            <template #header>
              <img width="100%" src="/winstreak.png" alt="">
            </template>
            <template #title class="card">
              <i class="pi pi-hammer"></i>
              Your streaks
            </template>
            <template #content class="card">
              <h2 class>Your record shows a 13-game win streak and a 30-game losing streak.</h2>
            </template>
          </Card>
        </div>
      </div>
      <div class="h-[30rem]" />
      <div v-animateonscroll="{ enterClass: 'animate-flipleft', leaveClass: 'animate-fadeout' }" class="animate-duration-1000 animate-ease-in-out ">
        <div class="review-card">
          <Card class="card">
            <template #header>
              <img width="100%" src="/nemesis.png" alt="">
            </template>
            <template #title class="card">
              <i class="pi pi-shield"></i>
              Your nemesis
            </template>
            <template #content class="card">
              <h2 class>You dominated Thomas with 30 victories, but Alexis handed you 13 defeats.</h2>
            </template>
          </Card>
        </div>
      </div>
      <div class="h-[30rem]" />
    </div>
    <ScrollTop />
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/variables.scss';

@keyframes slidedown-icon {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}

.review-card {
  height: 20rem;
  width: 20rem;
  .p-card {
    height: 100%;
    width: 100%;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 8px 8px 0 0 !important;
  }

  :deep(.p-card-body) {
    border-radius: 0px 0px 8px 8px !important;
  }
}

.avatar-select-object {
  z-index: 1;
  cursor: grab !important;
}

.avatar-select {
  max-width: 700px;
}

.slidedown-icon {
  animation: slidedown-icon;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

.contain {
  height: auto;
}

.wrap-canvas {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 121px;
  left: 0;
  z-index: -1;
}
</style>
