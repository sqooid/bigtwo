import { newCard, nextValue, Suit } from '@/interfaces/deck'
import {
  isBomb,
  isFlush,
  isFullHouse,
  isPair,
  isQuad,
  isStraight,
  isStraightFlush,
  isTriple,
} from '@/interfaces/play'
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
  it('isQuad positive', () => {
    const cards = [
      newCard(Suit.HEART, 4),
      newCard(Suit.SPADE, 4),
      newCard(Suit.CLUB, 4),
      newCard(Suit.DIAMOND, 4),
    ]
    expect(isQuad(cards)).true
  })
  it('isQuad negative', () => {
    const cards = [
      newCard(Suit.HEART, 3),
      newCard(Suit.SPADE, 4),
      newCard(Suit.CLUB, 4),
      newCard(Suit.DIAMOND, 4),
    ]
    expect(isQuad(cards)).false
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
  it('isFlush positive', () => {
    const cards = [
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 9),
    ]
    expect(isFlush(cards)).true
  })
  it('isFlush negative', () => {
    const cards = [
      newCard(Suit.SPADE, 5),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 9),
    ]
    expect(isFlush(cards)).false
  })
  it('isFullHouse positive triple first', () => {
    const cards = [
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 7),
    ]
    expect(isFullHouse(cards)).true
  })
  it('isFullHouse positive triple second', () => {
    const cards = [
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 8),
    ]
    expect(isFullHouse(cards)).true
  })
  it('isFullHouse negative', () => {
    const cards = [
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 1),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 8),
    ]
    expect(isFullHouse(cards)).false
  })
  it('isBomb positive', () => {
    const cards = [
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 1),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 7),
    ]
    expect(isBomb(cards)).true
  })
  it('isBomb negative', () => {
    const cards = [
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 2),
      newCard(Suit.HEART, 1),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 7),
    ]
    expect(isBomb(cards)).false
  })
  it('isStraightFlush positive', () => {
    const cards = [
      newCard(Suit.HEART, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
      newCard(Suit.HEART, 7),
    ]
    expect(isStraightFlush(cards)).true
  })
  it('isStraightFlush negative cross', () => {
    const cards = [
      newCard(Suit.HEART, 2),
      newCard(Suit.HEART, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
    ]
    expect(isStraightFlush(cards)).false
  })
  it('isStraightFlush negative suit', () => {
    const cards = [
      newCard(Suit.SPADE, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
      newCard(Suit.HEART, 7),
    ]
    expect(isStraightFlush(cards)).false
  })
  it('isStraightFlush negative number', () => {
    const cards = [
      newCard(Suit.HEART, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
      newCard(Suit.HEART, 8),
    ]
    expect(isStraightFlush(cards)).false
  })
})
