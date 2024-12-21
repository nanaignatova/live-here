import { Store } from './structures/Store.js';
import { Select } from './components/Select.js';
import { Renderer } from './structures/Renderer.js';
import { IdGenerator } from './structures/IdGenerator.js';
import { cardsData } from './data/cards.js';

const initialiseCards = () => {
	const cardRenderHtmlFunction = ({
		id,
		price,
		taps: tapsArray,
		address: { street, neighbour },
		description,
		updatedAt,
		images,
	}) => {

		const taps = tapsArray.reduce((acc, tap) => {
			acc += `<div class="taps__item">${tap}</div>`;
			return acc;
		}, '');

		return `
		<a class="card cards__item" href="flat.html?card=${id}" data-id="${id}">
      <div class="card__content">
        <div class="card__content_images">
          <img class="images__item" src="images/image1.png" alt="image1" />
        </div>
        <div class="card__content_info">
          <h2 class="card__info_title">${price}</h2>
          <div class="card__info_taps">${taps} </div>
          <h3 class="card__info_address">${street}</h3>
          <h4 class="card__info_neighbour">${neighbour}</h4>
          <h5 class="card__info_description">${description}</h5>
        </div>
      </div>
      <div class="card__updated">
				<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path opacity="0.7" d="M9.4905 0C4.2465 0 0 4.256 0 9.5C0 14.744 4.2465 19 9.4905 19C14.744 19 19 14.744 19 9.5C19 4.256 14.744 0 9.4905 0ZM9.5 17.1C5.301 17.1 1.9 13.699 1.9 9.5C1.9 5.301 5.301 1.9 9.5 1.9C13.699 1.9 17.1 5.301 17.1 9.5C17.1 13.699 13.699 17.1 9.5 17.1ZM9.975 4.75H8.55V10.45L13.5375 13.4425L14.25 12.274L9.975 9.7375V4.75Z" fill="black"/>
				</svg>
        <h6>${updatedAt}</h6>
      </div>
      <button class="btn card__call">Позвонить</button>
	  </a>
	`;
	};

	Store.addToState((prevState) => ({
		...prevState,
		cards: [...cardsData],
	}));

	Renderer.renderHtmlItems(
		'.main__content_cards',
		cardRenderHtmlFunction,
		Store.getData((state) => state.cards),
	);
};

