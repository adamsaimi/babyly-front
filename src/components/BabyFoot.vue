<script setup lang="ts">
import { defineProps, shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'
import { GlobalAudio, useFBX } from '@tresjs/cientos'

const props = defineProps<{
  submitButtonId: string
  renderAudio: boolean
  submitted: boolean
}>()

const model = await useFBX('Foosball_table.fbx')

const refModel = ref()

const refBall = ref()

const { onBeforeRender } = useLoop()

const radius = ref(0)
onBeforeRender(({ delta }) => {
  if (refBall.value?.position?.y > 78 && props.submitted) {
    refBall.value.position.y -= 0.3
  }
  else if (refBall.value?.position?.y <= 78 && refBall.value?.position?.x < 18 && props.submitted) {
    const angle = refModel.value.rotation.y + Math.PI / 2
    radius.value += 80 * delta * 5
    const x = Math.sin(angle) * radius.value
    const z = Math.cos(angle) * radius.value
    refBall.value.position.set(x, 78, z)
  }
  if (!props.submitted) {
    refBall.value.position.set(0, 110, 0)
    radius.value = 0
  }

  // I will run at every frame ~ 60FPS (depending of your monitor)
})
</script>

<template>
  <TresMesh ref="refBall" cast-shadow :scale="[2, 2, 2]" :position="[0, 110, 0]">
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <primitive ref="refModel" :object="model" :rotation="[0, 1.2, 0]" />
  <GlobalAudio v-if="renderAudio" src="Sound.mp3" play-trigger="submitButton" />
</template>
