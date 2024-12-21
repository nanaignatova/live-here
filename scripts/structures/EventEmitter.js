export class EventEmitter {
	static #subscribers = new Map();

	static emit(eventName, data) {
		const subs = EventEmitter.#subscribers.get(eventName);
		if (!subs) return;

		subs.forEach((sub) => {
			sub(data);
		});
	}

	static subscribe(eventName, callback) {
		const subs = EventEmitter.#subscribers.get(eventName) || [];
		EventEmitter.#subscribers.set(eventName, [...subs, callback]);
	}
}