import { Player } from '@/classes/player'
import { Play } from '@/interfaces/game'

interface State {
  players: Player[]
  board: Play[]
}

class Game {
  /**
   * Current state of the game
   */
  state: State
  /**
   * Past states
   */
  history: State[]
}
