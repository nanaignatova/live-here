import { Store } from './structures/Store.js';

const findDataFromStoreAndFillThePage = () => {
	const searchParams = new URLSearchParams(window.location.search);
	const cardSelector = (state) => {
		return state.cards.find((item) => item.id === searchParams.get('card'));
	};

	const card = Store.getData(cardSelector);
	// console.log(card);
};

Store.connect();``
findDataFromStoreAndFillThePage();

const customiseContactBlockAccordingToScroll = (header, contactBlock, back) => {
	const backRect = back.getBoundingClientRect();

	if (window.scrollY >= backRect.bottom - 2) contactBlock.classList.add('connected');
	else contactBlock.classList.remove('connected');
};

document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('header');
	const contactBlock = document.querySelector('.main__flat_sidebar');
	const back = document.querySelector('.main__back');

	customiseContactBlockAccordingToScroll(header, contactBlock, back);

	document.addEventListener('scroll', () => {
		customiseContactBlockAccordingToScroll(header, contactBlock, back);
	});
});