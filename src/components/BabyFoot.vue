<script setup lang="ts">
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('Foosball_table.fbx')

const refModel = ref()
</script>

<template>
  <primitive ref="refModel" :scale="0.025" :position="[-4, -3, 0]" :object="model" />
</template>
