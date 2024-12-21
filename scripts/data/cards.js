import { IdGenerator } from '../structures/IdGenerator.js';

// Уникальный ID
const idGen = new IdGenerator();

// Данные для создания объявлений
export const cardsData = toCardsWithIds([
	{
		price: 100,
		contact: {
			name: 'Дмитрий',
			phones: ['+375 (29) 111-11-11'],
		},
		rooms: 1,
		area: {
			full: 40,
			living: 32,
			kitchen: 8,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 3,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 1,
		taps: ['1 комн', '40 м2', '4 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '16 ноября 2024',
		images: ['image1.png', 'image2.jfif', 'image1.png'],
		building: {
			floors: 12,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
	{
		price: 100,
		contact: {
			name: 'Дмитрий',
			phones: ['+375 (29) 111-11-11'],
		},
		rooms: 1,
		area: {
			full: 40,
			living: 32,
			kitchen: 8,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 3,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 1,
		taps: ['1 комн', '40 м2', '4 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '16 ноября 2024',
		images: ['image1.png', 'image2.jfif', 'image1.png'],
		building: {
			floors: 12,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
	{
		price: 100,
		contact: {
			name: 'Дмитрий',
			phones: ['+375 (29) 111-11-11'],
		},
		rooms: 1,
		area: {
			full: 40,
			living: 32,
			kitchen: 8,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 3,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 1,
		taps: ['1 комн', '40 м2', '4 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '16 ноября 2024',
		images: ['image1.png', 'image2.jfif', 'image1.png'],
		building: {
			floors: 12,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
	{
		price: 100,
		contact: {
			name: 'Дмитрий',
			phones: ['+375 (29) 111-11-11'],
		},
		rooms: 1,
		area: {
			full: 40,
			living: 32,
			kitchen: 8,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 3,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 1,
		taps: ['1 комн', '40 м2', '4 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '16 ноября 2024',
		images: ['image1.png', 'image2.jfif', 'image1.png'],
		building: {
			floors: 12,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
]);

function toCardsWithIds(cardsData) {
	return cardsData.map((card) => ({ id: idGen.getId(), ...card }));
}