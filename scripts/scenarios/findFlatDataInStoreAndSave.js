import { Store } from '../structures/Store.js';
import { cardsData } from '../data/cards.js';

// Сценарий получения данных открытого объявления
export const findFlatDataInStoreAndSave = () => {
	const searchParams = new URLSearchParams(window.location.search);

	const cardSelector = (state) => state.cards.find((item) => item.id === searchParams.get('card'));
	const cardsSelector = (state) => state.cards;

	if (!Store.getData(cardsSelector)) {
		Store.addToState((prevState) => ({
			...prevState,
			cards: [...cardsData],
		}));
	}

	const card = Store.getData(cardSelector);

	Store.addToState((state) => ({
		...state,
		flat: card
	}));
};
