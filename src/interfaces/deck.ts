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
 * Gives value of next card up
 * @param val
 * @returns Undefined if called with 2, otherwise next number up
 */
export function nextValue(val: number): number {
  if (val === 2 || val < 1) return undefined
  if (val < 13) return val + 1
  return 1
}

/**
 * Compares card values according to big 2 rules
 * @param
 * @param val2
 * @returns True if val1 is bigger than val2, false otherwise
 */
export function cardValueGreater(val1: number, val2: number): boolean {
  val1 = (val1 + 10) % 13
  val2 = (val2 + 10) % 13
  return val1 > val2
}

/**
 * Compare value of two cards
 * @param card1
 * @param card2
 * @returns True of card1 is bigger than card2, false otherwise
 */
export function cardGreater(card1: Card, card2: Card): boolean {
  if (cardValueGreater(card1.value, card2.value)) return true
  if (cardValueGreater(card2.value, card1.value)) return false
  if (card1.suit > card2.suit) return true
  if (card1.suit < card2.suit) return false
  return false
}

export function newCard(suit: Suit, value: number) {
  if (value < 1 || value > 13) throw new Error('invalid card creation')
  return { suit, value }
}
