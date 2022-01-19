# Big Two Engine API

## Functions

### createGame

Creates a new game instance

```ts
function createGame(): Game
```

### sortCards

Sorts a list of cards in ascending order of value in place

```ts
function sortCards(cards: Card[]): Card[]
```

### newCard

Creates a new card with a suit and value

```ts
function newCard(suit: Suit, value: number): Card
```

### cardGreater

Used to compare value of two cards (using Big Two rules of course). True if first card is greater

```ts
function cardGreater(card1: Card, card2: Card): boolean
```

### cardsEqual

Whether two cards are the same

```ts
function cardsEqual(card1: Card, card2: Card): boolean
```

### validPlay

Whether a play is valid given a previous play. Takes into account who made the previous play. If previous play is absent, only checks the validity of the combo of the current play.

```ts
function validPlay(boardPlay: BoardPlay, prevBoardPlay?: BoardPlay): boolean
```

### findPlay

Creates a `Play` object given an array of cards, which includes information about the combo. If the play is an invalid combo, returns undefined

```ts
function findPlay(cards: Card[]): Play | undefined
```

### playGreater

Checks if a play has greater value than the other. If the plays are different types (e.g. a pair vs a straight), returns false

```ts
function playGreater(play1: Play, play2: Play): boolean
```

## Interfaces

### DealOptions

```ts
interface DealOptions {
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
```

### Card

Note that suits are [0,3] and values are [1,13]

```ts
interface Card {
  suit: Suit
  value: number
}
```

### Play

```ts
interface Play {
  /**
   * The type of the combo
   */
  combo: Hand
  /**
   * The card used to determine the value of the combo
   */
  comboValue: Card
  /**
   * The cards making up the play
   */
  cards: Card[]
}
```

### BoardPlay

```ts
interface BoardPlay {
  /**
   * Index of the player that made this play
   */
  playerIndex: number
  /**
   * The play that was made
   */
  play: Play
}
```

### Player

```ts
interface Player {
  /**
   * Cards held by the player
   */
  cards: Card[]
}
```

## Enums

### Suit

```ts
enum Suit {
  DIAMOND,
  CLUB,
  HEART,
  SPADE,
}
```

### Hand

```ts
enum Hand {
  SINGLE,
  PAIR,
  TRIPLE,
  STRAIGHT,
  FLUSH,
  FULLHOUSE,
  BOMB,
  STRAIGHTFLUSH,
}
```
