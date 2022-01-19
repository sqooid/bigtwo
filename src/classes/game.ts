import { Player } from '@/interfaces/player'
import { clonePlay, Play, validPlay } from '@/interfaces/play'
import { deal, DealOptions } from '@/utils/deal'
import { containsCards, removeCards } from '@/interfaces/deck'

export interface BoardPlay {
  /**
   * Index of the player that made this play
   */
  playerIndex: number
  /**
   * The play that was made
   */
  play: Play
}

export interface State {
  /**
   * Round number
   */
  turn: number
  /**
   * Index of the player to make the next play
   */
  turnIndex: number
  /**
   * List of the players
   */
  players: Player[]
  /**
   * List of all plays that have been made
   */
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
   * Clears any current state and deals cards to players with options
   * @param options Deal options
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

  /**
   * Getters
   */

  /**
   * Gets the array of all the current players
   * Can be indexed to get specific players
   */
  get players(): Player[] {
    return this._state.players
  }

  /**
   * Number of players
   */
  get playerCount(): number {
    return this._state.players.length
  }

  /**
   * The current turn number
   */
  get turn(): number {
    return this._state.turn
  }

  /**
   * The index of the player who is to make the next play
   */
  get currentPlayer(): number {
    return this._state.turnIndex
  }

  /**
   * Gets the current state of the board
   */
  get board(): BoardPlay[] {
    return this._state.board
  }

  /**
   * Gives the index of the winner of the game
   * Could also be used to check if the game is finished or not
   */
  get winner(): number | undefined {
    if (!this._finished) return undefined
    const board = this._state.board
    return board[board.length - 1].playerIndex
  }

  /**
   * Check if game is finished, i.e. if there is a winner
   */
  get isFinished(): boolean {
    return this._finished
  }
}

/**
 * Utility to ticks the turn numbers of the provided state
 * @param state State to update
 */
function _tickBoard(state: State) {
  ++state.turn
  state.turnIndex = (state.turnIndex + 1) % state.players.length
}

/**
 * Creates a new Big Two game instance
 * @returns A new empty game
 */
export function createGame(): Game {
  return new Game()
}
