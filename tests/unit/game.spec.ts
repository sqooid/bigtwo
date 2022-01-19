import { createGame, Game, State } from '@/classes/game'
import { newCard, Suit } from '@/interfaces/deck'
import { findPlay, Hand } from '@/interfaces/play'
import { expect, util } from 'chai'
import { utils } from 'mocha'
import rewire from 'rewire'

const gameRewire = rewire('@/classes/game.ts')
const _tickBoard = gameRewire.__get__('_tickBoard')

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
  it('tickBoard correct loop', () => {
    const state: State = {
      turn: 3,
      turnIndex: 3,
      board: [],
      players: [{ cards: [] }, { cards: [] }, { cards: [] }, { cards: [] }],
    }
    _tickBoard(state)
    expect(state.turn).to.equal(4) && expect(state.turnIndex).to.equal(0)
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
  it('makePlay positive with previous play by other player', () => {
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
    const prevPlay = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.CLUB, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])

    game._state.board = [
      {
        playerIndex: 3,
        play: prevPlay,
      },
    ]
    const res = game.makePlay(play)

    const expectedState: State = {
      turn: 1,
      turnIndex: 1,
      board: [
        { playerIndex: 3, play: prevPlay },
        { play, playerIndex: 0 },
      ],
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
  it('makePlay positive with previous play by same player', () => {
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
    const play = findPlay([newCard(Suit.CLUB, 11)])
    const prevPlay = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.CLUB, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])

    game._state.board = [
      {
        playerIndex: 0,
        play: prevPlay,
      },
    ]
    const res = game.makePlay(play)

    const expectedState: State = {
      turn: 1,
      turnIndex: 1,
      board: [
        { play: prevPlay, playerIndex: 0 },
        { play, playerIndex: 0 },
      ],
      players: [
        {
          cards: [
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
      ],
    }

    expect(res).to.be.true && expect(game._state, 'state').to.eql(expectedState)
  })
  it('makePlay negative with smaller play', () => {
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
    const prevPlay = findPlay([
      newCard(Suit.CLUB, 11),
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ])

    game._state.board = [
      {
        playerIndex: 3,
        play: prevPlay,
      },
    ]

    const expectedState = JSON.parse(JSON.stringify(game._state))

    const res = game.makePlay(play)

    expect(res).to.be.false &&
      expect(game._state, 'state').to.eql(expectedState)
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
