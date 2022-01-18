import { Player } from '@/interfaces/player'
import { clonePlay, Play, validPlay } from '@/interfaces/play'
import { deal, DealOptions } from '@/utils/deal'
import { containsCards, removeCards } from '@/interfaces/deck'

interface State {
  winnerIndex?: number
  turn: number
  turnIndex: number
  players: Player[]
  board: Play[]
}

/**
 * Clones the state 'deeply enough', assuming cards aren't modified in place
 * @param state
 * @returns Cloned state
 */
function cloneState(state: State): State {
  return {
    winnerIndex: state.winnerIndex,
    turn: state.turn,
    turnIndex: state.turnIndex,
    players: state.players.map((player) => {
      return { cards: [...player.cards] }
    }),
    board: [...state.board],
  }
}

export class Game {
  /**
   * Current state of the game
   */
  _state: State
  /**
   * Past states
   */
  _history: State[]

  constructor() {
    this.clear()
  }

  /**
   * Clears all existing state
   */
  clear() {
    this._state = { turn: 0, turnIndex: 0, players: [], board: [] }
    this._history = []
  }

  /**
   * Deals cards to players as fresh game
   * @param options Deal Options
   */
  dealCards(options: DealOptions) {
    this.clear()
    const hands = deal(options)
    for (const hand of hands) {
      this._state.players.push({ cards: hand })
    }
  }

  /**
   * Makes play and advances turn if play was valid, no change otherwise
   * Sets winner if play results in player having no cards left
   * @param play Play to make, with sorted cards. Pass if undefined
   * @returns True if play was valid, false if invalid play
   */
  makePlay(play?: Play): boolean {
    const player = this._state.players[this._state.turnIndex]
    if (!containsCards(play.cards, player.cards)) {
      return false
    }

    const board = this._state.board
    const prevPlay = board[board.length - 1]

    if (validPlay(play, prevPlay)) {
      this._history.push(cloneState(this._state))

      removeCards(play.cards, player.cards)
      const playClone = clonePlay(play)
      board.push(playClone)

      ++this._state.turn
      this._state.turnIndex =
        (this._state.turnIndex + 1) % this._state.players.length

      // Winning play
      if (player.cards.length === 0) {
        this._state.winnerIndex =
          (this._state.turnIndex - 1) % this._state.players.length
        // Chuck winning play onto history as well for completeness
        this._history.push(cloneState(this._state))
      }

      return true
    }

    return false
  }
}

export function createGame(): Game {
  return new Game()
}
