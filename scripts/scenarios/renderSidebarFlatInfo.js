import { Store } from '../structures/Store.js';
import { Renderer } from '../structures/Renderer.js';

const priceToDay = (value) => `${value} р./день`;

// Сценарий монтирующий блок для связи на странице объявления
export function renderSidebarInfo() {
	const flatData = Store.getData((state) => state.flat);
	if (!flatData) return;

	const { price, taps, address, contact } = flatData;

	Renderer.renderHtmlItem(
		'.sidebar__info',
		renderSidebarInfoHtml,
		{ price, taps, address },
	);

	Renderer.renderHtmlItem(
		'.sidebar__contact',
		renderSidebarContactHtml,
		{ contact },
	);
}

const renderSidebarInfoHtml = ({
	price,
	taps,
	address,
}) => {
	const tapsHtml = taps.reduce((acc, tap) => {
		return `
			${acc}
      <div class="taps__item">${tap}</div>
		`;
	}, '');

	return `
		<h2 class="sidebar__info_price">${priceToDay(price)}</h2>
    <div class="sidebar__info_taps taps">${tapsHtml}</div>
    <h3 class="sidebar__info_address">
      ${address.street}
      <br />
      ${address.neighbour}
    </h3>
	`;
};

const renderSidebarContactHtml = ({ contact }) => {
	const phonesHtml = contact.phones.reduce((acc, phone) => {
		return `
			${acc}
      <a class="sidebar__contact_phone" href="tel:${cleanPhoneNumber(phone)}">${phone}</a>
		`;
	}, '');

	return `
		<h4 class="sidebar__contact_title">Контактное лицо</h4>
    <span class="sidebar__contact_name">${contact.name}</span>
    <div class="sidebar__contact_phones">${phonesHtml}</div>
	`;
};

function cleanPhoneNumber(phone) {
	return phone.replace(/[^\d+]/g, '');
}