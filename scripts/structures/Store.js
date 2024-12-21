// Класс создающий общее хранилище для сайта, которое хранится в localStorage
export class Store {
	static #key = 'store';
	static #state = null;

	static get state() {
		return JSON.parse(JSON.stringify(this.#state));
	}

	static getData(selector) {
		return selector(Store.#state);
	}

	static connect() {
		if (!window) return;

		const serialisedData = window.localStorage.getItem(Store.#key);
		Store.#state = JSON.parse(serialisedData);
	}

	static save() {
		if (!window) return;

		const serialisedData = JSON.stringify(Store.#state);

		window.localStorage.setItem(Store.#key, serialisedData);
	}

	static addToState(callback) {
		Store.#state = callback(Store.#state)
		Store.save();
	}
}