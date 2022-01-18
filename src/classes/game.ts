import { Player } from '@/interfaces/player'
import { Play, validPlay } from '@/interfaces/play'
import { deal, DealOptions } from '@/utils/deal'
import { containsCards, removeCards } from '@/interfaces/deck'

interface State {
  turn: number
  playerTurnIndex: number
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
    this.clear()
  }

  /**
   * Clears all existing state
   */
  clear() {
    this.state = { turn: 1, playerTurnIndex: 0, players: [], board: [] }
    this.history = []
  }

  /**
   * Deals cards to players as fresh game
   * @param options Deal Options
   */
  dealCards(options: DealOptions) {
    this.clear()
    const hands = deal(options)
    for (const hand of hands) {
      this.state.players.push({ cards: hand })
    }
  }

  /**
   * Makes play and advances turn if play was valid, no change otherwise
   * @param play Play to make, with sorted cards
   * @returns True if play was valid, false if invalid play
   */
  makePlay(play: Play): boolean {
    const player = this.state.players[this.state.playerTurnIndex]
    if (!containsCards(play.cards, player.cards)) {
      return false
    }

    const board = this.state.board
    const prevPlay = board[board.length - 1]
    if (validPlay(play, prevPlay)) {
      removeCards(play.cards, player.cards)
      board.push(play)
      this.history.push()
      ++this.state.turn
      this.state.playerTurnIndex
      return true
    }
    return false
  }
}

export function createGame(): Game {
  return new Game()
}
