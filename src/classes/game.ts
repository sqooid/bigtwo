import { Player } from '@/interfaces/player'
import { clonePlay, Play, validPlay } from '@/interfaces/play'
import { deal, DealOptions } from '@/utils/deal'
import { containsCards, removeCards } from '@/interfaces/deck'

interface State {
  winner?: number
  turn: number
  playerTurnIndex: number
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
    winner: state.winner,
    turn: state.turn,
    playerTurnIndex: state.playerTurnIndex,
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
   * Sets winner if play results in player having no cards left
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
      play = clonePlay(play)
      board.push(play)

      this.history.push(cloneState(this.state))

      if (player.cards.length === 0) {
        this.state.winner = this.state.playerTurnIndex
        return
      }

      ++this.state.turn
      this.state.playerTurnIndex =
        (this.state.playerTurnIndex + 1) % this.state.players.length

      return true
    }

    return false
  }
}

export function createGame(): Game {
  return new Game()
}
