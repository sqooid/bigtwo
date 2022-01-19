import { Card, cardsEqual, newCard, Suit } from '@/interfaces/deck'

const DECK_COUNT = 52
const HAND_COUNT = 13

export interface DealOptions {
  /**
   * Number of players
   */
  playerCount: number
  /**
   * First player isn't guaranteed to hold diamond 3
   */
  randomHands?: boolean
  /**
   * Reshuffle if any player holds all two's
   */
  fourTwos?: boolean
  /**
   * Reshuffle if any player has no face cards
   */
  noFaces?: boolean
  /**
   * Distribute all cards if less than four players
   */
  distributeAll?: boolean
}

/**
 * Deals cards according to specified options
 * If options are invalid, returns undefined
 * @param options
 * @returns
 */
export function deal(options: DealOptions): Card[][] {
  if (options.playerCount < 2 || options.playerCount > 4) return undefined
  const deck = createDeck()
  let hands
  while (true) {
    // Keep reshuffling until valid hands are made
    moveDiamondThree(shuffle(deck))
    hands = splitDeck(deck, options.playerCount)
    if (!options.distributeAll) {
      hands.forEach((hand) => {
        hand.splice(HAND_COUNT)
      })
    }
    for (const hand of hands) {
      if (options.fourTwos && hasFourTwos(hand)) continue
      if (options.noFaces && hasNoFaces(hand)) continue
    }
    break
  }
  if (options.randomHands) {
    return shuffle(hands)
  }
  return hands
}

/**
 * Moves the Diamond 3 card to the front of the deck in place
 * @param deck
 */
function moveDiamondThree(deck: Card[]) {
  const d3 = newCard(Suit.DIAMOND, 3)
  const index = deck.findIndex((card) => cardsEqual(d3, card))
  const temp = deck[0]
  deck[0] = d3
  deck[index] = temp
  return deck
}

function hasNoFaces(hand: Card[]): boolean {
  for (const card of hand) {
    if (card.value > 10) return false
  }
  return true
}

function hasFourTwos(hand: Card[]): boolean {
  let count = 0
  for (const card of hand) {
    if (card.value === 2) ++count
  }
  return count === 4
}

/**
 *
 * @param deck A shuffled deck of 52 cards
 * @param players Number of players
 * @returns Cards split evenly
 */
function splitDeck(deck: Card[], players: number): Card[][] {
  const count = Math.floor(deck.length / players)
  const hands: Card[][] = []
  for (let i = 0; i < players; ++i) {
    const hand = deck.slice(i * count, i * count + count)
    hands.push(hand)
  }
  if (players !== 3) return hands
  // Distribute leftover card (if there are three players)
  const extraIndex = handGetsExtra(hands)
  hands[extraIndex].push(deck[deck.length - 1])

  return hands
}

function handGetsExtra(hands: Card[][]): number {
  const d3 = newCard(Suit.DIAMOND, 3)
  for (let index = 0; index < hands.length; ++index) {
    if (hasCard(hands[index], d3)) return index
  }
  const c3 = newCard(Suit.CLUB, 3)
  for (let index = 0; index < hands.length; ++index) {
    if (hasCard(hands[index], c3)) return index
  }
}

function hasCard(hand: Card[], searchCard: Card): boolean {
  for (const card of hand) {
    if (card.suit === searchCard.suit && card.value === searchCard.value)
      return true
  }
  return false
}

function createDeck(): Card[] {
  const deck: Card[] = []
  for (const suit in Suit) {
    if (!isNaN(Number(suit))) continue // Typescript includes keys in iterator

    for (let val = 1; val < 14; ++val) {
      deck.push({
        suit: Suit[suit as keyof typeof Suit],
        value: val,
      })
    }
  }
  return deck
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}
