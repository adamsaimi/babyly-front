<script setup lang="ts">
import Profile from '~/components/Profile.vue'

defineOptions({
  name: 'ProfilePage',
})
const router = useRouter()

onBeforeMount(() => {
  if (isPhone())
    router.push('/')
})
</script>

<template>
  <div class="contain">
    <Profile />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style>
</style>
