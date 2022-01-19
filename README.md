# Big Two Engine

## Description

This is a TypeScript library that can be used to run games of Big Two. Additional rulesets, scoring and sandboxing may be added in the future.

## Install

Can be installed using NPM using:

```
npm install @sqooid/big-two
```

## Getting started

Create a Big Two `Game` instance using `createGame`:

```ts
const game = createGame()
```

Start the game by dealing the cards using the `dealCards` method. Specify options with a `DealOptions` parameter. All optional parameters are false by default:

```ts
game.dealCards({
  playerCount: 4,
})
```

Once cards have been dealt, plays can begin to be made. The player at index `0` always starts.

Information about the state of the game can be acquired using the various getters provided in the `Game` object.

For instance, to get cards held by the current player:

```ts
const currentPlayerIndex = game.currentPlayer
const currentPlayerCards = game.players[currentPlayerIndex].cards
```

Plays are made using the `makePlay` method, which automatically attempts to play the specified hand from the player whose turn it is. Whether the play was successful or not can be checked by the return value.

Plays can easily be formed using the `findPlay` function, which createds a play given only an array of `Cards`. For instance:

```ts
// Suppose player1's third and fourth cards form a pair
const play = findPlay([player1[2], player1[3]])
const result = game.makePlay(play)
// result would be true if this play was valid
```

After making each successful play, the game should be checked to see someone has won:

```ts
const winnerIndex = game.winner
if (winnerIndex !== undefined) {
  // Index of winner is winnerIndex
  console.log('winner is player', winnerIndex + 1)
}
```

Calls to `makePlay` will then continue until such a winner is found. After a player has won, subsequent calls to `makePlay` will always fail.

Note: The `Card` objects being used in the game should not be modified directly, as only a single instance of each card is created when dealing for the sake of memory efficiency.

For more detailed information about the API, view the [API](https://github.com/sqooid/bigtwo/blob/main/API.md) documentation.
