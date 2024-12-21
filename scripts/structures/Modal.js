// Класс для связывания модели модального окна с его представлением в DOM дереве
export class Modal {
	#modalRoot;
	#closer;
	#content;
	#trigger;
	#isOpened = false;

	constructor(selector) {
		this.#modalRoot = document.querySelector(selector);
	}

	static bindModalWithItsDomView(selector, triggerSelector, addLogic) {
		const modal = new Modal(selector);

		modal.#getInteractiveElements(triggerSelector);
		modal.#addOverlayListener();
		modal.#addCloserListener();
		modal.#addTriggerListener();

		addLogic && addLogic(modal);

		return modal;
	}

	get Root() {
		return this.#modalRoot;
	}

	#getInteractiveElements(triggerSelector) {
		this.#getCloser();
		this.#getContent();
		this.#getTrigger(triggerSelector);
	}

	#addTriggerListener() {
		this.#trigger.addEventListener('click', () => {
			if (this.#isOpened) return;

			this.toggleModal();
		})
	}

	#addOverlayListener() {
		this.#modalRoot.addEventListener('click', (event) => {
			if (event.target.closest('.modal__content')) return;
			this.toggleModal();
		});
	}

	#addCloserListener() {
		this.#closer.addEventListener('click', () => {
			this.toggleModal();
		});
	}

	#getTrigger(triggerSelector) {
		this.#trigger = document.querySelector(triggerSelector);
	}

	toggleModal() {
		this.#isOpened = !this.#isOpened;
		this.#modalRoot.classList.toggle('opened');
		document.body.classList.toggle('modal-open');
	}

	#getCloser() {
		this.#closer = this.#modalRoot.querySelector('.modal__closer');
	}

	#getContent() {
		this.#content = this.#modalRoot.querySelector('.modal__content');
	}
}