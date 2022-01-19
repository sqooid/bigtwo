# Big Two Engine API

## Classes

### Game

```ts
class Game {
  /**
   * Clears all existing state
   */
  clear()

  /**
   * Clears any current state and deals cards to players with options
   * @param options Deal options
   */
  dealCards(options: DealOptions)

  /**
   * Makes play and advances turn if play was valid, no change otherwise
   * Sets winner if play results in player having no cards left
   * @param play Play to make, with sorted cards. Pass if undefined
   * @returns True if play was valid, false if invalid play
   */
  makePlay(play?: Play): boolean

  /**
   * Getters
   */

  /**
   * Gets the array of all the current players
   * Can be indexed to get specific players
   */
  get players(): Player[]

  /**
   * Number of players
   */
  get playerCount(): number

  /**
   * The current turn number
   */
  get turn(): number {
    return this._state.turn
  }

  /**
   * The index of the player who is to make the next play
   */
  get currentPlayer(): number

  /**
   * Gets the current state of the board
   */
  get board(): BoardPlay[]

  /**
   * Gives the index of the winner of the game
   * Could also be used to check if the game is finished or not
   */
  get winner(): number | undefined

  /**
   * Check if game is finished, i.e. if there is a winner
   */
  get isFinished(): boolean
}
```

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
