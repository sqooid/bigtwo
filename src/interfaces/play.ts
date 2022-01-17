import { Card } from '@/interfaces/deck'

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

export function playGreater(play1: Play, play2: Play): boolean {
  return true
}
