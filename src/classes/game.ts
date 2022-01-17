import { Player } from '@/interfaces/player'
import { Play } from '@/interfaces/hands'
import { deal, DealOptions } from '@/deal'

interface State {
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
    this.state = { players: [], board: [] }
    this.history = []
  }

  dealCards(options: DealOptions) {
    const hands = deal(options)
    for (const hand of hands) {
      this.state.players.push({ cards: hand })
    }
  }
}

export function createGame(): Game {
  return new Game()
}
