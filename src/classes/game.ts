import { Player } from '@/interfaces/player'
import { clonePlay, Play, beatsPlay, validPlay } from '@/interfaces/play'
import { deal, DealOptions } from '@/utils/deal'
import { containsCards, removeCards } from '@/interfaces/deck'

export interface BoardPlay {
  playerIndex: number
  play: Play
}

export interface State {
  turn: number
  turnIndex: number
  players: Player[]
  board: BoardPlay[]
}

export class Game {
  _finished: boolean
  _state: State

  constructor() {
    this.clear()
  }

  /**
   * Clears all existing state
   */
  clear() {
    this._finished = false
    this._state = {
      turn: 0,
      turnIndex: 0,
      players: [],
      board: [],
    }
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
    if (this._finished) return false
    if (!play) {
      _tickBoard(this._state)
      return true
    }

    const turnIndex = this._state.turnIndex
    const player = this._state.players[turnIndex]
    if (!containsCards(play.cards, player.cards)) {
      return false
    }

    const board = this._state.board
    const prevPlay: BoardPlay | undefined = board[board.length - 1]

    if (validPlay({ play, playerIndex: turnIndex }, prevPlay)) {
      // Tick state
      removeCards(play.cards, player.cards)
      const playClone = clonePlay(play)
      board.push({ play: playClone, playerIndex: turnIndex })

      _tickBoard(this._state)

      // Winning play
      if (player.cards.length === 0) {
        this._finished = true
      }

      return true
    }

    return false
  }

  getWinner(): number | undefined {
    if (!this._finished) return undefined
    const board = this._state.board
    return board[board.length - 1].playerIndex
  }
}

function _tickBoard(state: State) {
  ++state.turn
  state.turnIndex = (state.turnIndex + 1) % state.players.length
}

export function createGame(): Game {
  return new Game()
}
