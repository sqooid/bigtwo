import { Game } from '@/classes/game'
import { newCard, Suit } from '@/interfaces/deck'
import { Hand } from '@/interfaces/play'
import { expect, util } from 'chai'
import rewire from 'rewire'

const gameRewire = rewire('@/classes/game.ts')
const cloneState = gameRewire.__get__('cloneState')

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
    expect(game.state.players).to.have.lengthOf(3)
  })
  it('cloneState 1 turn', () => {
    const state = {
      winner: -1,
      turn: 2,
      playerTurnIndex: 1,
      players: [
        {
          cards: [newCard(Suit.CLUB, 3)],
        },
        {
          cards: [newCard(Suit.HEART, 3)],
        },
      ],
      board: [
        {
          combo: Hand.SINGLE,
          comboValue: newCard(Suit.DIAMOND, 3),
          cards: [newCard(Suit.DIAMOND, 3)],
        },
      ],
    }
    const jsonClonedState = JSON.parse(JSON.stringify(state))
    const clonedState = cloneState(state)
    state.turn++
    state.playerTurnIndex++
    state.players[1].cards.splice(0, 1)
    const cards = [newCard(Suit.DIAMOND, 3)]
    state.board.push({
      combo: Hand.SINGLE,
      comboValue: cards[0],
      cards,
    })
    expect(clonedState).to.eql(jsonClonedState)
  })
  it('cloneState 2 turns', () => {
    const state = {
      winner: -1,
      turn: 2,
      playerTurnIndex: 1,
      players: [
        {
          cards: [newCard(Suit.CLUB, 3)],
        },
        {
          cards: [newCard(Suit.HEART, 3)],
        },
      ],
      board: [
        {
          combo: Hand.SINGLE,
          comboValue: newCard(Suit.DIAMOND, 3),
          cards: [newCard(Suit.DIAMOND, 3)],
        },
      ],
    }
    const jsonClonedState1 = JSON.parse(JSON.stringify(state))
    const clonedState1 = cloneState(state)
    state.turn++
    state.playerTurnIndex = 0
    state.players[1].cards.splice(0, 1)
    const cards1 = [newCard(Suit.DIAMOND, 3)]
    state.board.push({
      combo: Hand.SINGLE,
      comboValue: cards1[0],
      cards: cards1,
    })
    const jsonClonedState2 = JSON.parse(JSON.stringify(state))
    const clonedState2 = cloneState(state)
    state.turn++
    state.playerTurnIndex = 1
    state.players[0].cards.splice(0, 1)
    const cards2 = [newCard(Suit.CLUB, 3)]
    state.board.push({
      combo: Hand.SINGLE,
      comboValue: cards2[0],
      cards: cards2,
    })
    expect(clonedState1).to.eql(jsonClonedState1) &&
      expect(clonedState2).to.eql(jsonClonedState2)
  })
})
