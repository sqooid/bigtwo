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

export function clonePlay(play: Play): Play {
  return {
    combo: play.combo,
    comboValue: play.comboValue,
    cards: [...play.cards],
  }
}

export function validPlay(play: Play, prevPlay?: Play): boolean {
  if (!findPlay(play.cards)) return false
  if (!prevPlay) return true
  if (play.cards.length !== prevPlay.cards.length) return false
  return playGreater(play, prevPlay)
}

/**
 * Compares two plays. Doesn't check number of cards
 * @param play1
 * @param play2
 * @returns True if play1 beats play2, false otherwise
 */
export function playGreater(play1: Play, play2: Play): boolean {
  if (play1.combo > play2.combo) return true
  if (play1.combo < play2.combo) return false
  // Same combo
  if (cardGreater(play1.comboValue, play2.comboValue)) return true
  return false
}

/**
 * Will be exposed in API
 * @param cards
 * @returns Undefined if invalid play
 */
export function findPlay(cards: Card[]): Play | undefined {
  // Guaranteed invalid plays
  if (
    cards.length < 1 ||
    cards.length > 5 ||
    cards.some((card) => {
      return card.suit < 0 || card.suit > 3 || card.value < 1 || card.value > 13
    })
  ) {
    return undefined
  }

  let combo: ComboResult
  sortCards(cards)
  // Standard plays
  if (cards.length === 1) {
    return {
      combo: Hand.SINGLE,
      comboValue: cards[0],
      cards,
    }
  }
  combo = isTriple(cards)
  if (combo.found) {
    return {
      combo: Hand.TRIPLE,
      comboValue: combo.value,
      cards,
    }
  }
  combo = isPair(cards)
  if (combo.found) {
    return {
      combo: Hand.PAIR,
      comboValue: combo.value,
      cards,
    }
  }

  // Actual combos
  if (cards.length === 5) {
    combo = isStraightFlush(cards)
    if (combo.found) {
      return {
        combo: Hand.STRAIGHTFLUSH,
        comboValue: combo.value,
        cards,
      }
    }
    combo = isBomb(cards)
    if (combo.found) {
      return {
        combo: Hand.BOMB,
        comboValue: combo.value,
        cards,
      }
    }
    combo = isFullHouse(cards)
    if (combo.found) {
      return {
        combo: Hand.FULLHOUSE,
        comboValue: combo.value,
        cards,
      }
    }
    combo = isFlush(cards)
    if (combo.found) {
      return {
        combo: Hand.FLUSH,
        comboValue: combo.value,
        cards,
      }
    }
    combo = isStraight(cards)
    if (combo.found) {
      return {
        combo: Hand.STRAIGHT,
        comboValue: combo.value,
        cards,
      }
    }
  }
  // Otherwise invalid combo
  return undefined
}

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
export function isPair(cards: Card[]): ComboResult {
  if (cards.length !== 2) return { found: false }
  if (cards[0].value === cards[1].value) {
    return { found: true, value: cards[1] }
  }
  return { found: false }
}

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
export function isTriple(cards: Card[]): ComboResult {
  if (cards.length !== 3) return { found: false }
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

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
export function isQuad(cards: Card[]): ComboResult {
  if (cards.length !== 4) return { found: false }
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

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
export function isStraight(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
  let currVal = cards[0].value
  if (currVal > 11) return { found: false } // Jack is max start for straight
  for (let i = 1; i < 5; ++i) {
    const nextVal = nextValue(currVal)
    if (cards[i].value !== nextVal) return { found: false }
    currVal = nextVal
  }
  return { found: true, value: cards[4] }
}

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
export function isFlush(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
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

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
export function isFullHouse(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
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

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
export function isBomb(cards: Card[]): ComboResult {
  if (cards.length !== 5) return { found: false }
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

/**
 *
 * @param cards Sorted array of cards
 * @returns
 */
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
