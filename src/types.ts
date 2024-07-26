import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Player {
  id: number
  name: string
  elo: number
  victories: number
  defeats: number
  profile_pic: string
}

export interface GameForm {
  teams: GameTeamForm[]
}

export interface GameTeamForm {
  players: PlayerForm[]
  score?: number
}
export type PlayerForm = Player | undefined

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
  player_name: any
  id: number
  team: number
  player: Player
  player_elo: number
}

export interface GamePlayer {
  id: number
  player_name: string
  profile_pic: string
}
