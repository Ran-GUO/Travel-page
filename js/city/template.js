

const cityFootprints = [
	{
		"Date": "2024-01-01",
		"footprints": [
		{
			"spot": "xxx",
			"lat_lon":[0.0, 0.0],
			"Transport": "",
		},
		{
			"spot": "XXX",
			"lat_lon":[0.01, 0.02],
			"Transport": "",
		},
		],
		"photo": [
			{
				"time" : "XX:XX",
				"title": "Title",
				"source": "images/common/commingSoon.png",
				"description":"",
			},
		],
	},		
];

const tips = [
	{
		"date": "unknown",
		"header": "upcoming",
		"main": "upcoming"
	},
];

createMemoryYearFilter(cityFootprints);
const screenWidth = window.innerWidth;
const mapZoomSize = screenWidth <= 768 ? 12 : 13;
printCityOnHtml('printCityByJS',"XXX");
travelFootprints([0.0, 0.0], mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);