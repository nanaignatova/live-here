import { Renderer } from '../structures/Renderer.js';
import { Store } from '../structures/Store.js';
import { cardsData } from '../data/cards.js';
import { initialiseFlatMiniSlider } from './initialiseSliders.js';

const priceToDay = (value) => `${value} р./день`;

function doAfterRender(callback) {
	setTimeout(callback, 0);
}

// Сценарий монтирующий объявления в DOM дерево на главной странице
export function initialiseCards() {
	Store.addToState((prevState) => ({
		...prevState,
		cards: [...cardsData],
	}));

	Renderer.renderHtmlItems(
		'.main__content_cards',
		cardRenderHtmlFunction,
		Store.getData((state) => state.cards),
	);

	renderAmountOfAnnouncements();
}

const cardRenderHtmlFunction = ({
	id,
	price,
	taps: tapsArray,
	address: { street, neighbour },
	description,
	lastUpdated,
	images,
}) => {
	const taps = tapsArray.reduce((acc, tap) => {
		acc += `<div class="taps__item">${tap}</div>`;
		return acc;
	}, '');

	const slides = images.reduce((acc, image) => {
		acc += `
				<div class="images__item image__wrapper">
					<img src="images/${image}" alt="image1" data-slide />
				</div>
			`
		return acc;
	}, '');

	doAfterRender(() => initialiseFlatMiniSlider(id, images));

	return `
			<div class="card cards__item" data-id="${id}">
	      <div class="card__content">
	        <div class="card__content_slider" data-slider="${id}">
	          <div class="card__content_images" data-slides-root>
	          	${slides}
						</div>
						<div class="card__content_controls" data-controls>
							<div class="control controls__prev" data-go="back">
								<img src="images/arrow-right.png" alt="arrow">
							</div>
							<div class="control controls__next" data-go="next">
								<img src="images/arrow-right.png" alt="arrow">
							</div>
						</div>
						<div class="card__content_counter">
							<span class="current__slide">1</span><span>/</span><span>${images.length}</span>
						</div>
	        </div>
	        <div class="card__content_info">
	          <h2 class="card__info_title">${priceToDay(price)}</h2>
	          <div class="card__info_taps taps">${taps}</div>
	          <h3 class="card__info_address">
							${street}
							<br />
							${neighbour}	
						</h3>
	          <h5 class="card__info_description">${description}</h5>
	        </div>
	      </div>
	      <div class="card__updated">
					<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path opacity="0.7" d="M9.4905 0C4.2465 0 0 4.256 0 9.5C0 14.744 4.2465 19 9.4905 19C14.744 19 19 14.744 19 9.5C19 4.256 14.744 0 9.4905 0ZM9.5 17.1C5.301 17.1 1.9 13.699 1.9 9.5C1.9 5.301 5.301 1.9 9.5 1.9C13.699 1.9 17.1 5.301 17.1 9.5C17.1 13.699 13.699 17.1 9.5 17.1ZM9.975 4.75H8.55V10.45L13.5375 13.4425L14.25 12.274L9.975 9.7375V4.75Z" fill="black"/>
					</svg>
	        <h6>${lastUpdated}</h6>
	      </div>
	      <a class="btn btn-primary card__call" href="flat.html?card=${id}" target="_blank">Позвонить</a>
		  </div>
		`;
};

function renderAmountOfAnnouncements() {
	Renderer.renderHtmlItem(
		'.info__amount',
		(amount) => `${amount} объявлени${getAnnouncementSuffix(amount)}`,
		Store.getData((state) => state.cards).length,
	)
}

function getAnnouncementSuffix(number) {
	const lastDigit = number % 10;
	const lastTwoDigits = number % 100;
	const cases = [
		{ condition: lastTwoDigits >= 11 && lastTwoDigits <= 14, get: 'й' },
		{ condition: lastDigit === 1, get: 'е' },
		{ condition: lastDigit >= 2 && lastDigit <= 4, get: 'я' },
		{ condition: true, get: 'й' },
	];

	return cases.find(({ condition, get }) => condition).get;
}