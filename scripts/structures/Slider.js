// Функция убирающая дефолтное поведение события
function prevent(event) {
	event.preventDefault();
	event.stopPropagation();
}

// Класс создающий модель слайдера
class SliderModel {
	images = [];

	setImages(images) {
		this.images = images;
	}
}

// Класс создающий контроллер слайдера
class SliderController {
	currentImageIndex = 0;
	#callbacks = [];
	#imagesLen = 0;

	setImagesLen(len) {
		this.#imagesLen = len;
	}

	next = () => {
		if (this.#imagesLen === this.currentImageIndex + 1) {
			this.currentImageIndex = 0;
		} else {
			this.currentImageIndex++;
		}

		this.#doOnChange();
	}

	prev = () => {
		if (this.currentImageIndex - 1 < 0) {
			this.currentImageIndex = this.#imagesLen - 1;
		} else {
			this.currentImageIndex--;
		}

		this.#doOnChange();
	}

	go = (slideIndex = 0) =>  {
		if (this.currentImageIndex === slideIndex) return;

		this.currentImageIndex = slideIndex;

		this.#doOnChange();
	}

	onChange(callback) {
		this.#callbacks.push(callback);
	}

	#doOnChange() {
		this.#callbacks.forEach((callback) => callback(this.currentImageIndex));
	}
}

// Класс представления слайдера в объявлении
export class SliderCardView {
	#controls = {};
	#slides = [];
	#slidesRoot;
	#root;

	constructor(selector) {
		this.#root = document.querySelector(selector);
	}

	get slidesAmount() {
		return this.#slides.length;
	}

	getInteractiveElements() {
		this.#getControls();
		this.#getSlides();
		this.#getSlidesRoot();
	}

	bindControls(backCallback, nextCallback) {
		this.#controls['back'] && this.#controls['back'].addEventListener('click', (event) => {
			prevent(event);
			backCallback(event);
		});

		this.#controls['next'] && this.#controls['next'].addEventListener('click', (event) => {
			prevent(event);
			nextCallback(event);
		});
	}

	bindSlides(slideCallback) {
		this.#slides.forEach((slide, index) => {
			slide.addEventListener('click', (event) => {
				prevent(event);
				slideCallback(index);
			});
		});
	}

	moveImages(index) {
		const imagesEl = this.#root.querySelector('.images__item');
		const width = imagesEl.getBoundingClientRect().width;
		this.#slidesRoot.style.transform = `translateX(${index * -1 * width}px)`;
	}

	#getControls() {
		const btns = [...this.#root.querySelectorAll('[data-go]')];

		btns.forEach((btn) => {
			this.#controls[btn.dataset.go] = btn;
		});
	}

	#getSlides() {
		this.#slides = [...this.#root.querySelectorAll('[data-slide]')];
	}

	#getSlidesRoot() {
		this.#slidesRoot = this.#root.querySelector('[data-slides-root]');
	}
}

// Класс представления слайдера на странице самого объявления
export class SliderFlatView {
	#controls = {};
	#slides = [];
	#current;
	#root;

	constructor() {
		this.#root = document.querySelector('[data-slider="flat"]');
	}

	get slidesAmount() {
		return this.#slides.length;
	}

	getInteractiveElements() {
		this.#getControls();
		this.#getSlides();
		this.#getCurrent();
	}

	setCurrent(src) {
		const parentEl = this.#current.parentElement;
		const imgEl = document.createElement('img');
		imgEl.src = src;
		imgEl.className = this.#current.className;
		imgEl.alt = this.#current.alt;
		imgEl.animationName = '';
		imgEl.setAttribute('data-current', '');

		const animationName = this.#current.animationName;

		this.#current.addEventListener('transitionend', () => {
			imgEl.style.animationName = animationName;

			[...parentEl.children].forEach((el) => {
				if (el !== this.#current) el.remove();
			});
		});

		this.#current.classList.add('removing');
		this.#current.removeAttribute('data-current');
		parentEl.append(imgEl);
		this.#getCurrent();
	}

	checkSlidesAndInteract(index) {
		this.#slides.forEach((slide, slideIndex) => {
			slide.classList.remove('active');

			if (slideIndex === index) slide.classList.add('active');
		});
	}

	bindControls(backCallback, nextCallback) {
		this.#controls['back'] && this.#controls['back'].addEventListener('click', (event) => {
			prevent(event);
			backCallback(event);
		});

		this.#controls['next'] && this.#controls['next'].addEventListener('click', (event) => {
			prevent(event);
			nextCallback(event);
		});
	}

	bindSlides(slideCallback) {
		this.#slides.forEach((slide, index) => {
			slide.addEventListener('click', (event) => {
				prevent(event);
				slideCallback(index);
			});
		});
	}

	#getControls() {
		const btns = [...this.#root.querySelectorAll('[data-go]')];

		btns.forEach((btn) => {
			this.#controls[btn.dataset.go] = btn;
		});
	}

	#getSlides() {
		this.#slides = [...this.#root.querySelectorAll('[data-slide]')];
	}

	#getCurrent() {
		this.#current = this.#root.querySelector('[data-current]');
	}
}

// Класс слайдера как полноценного модуля с представлением, моделью и контроллером
export class Slider {
	#model = new SliderModel();
	#controller = new SliderController();
	#view;

	constructor(view) {
		this.#view = view;
	}

	get View() { return this.#view; }
	get Controller() { return this.#controller; }
	get Model() { return this.#model; }

	writeModelAndInitialiseSlider(images = []) {
		this.View.getInteractiveElements();

		this.View.bindControls(this.Controller.prev, this.Controller.next);
		this.View.bindSlides(this.Controller.go);

		this.Model.setImages(images);
		this.Controller.setImagesLen(this.View.slidesAmount);
	}
}