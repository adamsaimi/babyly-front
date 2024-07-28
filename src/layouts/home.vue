<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta
})
</script>

<template>
  <main
    px-4 py-10
  >
    <Header />
    <div class="canvas">
      <TresCanvas>
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
    <RouterView />
  </main>
</template>

<style>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  main {
    height: 100%;
  }
}

.canvas {
  height: calc(100% - 121px);
  width: 100%;
  position: absolute;
  top: 121px;
  z-index: 0;
}

.p-select,
.p-inputnumber,
.p-inputtext {
  border-radius: 4px !important;
}
</style>
