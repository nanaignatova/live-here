import { Slider, SliderCardView, SliderFlatView } from '../structures/Slider.js';
import { Renderer } from '../structures/Renderer.js';
import { Store } from '../structures/Store.js';

// Сценарий создания слайдера в карточке объявления
export function initialiseFlatMiniSlider(id, images) {
	const sliderView = new SliderCardView(`[data-slider="${id}"]`);
	const slider = new Slider(sliderView);
	slider.writeModelAndInitialiseSlider(images);

	slider.Controller.onChange((slideIndex) => {
		slider.View.moveImages(slideIndex);

		Renderer.renderHtmlItem(
			`[data-slider="${id}"] .card__content_counter`,
			() => `<span class="current__slide">${slideIndex + 1}</span><span>/</span><span>${slider.View.slidesAmount}</span>`,
			undefined,
			true,
		);
	});
}

// Сценарий создания слайдера на странице объявления
export function initialiseFlatBigSlider() {
	const flatImages = Store.getData((state) => state.flat.images);

	const flatSliderView = new SliderFlatView();
	const slider = new Slider(flatSliderView);

	slider.writeModelAndInitialiseSlider(flatImages);

	const images = slider.Model.images;

	slider.Controller.onChange((index) => {
		slider.View.checkSlidesAndInteract(index);
		slider.View.setCurrent(`images/${images[index]}`);
	});
}