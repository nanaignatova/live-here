import { Store } from '../structures/Store.js';

// Сценарий получения данных открытого объявления
export const findFlatDataInStoreAndSave = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const cardSelector = (state) => {
		return state.cards.find((item) => item.id === searchParams.get('card'));
	};

	const card = Store.getData(cardSelector);

	Store.addToState((state) => ({
		...state,
		flat: card
	}));
};
