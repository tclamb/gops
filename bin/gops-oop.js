Math.random = () => 0.4;

class Deck {
    constructor() {
        this.cards = [1,2,3,4,5,6,7,8];
    }

    popRandom() {
        const index = Math.floor(Math.random() * this.cards.length);
        const value = this.cards[index];
        this.cards.splice(index, 1);
        return value;
    }

    remove(cardValue) {
        this.cards.splice(this.cards.indexOf(cardValue), 1);
    }

    hasCards() {
        return this.cards.length > 0;
    }
}

class Player {
    constructor() {
        this.cards = new Deck();
        this.score = 0;
    }

    scorePoint(value) {
        this.score += value;
    }

    getScore() {
        return this.score;
    }
}

class RandomPlayer extends Player {
    playCard(scoreCard) {
        return this.cards.popRandom();
    }
}

class EqualPlayer extends Player {
    playCard(scoreCard) {
        this.cards.remove(scoreCard);
        return scoreCard;
    }
}

class Game {
    constructor() {
        this.players = [new RandomPlayer(), new EqualPlayer()];
        this.scoreCards = new Deck();
        this.turn = 0;
    }

    playTurn() {
        const scoreCard = this.scoreCards.popRandom();

        console.log(`Turn ${this.turn}: Bounty: ${scoreCard}`);

        const card0 = this.players[0].playCard(scoreCard);
        const card1 = this.players[1].playCard(scoreCard);

        console.log(`\tPlayer 0 plays: ${card0}`);
        console.log(`\tPlayer 1 plays: ${card1}`);

        if (card0 > card1) {
            this.players[0].scorePoint(scoreCard);
        } else if (card1 > card0) {
            this.players[1].scorePoint(scoreCard);
        }
        
        this.turn += 1;
    }

    playGame() {
        while (this.scoreCards.hasCards()) {
            this.playTurn();
        }

        console.log(`Scores: ${this.players[0].score} = ${this.players[1].score}`);

        if (this.players[0].score == this.players[1].score) {
            console.log('Players tie!');
        } else if (this.players[0].score > this.players[1].score) {
            console.log('Players 0 wins!');
        } else {
            console.log('Player 1 wins!');
        }
    }
}

new Game().playGame();
