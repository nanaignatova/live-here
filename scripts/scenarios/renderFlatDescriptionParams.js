import { Store } from '../structures/Store.js';
import { Renderer } from '../structures/Renderer.js';

// Сценарий монтирующий параметров объявления в виде списка на странице объявления
export function renderDescriptionParams() {
	const flatData = Store.getData((state) => state.flat);

	if (!flatData) return;

	Renderer.renderHtmlItems(
		'.flat__params_flat',
		renderParamItem,
		combineFlatParamsWithValues(flatData),
	);

	Renderer.renderHtmlItems(
		'.flat__params_building',
		renderParamItem,
		combineBuildingParamsWithValues(flatData.building),
	);
}

export function renderDescriptionBlock() {
	Renderer.renderHtmlItem(
		'.flat__description_text',
		() => Store.getData((state) => state.flat.description)
	);
}

const combineFlatParamsWithValues = ({
	rooms,
	area,
	bathroomType,
	repairType,
	beds,
	householdImprovement,
	rentalType,
	peopleSuggestions,
	prepayment,
	floor,
	building,
}) => [
	['Количество комнат', rooms],
	['Общая площадь', toM2(area.full)],
	['Жилая площадь', toM2(area.living)],
	['Площадь кухни', toM2(area.kitchen)],
	['Санузел', bathroomType],
	['Ремонт', repairType],
	['Количество спальных мест', beds],
	['Обустройство быта', householdImprovement.join(', ')],
	['Тип аренды', rentalType],
	['Кому сдается', peopleSuggestions.join(', ')],
	['Предоплата', prepayment],
	['Этаж', `${floor}/${building.floors}`],
];

const combineBuildingParamsWithValues = ({ wallMaterial, constructionYear, buildingImprovement }) => [
	['Материал стен', wallMaterial],
	['Год постройки', constructionYear],
	['Обустройство дома', buildingImprovement.join(', ')],
];

const renderParamItem = ([title, value]) => {
	return `
    <div class="flat__params_item">
      <div class="params__item_first">
        <span class="params__item_title">${title}</span>
        <span class="params__item_line"></span>
      </div>
      <span class="params__item_value">${value}</span>
    </div>
	`;
};

const toM2 = (value) => `${value} м<sup>2</sup>`;