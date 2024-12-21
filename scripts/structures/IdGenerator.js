// Класс для создания уникальных ID
export class IdGenerator {
	static #ID = 0;

	#innerId = IdGenerator.#ID++;

	constructor() {
		this.getId.innerId = 0;
	}

	getId() {
		return `${this.#innerId}-${this.getId.innerId++}`;
	}
}
