const playArea = document.querySelector('.memory-cards');
const memoryCards = document.querySelectorAll('.memory-card');
const victoryModal = document.querySelector('.overlay');
const closeModal = document.querySelector('.close');
let firstCard;
let secondCard;
const numOfPairs = memoryCards.length / 2;
let points = 0;
shuffleCards(memoryCards);
closeModal.addEventListener('click', () => {
    points = 0;
    firstCard = undefined;
    secondCard = undefined;
    memoryCards.forEach((card) => card.classList.remove('flip'));
    shuffleCards(memoryCards);
    victoryModal.style.display = 'none';
});
playArea.addEventListener('click', (event) => {
    const target = event.target;
    let card;
    if (target.dataset.card) {
        card = target;
    }
    else if (target.parentElement.dataset.card) {
        card = target.parentElement;
    }
    else {
        return;
    }
    if (card) {
        card.classList.add('flip');
        if (!firstCard) {
            firstCard = card;
        }
        else {
            secondCard = card;
            compareCards(firstCard, secondCard);
        }
    }
});
function shuffleCards(memoryCards) {
    const arr = Array.from(memoryCards);
    let i = 0;
    while (i < 5) {
        arr.sort((a, b) => 0.5 - Math.random());
        i++;
    }
    playArea.innerHTML = '';
    arr.forEach((card) => playArea.append(card));
}
function compareCards(card1, card2) {
    if (card1.dataset.card === card2.dataset.card) {
        points += 1;
        if (points >= numOfPairs)
            victoryModal.style.display = 'flex';
    }
    else {
        sleep(1000).then(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
        });
    }
    firstCard = undefined;
    secondCard = undefined;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
