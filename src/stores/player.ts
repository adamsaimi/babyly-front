import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      count: 0,
      next: '',
      previous: '',
      results: [],
    }
  },

  actions: {
    async getPlayers(): Promise<any> {
      const resp = await fetch('/api/players/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      this.$state = await resp.json()
      return this.$state
    },
    async savePlayer(body: any) {
      const formData = new FormData();

      if (body.name)
        formData.append('name', body.name);

      if (body.profile_pic)
        formData.append('profile_pic', body.profile_pic);

      // save a player
      const resp = await fetch('/api/players/', {
        method: 'POST',
        body: formData,
      })

      return await resp.json()
    },
  },
})
