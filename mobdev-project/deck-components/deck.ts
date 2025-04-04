class Deck {
    constructor(
        private name: string,
        private cards: Card[],
    ) {

        if (cards.length !== 5) {
            throw new Error("A deck must contain exactly 5 cards.");
        }
    }

    static newDeck(name: string, cards: Card[]): Deck {
        return new Deck(name, cards);
    }

    // Example method
    getCards(): Card[] {
        return this.cards;
    }

    
}

