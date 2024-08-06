// src/composables/useScreenSize.js
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

export function isPhone() {
  const { width } = useWindowSize()

  const isPhone = computed(() => width.value <= 576)

  return isPhone.value
}

export function isComputer() {
  const { width } = useWindowSize()

  const isComputer = computed(() => width.value > 576)
  return isComputer.value
}
