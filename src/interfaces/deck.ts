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

/**
 * Equality between two cards
 * @param card1
 * @param card2
 * @returns True if cards are identical, false otherwise
 */
export function cardsEqual(card1: Card, card2: Card): boolean {
  return card1.suit === card2.suit && card1.value === card2.value
}

/**
 * Compare value of two cards
 * @param card1
 * @param card2
 * @returns True of card1 is bigger than card2, false otherwise
 */
export function cardGreater(card1: Card, card2: Card): boolean {
  if (card1.suit > card2.suit) return true
  if (card1.suit < card2.suit) return false
  if (card1.value > card2.value) return true
  return false
}

export function newCard(suit: Suit, value: number) {
  if (value < 1 || value > 13) throw new Error('invalid card creation')
  return { suit, value }
}
