# Big Two Engine

## Description

This is a TypeScript library that can be used to run games of Big Two. Additional rulesets and scoring may be added in the future.

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

Start the game by dealing the cards using the `dealCards` method. There are some [options](#dealoptions) that can change how the cards are dealt. All optional parameters are false by default:

```ts
game.dealCards(options)
```

Once cards have been dealt, plays can begin to be made. The player at index `0` always starts.

Plays are made using the `makePlay` method, which automatically attempts to play the specified hand from the player whose turn it is.

Plays can easily be formed using the `findPlay` function, which createds a play given only an array of `Cards`

Information about the state of the game can be acquired using the various getters provided in the `Game` object.

Note: The `Card` objects being used in the game should not be modified directly, as only a single instance of each card is created when dealing for the sake of memory efficiency.

For more detailed information about the API, view the [API](https://github.com/sqooid/bigtwo/blob/main/API.md) documentation.
