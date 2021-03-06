import {
  cardGreater,
  cardsEqual,
  cardValueGreater,
  containsCards,
  getCardName,
  getCardSuitName,
  getCardValueName,
  newCard,
  removeCards,
  sortCards,
  Suit,
} from '@/interfaces/deck'
import { expect } from 'chai'

describe('deck.ts', () => {
  it('cardsEqual true positive', () => {
    const card1 = newCard(Suit.CLUB, 3)
    const card2 = newCard(Suit.CLUB, 3)
    expect(cardsEqual(card1, card2)).true
  })
  it('cardsEqual true negative', () => {
    const card1 = newCard(Suit.CLUB, 3)
    const card2 = newCard(Suit.CLUB, 4)
    expect(cardsEqual(card1, card2)).false
  })
  it('cardValueGreater positive with 2', () => {
    expect(cardValueGreater(2, 10)).true
  })
  it('cardValueGreater positive with 1', () => {
    expect(cardValueGreater(1, 10)).true
  })
  it('cardValueGreater positive with normal', () => {
    expect(cardValueGreater(13, 10)).true
  })
  it('cardValueGreater negative with 2', () => {
    expect(cardValueGreater(10, 2)).false
  })
  it('cardValueGreater negative with normal', () => {
    expect(cardValueGreater(5, 6)).false
  })
  it('cardGreater true positive different suit', () => {
    const card1 = newCard(Suit.CLUB, 5)
    const card2 = newCard(Suit.HEART, 5)
    expect(cardGreater(card2, card1)).true
  })
  it('cardGreater normal positive', () => {
    const card1 = newCard(Suit.HEART, 3)
    const card2 = newCard(Suit.CLUB, 2)
    expect(cardGreater(card2, card1)).true
  })
  it('cardGreater true positive same suit with 2', () => {
    const card1 = newCard(Suit.CLUB, 11)
    const card2 = newCard(Suit.CLUB, 2)
    expect(cardGreater(card2, card1)).true
  })
  it('cardGreater true negative different suit', () => {
    const card1 = newCard(Suit.CLUB, 5)
    const card2 = newCard(Suit.HEART, 5)
    expect(cardGreater(card1, card2)).false
  })
  it('cardGreater true negative same suit', () => {
    const card1 = newCard(Suit.CLUB, 5)
    const card2 = newCard(Suit.CLUB, 6)
    expect(cardGreater(card1, card2)).false
  })
  it('containsCards positive', () => {
    const cards = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.CLUB, 2),
      newCard(Suit.SPADE, 11),
      newCard(Suit.DIAMOND, 13),
    ]
    const cardList = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.DIAMOND, 13),
      newCard(Suit.HEART, 5),
      newCard(Suit.SPADE, 11),
      newCard(Suit.CLUB, 2),
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 12),
      newCard(Suit.DIAMOND, 1),
    ]
    expect(containsCards(cards, cardList)).to.be.true
  })
  it('containsCards negative', () => {
    const cards = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.CLUB, 2),
      newCard(Suit.SPADE, 11),
      newCard(Suit.DIAMOND, 13),
    ]
    const cardList = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.SPADE, 11),
      newCard(Suit.CLUB, 2),
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 12),
      newCard(Suit.DIAMOND, 1),
    ]
    expect(containsCards(cards, cardList)).to.be.false
  })
  it('removeCards', () => {
    const cards = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.CLUB, 2),
      newCard(Suit.SPADE, 11),
      newCard(Suit.DIAMOND, 13),
    ]
    const cardList = [
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.SPADE, 11),
      newCard(Suit.CLUB, 2),
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 12),
      newCard(Suit.DIAMOND, 1),
    ]
    expect(removeCards(cards, cardList)).to.eql([
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 12),
      newCard(Suit.DIAMOND, 1),
    ])
  })
})

describe('sortCards', () => {
  it('works when sorting by value', () => {
    const cards = [
      newCard(Suit.DIAMOND, 5),
      newCard(Suit.SPADE, 2),
      newCard(Suit.HEART, 1),
      newCard(Suit.CLUB, 5),
      newCard(Suit.DIAMOND, 3),
      newCard(Suit.SPADE, 1),
    ]
    const sorted = [
      newCard(Suit.DIAMOND, 3),
      newCard(Suit.DIAMOND, 5),
      newCard(Suit.CLUB, 5),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 2),
    ]
    sortCards(cards)
    expect(cards).to.eql(sorted)
  })
  it('works when sorting by suit', () => {
    const cards = [
      newCard(Suit.DIAMOND, 5),
      newCard(Suit.SPADE, 2),
      newCard(Suit.HEART, 1),
      newCard(Suit.CLUB, 5),
      newCard(Suit.DIAMOND, 3),
      newCard(Suit.DIAMOND, 1),
    ]
    const sorted = [
      newCard(Suit.DIAMOND, 3),
      newCard(Suit.DIAMOND, 5),
      newCard(Suit.DIAMOND, 1),
      newCard(Suit.CLUB, 5),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 2),
    ]
    sortCards(cards, true)
    expect(cards).to.eql(sorted)
  })
})

describe('Getting card string names', () => {
  it('gives correct value', () => {
    const valueString = getCardValueName(1)
    expect(valueString).to.equal('Ace')
  })
  it('gives correct suit', () => {
    const suitString = getCardSuitName(2)
    expect(suitString).to.equal('Heart')
  })
  it('gives correct card name', () => {
    const cardString = getCardName(newCard(Suit.SPADE, 13))
    expect(cardString).to.equal('King of Spades')
  })
})
