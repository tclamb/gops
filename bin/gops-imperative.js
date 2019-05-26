function runGame() {
    let turn = 0;
    let bountyCards = [1,2,3,4,5,6,7,8];
    let playerCards = [[1,2,3,4,5,6,7,8],
                       [1,2,3,4,5,6,7,8]];
    let playerScores = [0, 0];

    while (bountyCards.length > 0) {
        const bountyCard = popRandom(bountyCards);

        console.log(`Turn ${turn}: Bounty: ${bountyCard}`);

        const card0 = playRandomStrategy(playerCards[0], bountyCard);
        const card1 = playEqualStrategy(playerCards[1], bountyCard);
        turn += 1;

        if (card0 > card1) {
            playerScores[0] += bountyCard;
        } else if (card1 > card0) {
            playerScores[1] += bountyCard;
        }
    }

    console.log(`Scores: ${playerScores[0]} = ${playerScores[1]}`);

    if (playerScores[0] == playerScores[1]) {
        console.log('Players tie!');
    } else if (playerScores[0] > playerScores[1]) {
        console.log('Players 0 wins!');
    } else {
        console.log('Player 1 wins!');
    }
}

function popRandom(arr) {
    const index = Math.floor(Math.random() * arr.length);
    const value = arr[index];
    arr.splice(index, 1);
    return value;
}

function playRandomStrategy(playerCards, bountyCard) {
    const card = popRandom(playerCards);
    console.log(`\tPlayer 0 plays: ${card}`);
    return card;
}

function playEqualStrategy(playerCards, bountyCard) {
    playerCards.splice(playerCards.indexOf(bountyCard), 1);
    console.log(`\tPlayer 1 plays: ${bountyCard}`);
    return bountyCard;
}

runGame();
