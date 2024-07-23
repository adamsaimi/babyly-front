import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Player {
  id: number
  name: string
  elo: number
  victories: number
  defeats: number
  profile_pic: string
  updated_at: string
  created_at: string
}
export interface Game {
  id: number
  created_at: string
  updated_at: string
  teams: GameTeam[]
}
export interface GameTeam {
  id: number
  game: number
  score: number
  players: GameTeamPlayer[]
}

export interface GameTeamPlayer {
  id: number
  team: number
  player: Player
  player_elo: number
}
