import { newCard, Suit } from '@/interfaces/deck'
import { expect } from 'chai'
import rewire from 'rewire'

const deal = rewire('@/deal.ts')
const createDeck = deal.__get__('createDeck')
const hasCard = deal.__get__('hasCard')
const splitDeck = deal.__get__('splitDeck')

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
  //   it('handGetsExtra finds diamond 3',()=>{
  // 	  const deck = [
  // 		  newCard(Suit.)
  // 	  ]
  //   })
  it('splitDeck 4 players correct count', () => {
    const deck = createDeck()
    const split = splitDeck(deck)
    expect(
      split.every((hand) => {
        return hand.length === deck / 4
      }),
    )
  })
  //   it('splitDeck 3 players correct count', () => {
  //     const deck = createDeck()
  //     const split: Card[][] = splitDeck(deck)
  //     const extraCardIndex = split.findIndex((hand) => {
  //       return hasCard(hand, newCard(Suit.DIAMOND, 3))
  //     })
  //     expect(
  //       split.every((hand) => {
  //         return hand.length === deck / 4
  //       }),
  //     )
  //   })
})
