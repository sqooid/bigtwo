import { newCard, nextValue, Suit } from '@/interfaces/deck'
import { isPair, isStraight, isTriple } from '@/interfaces/play'
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
  it('isTriple true positive', () => {
    const cards = [
      newCard(Suit.HEART, 3),
      newCard(Suit.SPADE, 3),
      newCard(Suit.CLUB, 3),
    ]
    expect(isTriple(cards)).true
  })
  it('isTriple true negative', () => {
    const cards = [
      newCard(Suit.HEART, 4),
      newCard(Suit.SPADE, 4),
      newCard(Suit.CLUB, 3),
    ]
    expect(isTriple(cards)).false
  })
  it('nextValue from 2', () => {
    expect(nextValue(2)).to.be.undefined
  })
  it('nextValue from 13', () => {
    expect(nextValue(13)).to.equal(1)
  })
  it('nextValue from invalid', () => {
    expect(nextValue(0)).to.be.undefined
  })
  it('nextValue from normal', () => {
    expect(nextValue(5)).to.equal(6)
  })
  it('isStraight true positive', () => {
    const cards = [
      newCard(Suit.HEART, 6),
      newCard(Suit.SPADE, 5),
      newCard(Suit.CLUB, 9),
      newCard(Suit.CLUB, 8),
      newCard(Suit.HEART, 7),
    ]
    expect(isStraight(cards)).true
  })
  it('isStraight true positive with 2', () => {
    const cards = [
      newCard(Suit.HEART, 2),
      newCard(Suit.SPADE, 11),
      newCard(Suit.CLUB, 1),
      newCard(Suit.CLUB, 12),
      newCard(Suit.HEART, 13),
    ]
    expect(isStraight(cards)).true
  })
  it('isStraight true negative', () => {
    const cards = [
      newCard(Suit.HEART, 5),
      newCard(Suit.SPADE, 7),
      newCard(Suit.CLUB, 7),
      newCard(Suit.CLUB, 8),
      newCard(Suit.HEART, 9),
    ]
    expect(isStraight(cards)).false
  })
  it('isStraight true negative', () => {
    const cards = [
      newCard(Suit.HEART, 5),
      newCard(Suit.SPADE, 7),
      newCard(Suit.CLUB, 7),
      newCard(Suit.CLUB, 8),
      newCard(Suit.HEART, 9),
    ]
    expect(isStraight(cards)).false
  })
})
