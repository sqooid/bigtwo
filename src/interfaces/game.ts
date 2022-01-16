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
