import { Store } from './Store.js';

// Класс отвечающий за связку темы в хранилище с управляющими этой темой DOM элементами
export class ThemeSwitcher {
	#switcher;
	#actualTheme;

	constructor(selector) {
		this.#switcher = document.querySelector(selector);
		this.#actualTheme = Store.getData((state) => state.theme) || 'light';

		this.#subscribeToSwitcherClick();
		this.#changeHtmlDarkClass();
	}

	static bindSwitcherWithElement(selector) {
		return new ThemeSwitcher(selector);
	}

	#subscribeToSwitcherClick() {
		this.#switcher.addEventListener('click', () => {
			this.#actualTheme = this.#actualTheme === 'light' ? 'dark' : 'light';

			Store.addToState((state) => ({
				...state,
				theme: this.#actualTheme,
			}));

			this.#changeHtmlDarkClass();
		});
	}

	#changeHtmlDarkClass() {
		if (this.#actualTheme === 'light') {
			document.querySelector('html').classList.remove('dark__theme');
		} else {
			document.querySelector('html').classList.add('dark__theme');
		}
	}
}