import { createGame, Game } from '@/classes/game'
import { newCard, Suit } from '@/interfaces/deck'
import { findPlay, Hand } from '@/interfaces/play'
import { expect, util } from 'chai'
import { utils } from 'mocha'
import rewire from 'rewire'

const gameRewire = rewire('@/classes/game.ts')
const cloneState = gameRewire.__get__('cloneState')

describe('game.ts', () => {
  it('Game dealCards 4 players', () => {
    const game = new Game()
    game.dealCards({
      playerCount: 4,
    })
    expect(game._state.players).to.have.lengthOf(4)
  })
  it('Game dealCards 3 players', () => {
    const game = new Game()
    game.dealCards({
      playerCount: 3,
    })
    expect(game._state.players).to.have.lengthOf(3)
  })
  it('cloneState 1 turn', () => {
    const state = {
      winnerIndex: -1,
      turn: 2,
      turnIndex: 1,
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
    state.turnIndex++
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
      winnerIndex: -1,
      turn: 2,
      turnIndex: 1,
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
    state.turnIndex = 0
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
    state.turnIndex = 1
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
  it('makePlay invalid combo', () => {
    const game = createGame()
    game._state.players.push({
      cards: [
        newCard(Suit.CLUB, 11),
        newCard(Suit.HEART, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 11),
      ],
    })
    const state = JSON.parse(JSON.stringify(game._state))
    const play = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])
    play.cards[0].value = 10

    expect(game.makePlay(play)).to.be.false && expect(state).to.eql(game._state)
  })
  it('makePlay missing cards', () => {
    const game = createGame()
    game._state.players.push({
      cards: [
        newCard(Suit.CLUB, 10),
        newCard(Suit.HEART, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 11),
      ],
    })
    const state = JSON.parse(JSON.stringify(game._state))
    const play = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])

    expect(game.makePlay(play)).to.be.false && expect(state).to.eql(game._state)
  })
  it('makePlay non-winning', () => {
    const game = createGame()
    game._state.players = [
      {
        cards: [
          newCard(Suit.CLUB, 11),
          newCard(Suit.HEART, 1),
          newCard(Suit.SPADE, 13),
          newCard(Suit.HEART, 10),
          newCard(Suit.DIAMOND, 11),
          newCard(Suit.DIAMOND, 12),
        ],
      },
      {
        cards: [newCard(Suit.CLUB, 11)],
      },
      {
        cards: [newCard(Suit.CLUB, 11)],
      },
      {
        cards: [newCard(Suit.CLUB, 11)],
      },
    ]
    const playersCopy = JSON.parse(JSON.stringify(game._state.players))
    const play = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])
    const res = game.makePlay(play)

    expect(res).to.be.true &&
      expect(game._state, 'state').to.eql({
        turn: 1,
        turnIndex: 1,
        players: [
          {
            cards: [newCard(Suit.DIAMOND, 11)],
          },
          {
            cards: [newCard(Suit.CLUB, 11)],
          },
          {
            cards: [newCard(Suit.CLUB, 11)],
          },
          {
            cards: [newCard(Suit.CLUB, 11)],
          },
        ],
        board: [play],
      }) &&
      expect(game._history, 'history').to.eql([
        {
          winnerIndex: undefined,
          turn: 0,
          turnIndex: 0,
          players: playersCopy,
          board: [],
        },
      ])
  })
  it('makePlay winning', () => {
    const game = createGame()
    game._state.players = [
      {
        cards: [
          newCard(Suit.CLUB, 11),
          newCard(Suit.HEART, 1),
          newCard(Suit.SPADE, 13),
          newCard(Suit.HEART, 10),
          newCard(Suit.DIAMOND, 12),
        ],
      },
      {
        cards: [newCard(Suit.CLUB, 11)],
      },
      {
        cards: [newCard(Suit.CLUB, 11)],
      },
      {
        cards: [newCard(Suit.CLUB, 11)],
      },
    ]

    const playersCopy = JSON.parse(JSON.stringify(game._state.players))

    const play = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])

    expect(game.makePlay(play)).to.be.true &&
      expect(game._state).to.eql({
        winnerIndex: 0,
        turn: 1,
        turnIndex: 1,
        players: [
          {
            cards: [],
          },
          {
            cards: [newCard(Suit.CLUB, 11)],
          },
          {
            cards: [newCard(Suit.CLUB, 11)],
          },
          {
            cards: [newCard(Suit.CLUB, 11)],
          },
        ],
        board: [play],
      }) &&
      expect(game._history).to.eql([
        {
          winnerIndex: undefined,
          turn: 0,
          turnIndex: 0,
          players: playersCopy,
          board: [],
        },
        {
          winnerIndex: 0,
          turn: 1,
          turnIndex: 1,
          players: [
            {
              cards: [],
            },
            {
              cards: [newCard(Suit.CLUB, 11)],
            },
            {
              cards: [newCard(Suit.CLUB, 11)],
            },
            {
              cards: [newCard(Suit.CLUB, 11)],
            },
          ],
          board: [play],
        },
      ])
  })
})
