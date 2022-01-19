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
  if (card1 === card2) return true // Shortcut for if they are same instance
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

/**
 * Sorts cards in place and also returns sorted array
 * @param cards
 * @returns
 */
export function sortCards(cards: Card[]): Card[] {
  cards.sort((a, b) => {
    if (cardGreater(a, b)) return 1
    return -1
  })
  return cards
}

/**
 *
 * @param cards Cards to search for
 * @param cardList List that may contain all cards
 * @returns True if cardList contains all cards in cards
 */
export function containsCards(cards: Card[], cardList: Card[]): boolean {
  return cards.every((a) => {
    return (
      cardList.findIndex((b) => {
        return cardsEqual(a, b)
      }) !== -1
    )
  })
}

/**
 * Removes all cards in a list from another list in place
 * @param cards Cards to search for and remove
 * @param cardList List that is modified
 * @returns Also returns modified cardList
 */
export function removeCards(cards: Card[], cardList: Card[]): Card[] {
  cards.forEach((card) => {
    const index = cardList.findIndex((listCard) => {
      return cardsEqual(card, listCard)
    })
    if (index !== -1) cardList.splice(index, 1)
  })
  return cardList
}

export function newCard(suit: Suit, value: number): Card {
  if (value < 1 || value > 13) throw new Error('invalid card creation')
  return { suit, value }
}
