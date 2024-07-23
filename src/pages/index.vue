<script setup lang="ts">
import MatchForms from '~/components/MatchForms.vue'

defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div class="contain">
    <MatchForms
      v-model="name"
      autocomplete="false"
      @keydown.enter="go"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style>
.contain {
  height: calc(100% - 121px);
  width: 100%;
}
</style>
