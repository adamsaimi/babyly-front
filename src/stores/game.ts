import { defineStore } from 'pinia'
import type { Game } from '~/types'

export const useGameStore = defineStore('game', {
  state: () => {
    return {
      count: 0,
      next: '',
      previous: '',
      results: [] as Game[],
    }
  },

  actions: {
    async saveGame(body: any) {
      // save the game
      const resp = await fetch('/api/games/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      return await resp.json()
    },
    async getGames() {
      // save the game
      const resp = await fetch('/api/games/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      this.$state = await resp.json()

      return this.$state.results
    },
  },
})
