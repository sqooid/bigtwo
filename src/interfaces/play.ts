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
  comboValue: Card
  cards: Card[]
}

interface ComboResult {
  found: boolean
  value?: Card
}

// export function findPlay(cards: Card[]): Play {
//   if()
// }

export function isPair(cards: Card[]): ComboResult {
  if (cards.length !== 2) return { found: false }
  sortCards(cards)
  if (cards[0].value === cards[1].value) {
    return { found: true, value: cards[1] }
  }
  return { found: false }
}

export function isTriple(cards: Card[]): ComboResult {
  if (cards.length !== 3) return { found: false }
  sortCards(cards)
  if (cards[0].value === cards[1].value && cards[1].value === cards[2].value) {
    return {
      found: true,
      value: cards[2],
    }
  }
  return {
    found: false,
  }
}

export function isQuad(cards: Card[]): ComboResult {
  if (cards.length !== 4) return { found: false }
  sortCards(cards)
  if (
    cards[0].value === cards[1].value &&
    cards[1].value === cards[2].value &&
    cards[2].value === cards[3].value
  ) {
    return {
      found: true,
      value: cards[3],
    }
  }
  return {
    found: false,
  }
}

export function isStraight(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
  sortCards(cards)
  let currVal = cards[0].value
  if (currVal > 11) return { found: false } // Jack is max start for straight
  for (let i = 1; i < 5; ++i) {
    const nextVal = nextValue(currVal)
    if (cards[i].value !== nextVal) return { found: false }
    currVal = nextVal
  }
  return { found: true, value: cards[4] }
}

export function isFlush(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
  sortCards(cards)
  if (
    cards[0].suit === cards[1].suit &&
    cards[2].suit === cards[3].suit &&
    cards[4].suit === cards[0].suit &&
    cards[0].suit === cards[2].suit
  ) {
    return {
      found: true,
      value: cards[4],
    }
  }
  return { found: false }
}

export function isFullHouse(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
  sortCards(cards)
  let pair = isPair(cards.slice(0, 2))
  let triple = isTriple(cards.slice(2, 5))
  if (pair.found && triple.found) {
    return {
      found: true,
      value: triple.value,
    }
  }
  pair = isPair(cards.slice(3, 5))
  triple = isTriple(cards.slice(0, 3))
  if (pair.found && triple.found) {
    return {
      found: true,
      value: triple.value,
    }
  }
  return { found: false }
}

export function isStraightFlush(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
  const flush = isFlush(cards)
  const straight = isStraight(cards)
  if (flush.found && straight.found) {
    return {
      found: true,
      value: straight.value,
    }
  }
  return { found: false }
}

export function isBomb(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
  sortCards(cards)
  let quad = isQuad(cards.slice(0, 4))
  if (quad.found) {
    return {
      found: true,
      value: quad.value,
    }
  }
  quad = isQuad(cards.slice(1, 5))
  if (quad.found) {
    return {
      found: true,
      value: quad.value,
    }
  }
  return { found: false }
}

export function playGreater(play1: Play, play2: Play): boolean {
  return true
}