const initialiseSelectComponents = () => {
	const idGen = new IdGenerator();

	const sortingChooser = {
		elId: 'sorting',
		visibleBlockSelector: '.chooser__visible',
		variantsBlockSelector: '.chooser__variants',
		isOpenedByDefault: false,
		defaultVariantId: idGen.getId(),
		getVariants() {
			return [
				{ label: 'Рекомендованные', id: sortingChooser.defaultVariantId },
				{ label: 'Сначала дорогие', id: idGen.getId() },
				{ label: 'Сначала дешевые', id: idGen.getId() },
				{ label: 'Сначала новые', id: idGen.getId() },
			];
		},
		chosenIcon: `
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
	      <path d="M5.72727 14.2388L1.43182 8.59702L0 10.4776L5.72727 18L18 1.8806L16.5682 0L5.72727 14.2388Z" fill="black"/>
	  </svg>
	`,
		visiblePartRenderFn({ label }) {
			return `
	    <div class="chooser__visible">
				<svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M4.64286 6.6595L4.64286 0L2.78571 0L2.78571 6.6595H3.57628e-07L3.71429 10.45L7.42857 6.6595L4.64286 6.6595ZM5.57143 12.3405H8.35714V19H10.2143V12.3405H13L9.28571 8.55L5.57143 12.3405Z" fill="black"/>
				</svg>
	      <span>${label}</span>
	    </div>
		`;
		},
		variantsRenderFn({ currentVariantId, variants }) {
			const variantsHtml = variants.reduce((acc, variant) => {
				const isChosen = currentVariantId === variant.id;

				acc += `
			    <div class="chooser__variants_item${isChosen ? ' chosen' : ''}" data-variant="${variant.id}">
		        <span>${variant.label}</span>
		        ${isChosen ? sortingChooser.chosenIcon : ''}
			    </div>
				`;

				return acc;
			}, '');

			return `<div class="chooser__variants">${variantsHtml}</div>`;
		},
	};

	const filterChooserGeneral = {
		visibleBlockSelector: '.filter__chooser_field',
		variantsBlockSelector: '.filter__chooser_variants',
		isOpenedByDefault: false,
		visiblePartRenderFn({ label, isOpened, labelTextDecorator }) {
			const decoratedLabel = labelTextDecorator(label);

			return `
			<div class="filter__chooser_field filter__variant">
        <span>${decoratedLabel}</span>
        <div class="field__arrow${isOpened ? ' opened' : ''}">
          <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          	<path d="M1.73023 0L8.65116 5.54446L15.5721 0L17.3023 1.19661L8.65116 8.10345L0 1.19661L1.73023 0Z" fill="black"/>
          </svg>
        </div>
      </div>
		`;
		},
		variantsRenderFn({ currentVariantId, variants }) {
			const variantsHtml = variants.reduce((acc, variant) => {
				const isChosen = currentVariantId === variant.id;
				return `
				${acc}
        <div class="filter__variant${isChosen ? ' chosen' : ''}" data-variant="${variant.id}">${variant.label}</div>
			`;
			}, '');

			return `<div class="filter__chooser_variants">${variantsHtml}</div>`;
		},
	};

	const typeFilterChooser = {
		elId: 'chooser-type',
		defaultVariantId: idGen.getId(),
		getVariants() {
			return [
				{ label: 'Посуточно', id: idGen.getId() },
				{ label: 'Купить', id: idGen.getId() },
				{ label: 'Снять', id: typeFilterChooser.defaultVariantId },
			];
		},
		...filterChooserGeneral,
	};

	const whatFilterChooser = {
		elId: 'chooser-what',
		defaultVariantId: idGen.getId(),
		getVariants() {
			return [
				{ label: 'Комнату', id: idGen.getId() },
				{ label: 'Квартиру', id: whatFilterChooser.defaultVariantId },
				{ label: 'Дом', id: idGen.getId() },
			];
		},
		...filterChooserGeneral,
	};

	const flatFilterChooser = {
		elId: 'chooser-flat',
		defaultVariantId: idGen.getId(),
		getVariants() {
			return [
				{ label: '1', id: flatFilterChooser.defaultVariantId },
				{ label: '2', id: idGen.getId() },
				{ label: '3', id: idGen.getId() },
				{ label: '4', id: idGen.getId() },
				{ label: '5+', id: idGen.getId() },
			];
		},
		labelTextDecorator: (chosenLabel) => {
			const whatChooser = Select.selects.get(whatFilterChooser.elId);
			return `${chosenLabel} ${whatChooser.currentLabel}`
		},
		...filterChooserGeneral,
	};

	const cityFilterChooser = {
		elId: 'chooser-city',
		defaultVariantId: idGen.getId(),
		getVariants() {
			return [
				{ label: 'Минск', id: cityFilterChooser.defaultVariantId },
				{ label: 'Брест', id: idGen.getId() },
				{ label: 'Витебск', id: idGen.getId() },
				{ label: 'Гомель', id: idGen.getId() },
				{ label: 'Гродно', id: idGen.getId() },
				{ label: 'Могилев', id: idGen.getId() },
			];
		},
		...filterChooserGeneral,
	};


	function addChooserAdapter({
		elId,
		defaultVariantId,
		visibleBlockSelector,
		variantsBlockSelector,
		getVariants,
		isOpenedByDefault,
		visiblePartRenderFn,
		variantsRenderFn,
		labelTextDecorator,
	}) {
		return [
			elId,
			defaultVariantId,
			getVariants(),
			isOpenedByDefault,
			visibleBlockSelector,
			variantsBlockSelector,
			visiblePartRenderFn,
			variantsRenderFn,
			labelTextDecorator,
		];
	}

	Select.addSelect(...addChooserAdapter(sortingChooser));
	Select.addSelect(...addChooserAdapter(typeFilterChooser));
	Select.addSelect(...addChooserAdapter(whatFilterChooser));
	Select.addSelect(...addChooserAdapter(flatFilterChooser));
	Select.addSelect(...addChooserAdapter(cityFilterChooser));

	Select.renderAllToDomOnInitialise();
}

function selectOutClick(event) {
	if (!Select.isAnyOpened) return;

	const choosers = [...Select.selects.values()];
	let targeted = false;

	for (const chooser of [...Select.selects.values()]) {
		if (event.target.closest(`#${chooser.id}`)) {
			targeted = true;
			break;
		}
	}

	if (!targeted) {
		choosers.forEach((chooser) => {
			chooser.close();
			Select.renderSelectAfterUpdate(chooser.id);
		});
	}
}

const initialiseDomEvents = () => {
	document.addEventListener('click', selectOutClick);
	document.addEventListener('scroll', () => {
		const header = document.querySelector('header');
		const contactBlock = document.querySelector('.main__flat_sidebar');
		const style = '0 2px 4px 0 #9d9d9d';

		console.dir(contactBlock);

		header.style.boxShadow = window.scrollY > 0 ? style : '';
	});
};

Store.connect();
initialiseCards();
initialiseSelectComponents();
initialiseDomEvents();