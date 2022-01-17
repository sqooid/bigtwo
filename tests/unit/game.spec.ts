import { Game } from '@/classes/game'
import { expect, util } from 'chai'
import rewire from 'rewire'

const gameRewire = rewire('@/classes/game.ts')

describe('game.ts', () => {
  it('Game dealCards 4 players', () => {
    const game = new Game()
    game.dealCards({
      playerCount: 4,
    })
    expect(game.state.players).to.have.lengthOf(4)
  })
  it('Game dealCards 3 players', () => {
    const game = new Game()
    game.dealCards({
      playerCount: 3,
    })
    console.log(util.inspect(game, false, null, true))
    expect(game.state.players).to.have.lengthOf(3)
  })
})
