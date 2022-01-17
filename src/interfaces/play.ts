import { Card, cardGreater, nextValue, sortCards } from '@/interfaces/deck'

export enum Hand {
  SINGLE,
  PAIR,
  TRIPLE,
  STRAIGHT,
  FLUSH,
  FULLHOUSE,
  BOMB,
  STRAIGHTFLUSH,
}

export interface Play {
  combo: Hand
  cards: Card[]
}

export function isPair(cards: Card[]): boolean {
  if (cards.length !== 2) return false
  return cards[0].value === cards[1].value
}

export function isTriple(cards: Card[]): boolean {
  if (cards.length !== 3) return false
  return cards[0].value === cards[1].value && cards[1].value === cards[2].value
}

export function isQuad(cards: Card[]): boolean {
  if (cards.length !== 4) return false
  return (
    cards[0].value === cards[1].value &&
    cards[1].value === cards[2].value &&
    cards[2].value === cards[3].value
  )
}

export function isStraight(cards: Card[]): boolean {
  if (cards.length !== 5) return false
  sortCards(cards)
  let currVal = cards[0].value
  if (currVal > 11) return false // Jack is max start for straight
  for (let i = 1; i < 5; ++i) {
    const nextVal = nextValue(currVal)
    if (cards[i].value !== nextVal) return false
    currVal = nextVal
  }
  return true
}

export function isFlush(cards: Card[]): boolean {
  if (cards.length !== 5) return false
  return (
    cards[0].suit === cards[1].suit &&
    cards[2].suit === cards[3].suit &&
    cards[4].suit === cards[0].suit &&
    cards[0].suit === cards[2].suit
  )
}

export function isFullHouse(cards: Card[]): boolean {
  if (cards.length !== 5) return false
  sortCards(cards)
  return (
    (isPair(cards.slice(0, 2)) && isTriple(cards.slice(2, 5))) ||
    (isTriple(cards.slice(0, 3)) && isPair(cards.slice(3, 5)))
  )
}

export function isStraightFlush(cards: Card[]): boolean {
  if (cards.length !== 5) return false
  return isFlush(cards) && isStraight(cards)
}

export function isBomb(cards: Card[]): boolean {
  if (cards.length !== 5) return false
  sortCards(cards)
  return isQuad(cards.slice(0, 4)) || isQuad(cards.slice(1.5))
}

export function playGreater(play1: Play, play2: Play): boolean {
  return true
}
