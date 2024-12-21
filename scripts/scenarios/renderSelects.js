import { IdGenerator } from '../structures/IdGenerator.js';
import { Select } from '../structures/Select.js';

const idGen = new IdGenerator();

// Сценарий монтирующий все select на странице
export function initialiseSelectComponents() {
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
		labelTextDecorator: amountToFlat,
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

	const cotyMobileFilterSelect = {
		elId: 'mobile-filters-select',
		defaultVariantId: idGen.getId(),
		getVariants() {
			return [
				{ label: 'Минск', id: cotyMobileFilterSelect.defaultVariantId },
				{ label: 'Брест', id: idGen.getId() },
				{ label: 'Витебск', id: idGen.getId() },
				{ label: 'Гомель', id: idGen.getId() },
				{ label: 'Гродно', id: idGen.getId() },
				{ label: 'Могилев', id: idGen.getId() },
			];
		},
		visibleBlockSelector: '.filter__chooser_field',
		variantsBlockSelector: '.filter__chooser_variants',
		isOpenedByDefault: false,
		visiblePartRenderFn({ label, isOpened, labelTextDecorator }) {
			const decoratedLabel = labelTextDecorator(label);

			return `
			<div class="filter__chooser_field filter__variant mobile__chooser_field">
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

	Select.addSelect(...selectParamsAdapter(sortingChooser));
	Select.addSelect(...selectParamsAdapter(typeFilterChooser));
	Select.addSelect(...selectParamsAdapter(whatFilterChooser));
	Select.addSelect(...selectParamsAdapter(flatFilterChooser));
	Select.addSelect(...selectParamsAdapter(cityFilterChooser));
	Select.addSelect(...selectParamsAdapter(cotyMobileFilterSelect));

	Select.renderAllToDomOnInitialise();

	document.addEventListener('click', selectOutClick);
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

function selectParamsAdapter({
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

const amountToFlat = (value) => `${value} комн.`;