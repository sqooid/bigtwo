import { newCard, Suit } from '@/interfaces/deck'
import { isPair } from '@/interfaces/play'
import { expect } from 'chai'

describe('play.ts', () => {
  it('isPair true positive', () => {
    const cards = [newCard(Suit.HEART, 3), newCard(Suit.SPADE, 3)]
    expect(isPair(cards)).true
  })
  it('isPair true negative', () => {
    const cards = [newCard(Suit.HEART, 4), newCard(Suit.SPADE, 3)]
    expect(isPair(cards)).false
  })
})
