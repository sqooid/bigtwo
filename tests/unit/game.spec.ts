import { createGame, Game, State } from '@/classes/game'
import { newCard, Suit } from '@/interfaces/deck'
import { findPlay, Hand } from '@/interfaces/play'
import { expect, util } from 'chai'
import { utils } from 'mocha'
import rewire from 'rewire'

const gameRewire = rewire('@/classes/game.ts')

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
    play.cards[4].value = 11

    expect(game.makePlay(play)).to.be.false && expect(game._state).to.eql(state)
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

    expect(game.makePlay(play)).to.be.false && expect(game._state).to.eql(state)
  })
  it('makePlay pass', () => {
    const game = createGame()
    game._state.players = [
      {
        cards: [newCard(Suit.CLUB, 11)],
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
    const playersClone = JSON.parse(JSON.stringify(game._state.players))
    const expectedState: State = {
      turn: 1,
      turnIndex: 1,
      board: [],
      players: playersClone,
    }

    expect(game.makePlay()).to.be.true &&
      expect(game._state).to.eql(expectedState)
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
    const play = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])
    const res = game.makePlay(play)
    const expectedState: State = {
      turn: 1,
      turnIndex: 1,
      board: [{ play, playerIndex: 0 }],
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
    }

    expect(res).to.be.true && expect(game._state, 'state').to.eql(expectedState)
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

    const play = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])

    const expectedState: State = {
      turn: 1,
      turnIndex: 1,
      board: [{ playerIndex: 0, play }],
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
    }

    expect(game.makePlay(play)).to.be.true &&
      expect(game._state).to.eql(expectedState) &&
      expect(game.makePlay()).to.be.false
  })
})
