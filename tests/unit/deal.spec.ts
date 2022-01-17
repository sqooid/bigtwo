import { deal } from '@/deal'
import { Card, newCard, Suit } from '@/interfaces/deck'
import { expect } from 'chai'
import rewire from 'rewire'

const dealRewire = rewire('@/deal.ts')
const createDeck = dealRewire.__get__('createDeck')
const hasCard = dealRewire.__get__('hasCard')
const splitDeck = dealRewire.__get__('splitDeck')
const handGetsExtra = dealRewire.__get__('handGetsExtra')
const hasFourTwos = dealRewire.__get__('hasFourTwos')
const hasNoFaces = dealRewire.__get__('hasNoFaces')

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
    const split: Card[][] = splitDeck(deck, 4)
    expect(
      split.every((hand) => {
        return hand.length === 13
      }),
    ).true
  })
  it('splitDeck 3 players correct count diamond 3 last', () => {
    const deck = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 1),
      newCard(Suit.CLUB, 3),
      newCard(Suit.DIAMOND, 6),
      newCard(Suit.HEART, 11),
      newCard(Suit.CLUB, 8),
      newCard(Suit.SPADE, 5),
      newCard(Suit.HEART, 3),
      newCard(Suit.CLUB, 6),
      newCard(Suit.DIAMOND, 3),
    ]
    const split: Card[][] = splitDeck(deck, 3)
    expect(split[0]).to.have.lengthOf(4) &&
      expect(split[1]).to.have.lengthOf(3) &&
      expect(split[2]).to.have.lengthOf(3)
  })
  it('splitDeck 3 players correct count diamond 3 not last', () => {
    const deck = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 1),
      newCard(Suit.CLUB, 3),
      newCard(Suit.DIAMOND, 6),
      newCard(Suit.HEART, 11),
      newCard(Suit.CLUB, 8),
      newCard(Suit.SPADE, 5),
      newCard(Suit.HEART, 3),
      newCard(Suit.DIAMOND, 3),
      newCard(Suit.CLUB, 6),
    ]
    const split: Card[][] = splitDeck(deck, 3)
    expect(split[0]).to.have.lengthOf(3) &&
      expect(split[1]).to.have.lengthOf(3) &&
      expect(split[2]).to.have.lengthOf(4)
  })
  it('hasFourTwos true positive', () => {
    const hand = [
      newCard(Suit.DIAMOND, 2),
      newCard(Suit.CLUB, 2),
      newCard(Suit.HEART, 2),
      newCard(Suit.SPADE, 2),
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 8),
    ]
    const res = hasFourTwos(hand)
    expect(res).true
  })
  it('hasFourTwos true negative', () => {
    const hand = [
      newCard(Suit.DIAMOND, 2),
      newCard(Suit.CLUB, 1),
      newCard(Suit.HEART, 2),
      newCard(Suit.SPADE, 2),
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 8),
    ]
    const res = hasFourTwos(hand)
    expect(res).false
  })
  it('hasNoFaces true negative', () => {
    const hand = [
      newCard(Suit.DIAMOND, 2),
      newCard(Suit.CLUB, 10),
      newCard(Suit.HEART, 2),
      newCard(Suit.SPADE, 12),
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 8),
    ]
    const res = hasNoFaces(hand)
    expect(res).false
  })
  it('hasNoFaces true positive', () => {
    const hand = [
      newCard(Suit.DIAMOND, 2),
      newCard(Suit.CLUB, 10),
      newCard(Suit.HEART, 2),
      newCard(Suit.SPADE, 9),
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 8),
    ]
    const res = hasNoFaces(hand)
    expect(res).true
  })
  it('deal: 4 players no options', () => {
    const hands = deal({ playerCount: 4 })
    expect(hands, '4 hands').to.have.lengthOf(4) &&
      expect(hands, '13 cards').satisfies((hands) => {
        return hands.every((hand) => hand.length === 13)
      })
  })
  it('deal: 3 players no options', () => {
    const hands = deal({ playerCount: 3 })
    expect(hands, '3 hands').to.have.lengthOf(3) &&
      expect(hands, '13 cards').satisfies((hands) => {
        return hands.every((hand) => hand.length === 13)
      })
  })
  it('deal: 2 players no options', () => {
    const hands = deal({ playerCount: 2 })
    expect(hands, '2 hands').to.have.lengthOf(2) &&
      expect(hands, '13 cards').satisfies((hands) => {
        return hands.every((hand) => hand.length === 13)
      })
  })
  it('deal: 3 players, dist all', () => {
    const hands = deal({ playerCount: 3, distributeAll: true })
    expect(hands, '3 hands').to.have.lengthOf(3) &&
      expect(hands, '52 cards total').satisfies((hands) => {
        let count = 0
        hands.forEach((hand) => {
          count += hand.length
        })
        return count === 52
      })
  })
  it('deal: 2 players, dist all', () => {
    const hands = deal({ playerCount: 2, distributeAll: true })
    expect(hands, '2 hands').to.have.lengthOf(2) &&
      expect(hands, '52 cards total').satisfies((hands) => {
        let count = 0
        hands.forEach((hand) => {
          count += hand.length
        })
        return count === 52
      })
  })
})
