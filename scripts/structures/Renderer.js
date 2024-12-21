// Класс отвечающий за монтирование html в DOM дерево
export class Renderer {
	static renderHtmlItem(containerSelector, renderHtmlFunction, data = null, cleanBeforeInset = false) {
		const container = document.querySelector(containerSelector);
		const html = renderHtmlFunction(data);

		if (cleanBeforeInset) Renderer.#cleanContainer(container);

		container.insertAdjacentHTML('beforeend', html);

		return container;
	}

	static renderHtmlItems(containerSelector, renderHtmlItemFunction, dataArray = [], cleanBeforeInset = false) {
		const container = document.querySelector(containerSelector);
		let html = '';

		dataArray.forEach((data, index) => {
			const htmlEl = renderHtmlItemFunction(data, index);
			html += htmlEl;
		});

		if (cleanBeforeInset) Renderer.#cleanContainer(container);

		container.insertAdjacentHTML('beforeend', html);

		return container;
	}

	static cleanContainerHtml(containerSelector) {
		const container = document.querySelector(containerSelector);
		return Renderer.#cleanContainer(container);
	}

	static #cleanContainer(container) {
		container.innerHTML = '';
		return container;
	}
}