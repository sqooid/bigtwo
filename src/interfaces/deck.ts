export enum Suit {
  DIAMOND,
  CLUB,
  HEART,
  SPADE,
}

export interface Card {
  suit: Suit
  value: number
}

export function cardsEqual(card1: Card, card2: Card): boolean {
  return card1.suit === card2.suit && card1.value === card2.value
}

export function newCard(suit: Suit, value: number) {
  if (value < 1 || value > 13) throw new Error('invalid card creation')
  return { suit, value }
}
