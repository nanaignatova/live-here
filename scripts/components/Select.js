import { Renderer } from '../structures/Renderer.js';

/* Класс отвечающий за элементы, в которых можно сделать выбор и что-то изменить на странице */
export class Select {
	static selects = new Map();

	static get isAnyOpened() {
		return [...Select.selects.values()].some((chooser) => chooser.isOpened);
	}

	static addSelect(id, ...args) {
		Select.selects.set(id, new Select(id, ...args));
	}

	static renderAllToDomOnInitialise() {
		const ids = Select.selects.keys();

		let selectIterator = ids.next();

		while (!selectIterator.done) {
			const chooserEl = document.getElementById(selectIterator.value);
			const chooser = Select.selects.get(selectIterator.value);
			if (!chooserEl) continue;

			Select.renderSelect(chooser)

			selectIterator = ids.next();
		}
	}

	static renderSelectAfterUpdate(id) {
		const select = Select.selects.get(id);

		Renderer.cleanContainerHtml(`#${select.id}`);

		Select.renderSelect(select);
	}

	static renderSelect(select) {
		const container = Renderer.renderHtmlItem(
			`#${select.id}`,
			select.visiblePartRenderFn,
			{
				id: select.currentVariantId,
				label: select.variants.find((variant) => variant.id === select.currentVariantId).label,
				isOpened: select.isOpened,
				labelTextDecorator: select.labelTextDecorator,
			},
		);

		if (select.isOpened) {
			Renderer.renderHtmlItem(
				`#${select.id}`,
				select.variantsPartRenderFn,
				{
					currentVariantId: select.currentVariantId,
					variants: select.variants,
					isOpened: select.isOpened,
				}
			);
		}

		container.classList[select.isOpened ? 'add' : 'remove']('opened');

		Select.addListenersToSelect(
			select,
			{
				visibleBlockSelector: select.visibleBlockSelector,
				variantsBlockSelector: select.variantsBlockSelector,
			},
		);
	}

	static addListenersToSelect(select, { visibleBlockSelector, variantsBlockSelector }) {
		const selectField = document.querySelector(`#${select.id} ${visibleBlockSelector}`);
		const selectVariants = document.querySelector(`#${select.id} ${variantsBlockSelector}`);

		selectField && selectField.addEventListener('click', (event) => {
			event.stopPropagation();
			select.toggle();
			Select.renderSelectAfterUpdate(select.id);
		});

		selectVariants && selectVariants.addEventListener('click', (event) => {
			event.stopPropagation();
			const variantEl = event.target.closest('[data-variant]');

			if (!variantEl) return;

			const newVariant = variantEl.dataset.variant;

			if (!newVariant || newVariant === select.currentVariantId) return;

			select.changeVariant(newVariant);
			select.toggle();

			Select.renderSelectAfterUpdate(select.id);
		});
	}

	constructor(
		id,
		currentVariantId,
		variants,
		isOpened,
		visibleBlockSelector,
		variantsBlockSelector,
		visiblePartRenderFn,
		variantsPartRenderFn,
		labelTextDecorator = (value) => value,
	) {
		this.id = id;
		this.currentVariantId = currentVariantId;
		this.variants = variants;
		this.isOpened = isOpened;
		this.visiblePartRenderFn = visiblePartRenderFn;
		this.variantsPartRenderFn = variantsPartRenderFn;
		this.visibleBlockSelector = visibleBlockSelector;
		this.variantsBlockSelector = variantsBlockSelector;
		this.labelTextDecorator = labelTextDecorator;
	}

	get currentLabel() {
		return this.variants.find((variant) => variant.id === this.currentVariantId)?.label || null;
	}

	toggle() {
		this.isOpened = !this.isOpened;
	}

	close() {
		this.isOpened = false;
	}

	changeVariant(newVariantId) {
		this.currentVariantId = newVariantId;
	}
}
