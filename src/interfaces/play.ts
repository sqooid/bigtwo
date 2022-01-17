import { Card, cardGreater, nextValue } from '@/interfaces/deck'

export enum Hand {
  SINGLE,
  PAIR,
  TRIPLE,
  STRAIGHT,
  FLUSH,
  FULLHOUSE,
  FOUR,
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

export function isStraight(cards: Card[]): boolean {
  if (cards.length !== 5) return false
  cards.sort((a, b) => {
    if (cardGreater(a, b)) return 1
    return -1
  })
  console.log(cards)
  let currVal = cards[0].value
  if (currVal > 11) return false // Jack is max start for straight
  for (let i = 1; i < 5; ++i) {
    const nextVal = nextValue(currVal)
    if (cards[1].value !== nextVal) return false
    currVal = nextVal
  }
  return true
}

export function playGreater(play1: Play, play2: Play): boolean {
  return true
}
