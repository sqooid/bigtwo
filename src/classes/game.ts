import { Player } from '@/interfaces/player'
import { Play } from '@/interfaces/play'
import { deal, DealOptions } from '@/deal'

interface State {
  turn: number
  players: Player[]
  board: Play[]
}

export class Game {
  /**
   * Current state of the game
   */
  state: State
  /**
   * Past states
   */
  history: State[]

  constructor() {
    this.state = { turn: 0, players: [], board: [] }
    this.history = []
  }

  dealCards(options: DealOptions) {
    const hands = deal(options)
    for (const hand of hands) {
      this.state.players.push({ cards: hand })
    }
  }

  makePlay(play: Play) {
    return
  }
}

export function createGame(): Game {
  return new Game()
}
