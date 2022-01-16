import { Card, newCard, Suit } from '@/interfaces/deck'
import { defineCustomElement } from 'vue'

const deckCardCount = 52

export enum DealExtraOptions {
  FOURTWOS = 1 << 0,
  NOFACES = 1 << 1,
  DISTRIBUTEALL = 1 << 2,
}

export interface DealOptions {
  playerCount: number
  extra?: DealExtraOptions
}

// export function deal(options: DealOptions): Card[][] {
//   const deck = shuffle(createDeck())
// }

/**
 *
 * @param deck A shuffled deck of 52 cards
 * @param players Number of players
 * @returns Cards split evenly
 */
function splitDeck(deck: Card[], players: number): Card[][] {
  const count = Math.floor(deckCardCount / players)
  const hands: Card[][] = []
  for (let i = 0; i < players; ++i) {
    const hand = deck.slice(i * count, i * count + count)
    hands.push(hand)
  }
  if (players !== 3) return hands
  // Distribute leftover card (if there are three players)
  const extraIndex = handGetsExtra(hands)
  hands[extraIndex].push(deck[-1])

  return hands
}

function handGetsExtra(hands: Card[][]): number {
  for (let index = 0; index < hands.length; ++index) {
    if (hasCard(hands[index], newCard(Suit.DIAMOND, 3))) return index
  }
  for (let index = 0; index < hands.length; ++index) {
    if (hasCard(hands[index], newCard(Suit.CLUB, 3))) return index
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
