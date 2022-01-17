import { Card, newCard, Suit } from '@/interfaces/deck'
import { expect } from 'chai'
import rewire from 'rewire'

const deal = rewire('@/deal.ts')
const createDeck = deal.__get__('createDeck')
const hasCard = deal.__get__('hasCard')
const splitDeck = deal.__get__('splitDeck')
const handGetsExtra = deal.__get__('handGetsExtra')

describe('deal.ts', () => {
  it('createDeck has 52 cards', () => {
    const deck = createDeck()
    expect(deck).to.have.lengthOf(52)
  })
  it('hasCard true positive', () => {
    const hand = [newCard(Suit.SPADE, 2), newCard(Suit.DIAMOND, 3)]
    const has = hasCard(hand, newCard(Suit.SPADE, 2))
    expect(has).true
  })
  it('hasCard true negative', () => {
    const hand = [newCard(Suit.SPADE, 2), newCard(Suit.DIAMOND, 3)]
    const has = hasCard(hand, newCard(Suit.SPADE, 3))
    expect(has).false
  })
  it('handGetsExtra finds diamond 3', () => {
    const hands = [
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 10),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 3),
        newCard(Suit.HEART, 13),
      ],
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 10),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 7),
        newCard(Suit.HEART, 13),
      ],
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 10),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 8),
        newCard(Suit.HEART, 13),
      ],
    ]
    const index = handGetsExtra(hands)
    expect(index).to.equal(0)
  })
  it('handGetsExtra finds club 3 with no diamond 3', () => {
    const hands = [
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 10),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 4),
        newCard(Suit.HEART, 13),
      ],
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 3),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 7),
        newCard(Suit.HEART, 13),
      ],
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 10),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 8),
        newCard(Suit.HEART, 13),
      ],
    ]
    const index = handGetsExtra(hands)
    expect(index).to.equal(1)
  })
  it('handGetsExtra finds diamond 3 with club 3 present', () => {
    const hands = [
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 10),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 4),
        newCard(Suit.HEART, 13),
      ],
      [
        newCard(Suit.DIAMOND, 5),
        newCard(Suit.CLUB, 3),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 7),
        newCard(Suit.HEART, 13),
      ],
      [
        newCard(Suit.DIAMOND, 3),
        newCard(Suit.CLUB, 10),
        newCard(Suit.SPADE, 4),
        newCard(Suit.DIAMOND, 8),
        newCard(Suit.HEART, 13),
      ],
    ]
    const index = handGetsExtra(hands)
    expect(index).to.equal(2)
  })
  it('splitDeck 4 players correct count', () => {
    const deck = createDeck()
    const split = splitDeck(deck)
    expect(
      split.every((hand) => {
        return hand.length === deck / 4
      }),
    )
  })
  it('splitDeck 3 players correct count', () => {
    const deck = createDeck()
    const split: Card[][] = splitDeck(deck)
    const extraCardIndex = split.findIndex((hand) => {
      return hasCard(hand, newCard(Suit.DIAMOND, 3))
    })
    expect(
      split.every((hand) => {
        return hand.length === deck / 4
      }),
    )
  })
})
