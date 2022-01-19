import { newCard, nextValue, Suit } from '@/interfaces/deck'
import {
  clonePlay,
  findPlay,
  Hand,
  isBomb,
  isFlush,
  isFullHouse,
  isPair,
  isQuad,
  isStraight,
  isStraightFlush,
  isTriple,
  playGreater,
  validPlay,
} from '@/interfaces/play'
import { expect } from 'chai'

describe('play.ts', () => {
  it('isPair positive', () => {
    const cards = [newCard(Suit.HEART, 3), newCard(Suit.SPADE, 3)]
    const res = isPair(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.SPADE, 3))
  })
  it('isPair true negative', () => {
    const cards = [newCard(Suit.HEART, 4), newCard(Suit.SPADE, 3)]
    const res = isPair(cards)
    expect(res.found).false
  })
  it('isTriple true positive', () => {
    const cards = [
      newCard(Suit.CLUB, 3),
      newCard(Suit.HEART, 3),
      newCard(Suit.SPADE, 3),
    ]
    const res = isTriple(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.SPADE, 3))
  })
  it('isTriple true negative', () => {
    const cards = [
      newCard(Suit.HEART, 4),
      newCard(Suit.SPADE, 4),
      newCard(Suit.CLUB, 3),
    ]
    expect(isTriple(cards).found).false
  })
  it('isQuad positive', () => {
    const cards = [
      newCard(Suit.DIAMOND, 4),
      newCard(Suit.CLUB, 4),
      newCard(Suit.HEART, 4),
      newCard(Suit.SPADE, 4),
    ]
    const res = isQuad(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.SPADE, 4))
  })
  it('isQuad negative', () => {
    const cards = [
      newCard(Suit.HEART, 3),
      newCard(Suit.DIAMOND, 4),
      newCard(Suit.CLUB, 4),
      newCard(Suit.SPADE, 4),
    ]
    expect(isQuad(cards).found).false
  })
  it('nextValue from 2', () => {
    expect(nextValue(2)).to.be.undefined
  })
  it('nextValue from 13', () => {
    expect(nextValue(13)).to.equal(1)
  })
  it('nextValue from invalid', () => {
    expect(nextValue(0)).to.be.undefined
  })
  it('nextValue from normal', () => {
    expect(nextValue(5)).to.equal(6)
  })
  it('isStraight true positive', () => {
    const cards = [
      newCard(Suit.SPADE, 5),
      newCard(Suit.HEART, 6),
      newCard(Suit.HEART, 7),
      newCard(Suit.CLUB, 8),
      newCard(Suit.CLUB, 9),
    ]
    const res = isStraight(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.CLUB, 9))
  })
  it('isStraight true positive with 2', () => {
    const cards = [
      newCard(Suit.SPADE, 11),
      newCard(Suit.CLUB, 12),
      newCard(Suit.HEART, 13),
      newCard(Suit.CLUB, 1),
      newCard(Suit.HEART, 2),
    ]
    const res = isStraight(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.HEART, 2))
  })
  it('isStraight true negative', () => {
    const cards = [
      newCard(Suit.HEART, 5),
      newCard(Suit.SPADE, 7),
      newCard(Suit.CLUB, 7),
      newCard(Suit.CLUB, 8),
      newCard(Suit.HEART, 9),
    ]
    expect(isStraight(cards).found).false
  })
  it('isFlush positive', () => {
    const cards = [
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 9),
      newCard(Suit.HEART, 1),
    ]
    const res = isFlush(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.HEART, 1))
  })
  it('isFlush negative', () => {
    const cards = [
      newCard(Suit.SPADE, 5),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 1),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 9),
    ]
    expect(isFlush(cards).found).false
  })
  it('isFullHouse positive triple first', () => {
    const cards = [
      newCard(Suit.DIAMOND, 7),
      newCard(Suit.CLUB, 7),
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 8),
      newCard(Suit.SPADE, 8),
    ]
    const res = isFullHouse(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.SPADE, 7))
  })
  it('isFullHouse positive triple second', () => {
    const cards = [
      newCard(Suit.CLUB, 7),
      newCard(Suit.SPADE, 7),
      newCard(Suit.DIAMOND, 8),
      newCard(Suit.HEART, 8),
      newCard(Suit.SPADE, 8),
    ]
    const res = isFullHouse(cards)
    expect(res.found, 'found').true &&
      expect(res.value, 'value').to.eql(newCard(Suit.SPADE, 8))
  })
  it('isFullHouse negative', () => {
    const cards = [
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 7),
      newCard(Suit.HEART, 1),
      newCard(Suit.HEART, 8),
      newCard(Suit.HEART, 8),
    ]
    expect(isFullHouse(cards).found).false
  })
  it('isBomb positive', () => {
    const cards = [
      newCard(Suit.DIAMOND, 7),
      newCard(Suit.CLUB, 7),
      newCard(Suit.HEART, 7),
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 1),
    ]
    const res = isBomb(cards)
    expect(res.found, 'found').true &&
      expect(res.value).to.eql(newCard(Suit.SPADE, 7))
  })
  it('isBomb negative', () => {
    const cards = [
      newCard(Suit.SPADE, 7),
      newCard(Suit.HEART, 2),
      newCard(Suit.HEART, 1),
      newCard(Suit.CLUB, 7),
      newCard(Suit.DIAMOND, 7),
    ]
    expect(isBomb(cards).found).false
  })
  it('isStraightFlush positive', () => {
    const cards = [
      newCard(Suit.HEART, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
      newCard(Suit.HEART, 7),
    ]
    const res = isStraightFlush(cards)
    expect(res.found, 'found').true &&
      expect(res.value).to.eql(newCard(Suit.HEART, 7))
  })
  it('isStraightFlush negative cross', () => {
    const cards = [
      newCard(Suit.HEART, 2),
      newCard(Suit.HEART, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
    ]
    expect(isStraightFlush(cards).found).false
  })
  it('isStraightFlush negative suit', () => {
    const cards = [
      newCard(Suit.SPADE, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
      newCard(Suit.HEART, 7),
    ]
    expect(isStraightFlush(cards).found).false
  })
  it('isStraightFlush negative number', () => {
    const cards = [
      newCard(Suit.HEART, 3),
      newCard(Suit.HEART, 4),
      newCard(Suit.HEART, 5),
      newCard(Suit.HEART, 6),
      newCard(Suit.HEART, 8),
    ]
    expect(isStraightFlush(cards).found).false
  })
  it('findPlay single', () => {
    const cards = [newCard(Suit.CLUB, 5)]
    expect(findPlay(cards)).to.eql({
      combo: Hand.SINGLE,
      comboValue: newCard(Suit.CLUB, 5),
      cards,
    })
  })
  it('findPlay pair', () => {
    const cards = [newCard(Suit.CLUB, 5), newCard(Suit.HEART, 5)]
    expect(findPlay(cards)).to.eql({
      combo: Hand.PAIR,
      comboValue: newCard(Suit.HEART, 5),
      cards,
    })
  })
  it('findPlay triple', () => {
    const cards = [
      newCard(Suit.CLUB, 5),
      newCard(Suit.HEART, 5),
      newCard(Suit.SPADE, 5),
    ]
    expect(findPlay(cards)).to.eql({
      combo: Hand.TRIPLE,
      comboValue: newCard(Suit.SPADE, 5),
      cards,
    })
  })
  it('findPlay straight', () => {
    const cards = [
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.SPADE, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 12),
    ]
    expect(findPlay(cards)).to.eql({
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.HEART, 1),
      cards,
    })
  })
  it('findPlay flush', () => {
    const cards = [
      newCard(Suit.HEART, 11),
      newCard(Suit.HEART, 1),
      newCard(Suit.HEART, 13),
      newCard(Suit.HEART, 10),
      newCard(Suit.HEART, 8),
    ]
    expect(findPlay(cards)).to.eql({
      combo: Hand.FLUSH,
      comboValue: newCard(Suit.HEART, 1),
      cards,
    })
  })
  it('findPlay full house', () => {
    const cards = [
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 11),
      newCard(Suit.SPADE, 11),
      newCard(Suit.HEART, 10),
      newCard(Suit.DIAMOND, 10),
    ]
    expect(findPlay(cards)).to.eql({
      combo: Hand.FULLHOUSE,
      comboValue: newCard(Suit.SPADE, 11),
      cards,
    })
  })
  it('findPlay bomb', () => {
    const cards = [
      newCard(Suit.CLUB, 11),
      newCard(Suit.HEART, 11),
      newCard(Suit.SPADE, 11),
      newCard(Suit.DIAMOND, 11),
      newCard(Suit.DIAMOND, 10),
    ]
    expect(findPlay(cards)).to.eql({
      combo: Hand.BOMB,
      comboValue: newCard(Suit.SPADE, 11),
      cards,
    })
  })
  it('findPlay straight flush', () => {
    const cards = [
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 11),
      newCard(Suit.SPADE, 13),
      newCard(Suit.SPADE, 12),
      newCard(Suit.SPADE, 2),
    ]
    expect(findPlay(cards)).to.eql({
      combo: Hand.STRAIGHTFLUSH,
      comboValue: newCard(Suit.SPADE, 2),
      cards,
    })
  })
  it('findPlay 5 card invalid', () => {
    const cards = [
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 11),
      newCard(Suit.SPADE, 13),
      newCard(Suit.SPADE, 12),
      newCard(Suit.HEART, 1),
    ]
    expect(findPlay(cards)).to.be.undefined
  })
  it('findPlay 4 card invalid', () => {
    const cards = [
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 11),
      newCard(Suit.SPADE, 13),
      newCard(Suit.SPADE, 12),
    ]
    expect(findPlay(cards)).to.be.undefined
  })
  it('findPlay 3 card invalid', () => {
    const cards = [
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 11),
      newCard(Suit.SPADE, 12),
    ]
    expect(findPlay(cards)).to.be.undefined
  })
  it('findPlay 2 card invalid', () => {
    const cards = [newCard(Suit.SPADE, 1), newCard(Suit.SPADE, 12)]
    expect(findPlay(cards)).to.be.undefined
  })
  it('findPlay 0 card invalid', () => {
    const cards = []
    expect(findPlay(cards)).to.be.undefined
  })
  it('findPlay 6 card invalid', () => {
    const cards = [
      newCard(Suit.SPADE, 1),
      newCard(Suit.SPADE, 11),
      newCard(Suit.SPADE, 13),
      newCard(Suit.SPADE, 12),
      newCard(Suit.HEART, 1),
      newCard(Suit.DIAMOND, 1),
    ]
    expect(findPlay(cards)).to.be.undefined
  })
  it('findPlay invalid card value', () => {
    const cards = [{ suit: Suit.CLUB, value: 0 }]
    expect(findPlay(cards)).to.be.undefined
  })
  it('findPlay invalid card suit', () => {
    const cards = [{ suit: Suit.CLUB + 10, value: 3 }]
    expect(findPlay(cards)).to.be.undefined
  })
  it('playGreater positive combo', () => {
    const play1 = {
      combo: Hand.FLUSH,
      comboValue: newCard(Suit.DIAMOND, 6),
      cards: [],
    }
    const play2 = {
      combo: Hand.FULLHOUSE,
      comboValue: newCard(Suit.CLUB, 7),
      cards: [],
    }
    expect(playGreater(play2, play1)).true
  })
  it('playGreater positive value', () => {
    const play1 = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.DIAMOND, 9),
      cards: [],
    }
    const play2 = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.CLUB, 9),
      cards: [],
    }
    expect(playGreater(play2, play1)).true
  })
  it('validPlay negative number difference', () => {
    const prevPlay = {
      combo: Hand.SINGLE,
      comboValue: newCard(Suit.DIAMOND, 3),
      cards: [newCard(Suit.DIAMOND, 3)],
    }
    const play = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.HEART, 1),
      cards: [
        newCard(Suit.CLUB, 11),
        newCard(Suit.HEART, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 12),
      ],
    }
    expect(
      validPlay({ play, playerIndex: 1 }, { play: prevPlay, playerIndex: 0 }),
    ).to.be.false
  })
  it('validPlay negative value difference', () => {
    const prevPlay = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.CLUB, 1),
      cards: [
        newCard(Suit.CLUB, 11),
        newCard(Suit.CLUB, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 12),
      ],
    }
    const play = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.DIAMOND, 1),
      cards: [
        newCard(Suit.CLUB, 11),
        newCard(Suit.DIAMOND, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 12),
      ],
    }
    expect(
      validPlay({ play, playerIndex: 1 }, { play: prevPlay, playerIndex: 0 }),
    ).to.be.false
  })
  it('validPlay positive', () => {
    const prevPlay = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.CLUB, 1),
      cards: [
        newCard(Suit.CLUB, 11),
        newCard(Suit.CLUB, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 12),
      ],
    }
    const play = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.HEART, 1),
      cards: [
        newCard(Suit.CLUB, 11),
        newCard(Suit.HEART, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 12),
      ],
    }
    expect(
      validPlay({ play, playerIndex: 1 }, { play: prevPlay, playerIndex: 0 }),
    ).to.be.true
  })
  it('validPlay positive no previous', () => {
    const play = {
      combo: Hand.STRAIGHT,
      comboValue: newCard(Suit.HEART, 1),
      cards: [
        newCard(Suit.CLUB, 11),
        newCard(Suit.HEART, 1),
        newCard(Suit.SPADE, 13),
        newCard(Suit.HEART, 10),
        newCard(Suit.DIAMOND, 12),
      ],
    }
    expect(validPlay({ play, playerIndex: 1 })).to.be.true
  })
  it('clonePlay', () => {
    let clone
    let jsonClone
    {
      const card = newCard(Suit.DIAMOND, 3)
      const play = {
        combo: Hand.SINGLE,
        comboValue: card,
        cards: [card],
      }
      jsonClone = JSON.parse(JSON.stringify(play))
      clone = clonePlay(play)
    }
    expect(clone).to.eql(jsonClone)
  })
})
