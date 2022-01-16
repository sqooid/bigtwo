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

export function newCard(suit: Suit, value: number) {
  if (value < 1 || value > 13) throw new Error('invalid card creation')
  return { suit, value }
}
