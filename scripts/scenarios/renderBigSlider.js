import { Store } from '../structures/Store.js';
import { Renderer } from '../structures/Renderer.js';

// Сценарий монтирования изображений слайдера на странице объявления
export function renderBigSlider() {
	const flatImages = Store.getData((state) => state.flat.images) || [];

	Renderer.renderHtmlItem(
		'.flat__images_main',
		renderMainImage,
		toImagePath(flatImages[0]),
	);

	Renderer.renderHtmlItems(
		'.flat__images_list',
		renderOtherImage,
		flatImages,
	);
}

const renderMainImage = (imageSrc) => {
	return `<img src="${imageSrc}" alt="img" data-current>`;
};

const renderOtherImage = (image, index) => {
	return `
    <div class="flat__images_image image__wrapper ${index === 0 ? 'active' : ''}" data-slide>
      <img src="${toImagePath(image)}" alt="img">
    </div>
	`;
};

const toImagePath = (name) => `images/${name}`;