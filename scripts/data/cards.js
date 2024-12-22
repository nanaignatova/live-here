import { IdGenerator } from '../structures/IdGenerator.js';

// Уникальный ID
const idGen = new IdGenerator();

// Данные для создания объявлений
export const cardsData = toCardsWithIds([
	{
		price: 350,
		contact: {
			name: 'Дмитрий',
			phones: ['+375 (29) 111-11-11'],
		},
		rooms: 1,
		area: {
			full: 142,
			living: 52,
			kitchen: 24,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 3,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 7,
		taps: ['1 комн', '142 м2', '7 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '16 ноября 2024',
		images: ['flat1/1.jpg', 'flat1/2.jpg', 'flat1/3.jpg', 'flat1/4.jpg'],
		building: {
			floors: 14,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
	{
		price: 280,
		contact: {
			name: 'Антон',
			phones: ['+375 (29) 222-22-22'],
		},
		rooms: 4,
		area: {
			full: 90,
			living: 45,
			kitchen: 12,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 3,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 3,
		taps: ['4 комн', '90 м2', '3 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '18 января 2024',
		images: ['flat2/1.jpg', 'flat2/2.jpg', 'flat2/3.jpg', 'flat2/4.jpg'],
		building: {
			floors: 9,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
	{
		price: 240,
		contact: {
			name: 'Александр',
			phones: ['+375 (29) 333-33-33'],
		},
		rooms: 2,
		area: {
			full: 60,
			living: 24,
			kitchen: 12,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 3,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 4,
		taps: ['2 комн', '60 м2', '4 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '23 сентября 2024',
		images: ['flat3/1.jpg', 'flat3/2.jpg', 'flat3/3.jpg', 'flat3/4.jpg'],
		building: {
			floors: 8,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
	{
		price: 310,
		contact: {
			name: 'Евгений',
			phones: ['+375 (29) 512-77-77'],
		},
		rooms: 3,
		area: {
			full: 54,
			living: 21,
			kitchen: 9,
		},
		bathroomType: 'Раздельный',
		repairType: 'Косметический',
		beds: 2,
		householdImprovement: ['Wi-Fi', 'Мебель', 'Стиральная машина'],
		rentalType: 'Долгосрочная',
		peopleSuggestions: ['С детьми', 'Парам'],
		prepayment: 'Месяц',
		floor: 9,
		taps: ['3 комн', '54 м2', '9 этаж'],
		address: {
			street: 'г.Минск , ул.Притыцкого 97',
			neighbour: 'Каменная горка',
		},
		description: 'Арендатор не оплачивает комиссию! Первое заселение! Сдаётся в аренду на длительный срок современная квартира с панорамным видом на парк!',
		lastUpdated: '12 декабря 2024',
		images: ['flat4/1.jpg', 'flat4/2.jpg', 'flat4/3.jpg', 'flat4/4.jpg'],
		building: {
			floors: 19,
			wallMaterial: 'Панельный',
			constructionYear: 1985,
			buildingImprovement: ['Стояночное место', 'Подвал'],
		},
	},
]);

function toCardsWithIds(cardsData) {
	return cardsData.map((card) => ({ id: idGen.getId(), ...card }));
}