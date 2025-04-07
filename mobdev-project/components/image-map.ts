import cardsList from '../res/cards.json';
import ownedCardsList from '../res/owned-cards.json';

// export const cardsData = cardsList.cards;
// export const ownedCardsData = ownedCardsList.ownedCards;

import { createCard } from "../card-component-classes/card";


export const imageMap: Record<string, any> = {
    "rizzler.png": require("../assets/images/rizzler.png"),
    "peaked.png": require("../assets/images/peaked.png"),
    "anime.png": require("../assets/images/anime.png"),
    "moo-deng.png": require("../assets/images/moo-deng.png"),
    "morning.png": require("../assets/images/morning.png"),
    "oiia.png": require("../assets/images/oiia.png"),
    "street.png": require("../assets/images/street.png"),
    "fortni.png": require("../assets/images/fortni.png"),
    "smite.png": require("../assets/images/smite.png"),
    "chill.png": require("../assets/images/chill.png"),
    "giga.png": require("../assets/images/giga.png"),
    "elite.png": require("../assets/images/elite.png")
};

export const cardsData = cardsList.cards.map(createCard);
export const ownedCardsData = ownedCardsList.ownedCards.map(createCard);

