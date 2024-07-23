<script setup lang="ts">
import Avatar from 'primevue/avatar'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import FileUpload from 'primevue/fileupload'
import type { Player } from '~/types'

defineProps<{
  player?: Player
  editing?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', player: { name?: string, profile_pic?: any }): void
}>()

const inputPlayer = ref({
  name: undefined,
  profile_pic: undefined as any | undefined,
})
const file = ref()

function submit() {
  emit('submit', inputPlayer.value)
}
function selectFiles(event: { files: string | any[] }) {
  if (event.files.length === 0) {
    inputPlayer.value.profile_pic = undefined
    return
  }

  inputPlayer.value.profile_pic = event.files
}
</script>

<template>
  <Card>
    <template #title>
      <div class="card">
        <div class="name">
          <Avatar v-if="!editing" :label="player?.name.charAt(0)" class="mr-2" size="medium" shape="circle" />
          <span v-if="!editing">{{ player?.name }}</span>
          <span v-if="editing">
            <FileUpload ref="file" name="demo[]" url="/api/upload" :multiple="false" accept="image/*" :max-file-size="1000000" @select="selectFiles">
              <template #header="{ chooseCallback }">
                <Avatar :image="inputPlayer.profile_pic?.objectURL" :label="inputPlayer.profile_pic ? '' : '+'" class="mr-2" size="medium" shape="circle" @click="chooseCallback()" />
              </template>
              <template #content>
                <div />
              </template>
            </FileUpload>
          </span>
          <InputText v-if="editing" v-model="inputPlayer.name" type="text" size="small" placeholder="Add a player" />
        </div>
        <div class="detail flex justify-between gap-10">
          <span v-if="!editing">{{ player?.victories }}</span>
          <span v-if="!editing">{{ player?.defeats }}</span>
          <span v-if="!editing">{{ player?.elo }}</span>
        </div>
        <span v-if="editing" class="submit-button"><Button size="small" @click="submit()">Submit</Button></span>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.players-list-container {
  vertical-align: middle;
  align-self: center;
}
:deep(.p-card-body) {
  padding: 10px 10px !important ;
  gap: 0 !important;
}
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  font-size: 16px;
  .name {
    font-size: 16px;
    gap: 1rem;
    display: flex;
    align-items: center;
    vertical-align: middle;
  }

  :deep(.p-fileupload) {
    border: 0;
    width: 2rem;
    height: 2rem;
    .p-fileupload-header {
      padding: 0;
      width: 2rem;
      height: 2rem;
      .p-avatar {
        margin: 0;
      }
      .p-avatar:hover {
        cursor: pointer;
      }
    }
  }

  .submit-button {
    margin-left: auto;
  }

  .detail {
    width: 211px;
    span {
      width: 70px;
      text-align: center;
    }
  }
}
</style>
