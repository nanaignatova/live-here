import { IdGenerator } from '../structures/IdGenerator.js';

const idGen = new IdGenerator();

export class Card {
	constructor(
		price,
		tapsArray,
		address,
		neighbour,
		description,
		updatedAt,
		imagesArray,
	) {
		this.price = price;
		this.tapsArray = tapsArray;
		this.address = address;
		this.neighbour = neighbour;
		this.description = description;
		this.updatedAt = updatedAt;
		this.imagesArray = imagesArray;
		this.id = idGen.getId();
	}
}