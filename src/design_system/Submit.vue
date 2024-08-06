<script setup lang="ts">
import { Stars } from '@tresjs/cientos'
import Button from 'primevue/button'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

defineProps<{
  disabled: boolean
  label: string
  size: 'small' | 'normal'
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 1 * delta
})
</script>

<template>
  <div class="custom-submit-button-wrapper">
    <Button
      class="custom-submit-button" label="Submit" :class="[size]" :disabled="disabled" :style="{ backgroundColor: isDark ? 'white' : 'black' }"
      @click="emit('click')"
    >
      <TresCanvas class="button-canvas">
        <Stars
          :rotation="[0, yRotation, 0]"
          :radius="500"
          :depth="50"
          :count="5000"
          :size="10"
        />
      </TresCanvas>
      <span>Submit</span>
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.custom-submit-button-wrapper {
  height: fit-content;
  .custom-submit-button {
    background-color: rgb(255, 255, 255);
    position: relative;
    padding: 0 !important;
    border-radius: 4px;
    border: 0;
    .button-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    span {
      position: absolute;
      z-index: 1;
    }
  }

  .normal {
    width: 130px;
    height: 40px;
  }

  .small {
    width: 100px;
    height: 35px;
  }
}
</style>
