

const cityFootprints = [
	{
		"Date": "2020-07-17",
		"footprints": [
		{
			"spot": "Cactus Host <br>Hotel",
			"lat_lon":[28.141580614202176, -15.43296645397386],
			"Transport": "",
		},
		{
			"spot": "Dunas de Maspalomas",
			"lat_lon":[27.74240930102252, -15.574791059848241],
			"Transport": "Bus",
		},
		{
			"spot": "Playa de Maspalomas",
			"lat_lon":[27.735785215746038, -15.593777804660105],
			"Transport": "Walk",
		},
		],
		"photo": [
			{
				"time" : "15:09",
				"title": "Dunas de Maspalomas",
				"source": "images/gran-canaria/dunas-de-maspalomas.jpg",
				"description":"",
			},
		],
	},	
	{
		"Date": "2020-07-18",
		"footprints": [
		{
			"spot": "Cactus Host <br>Hotel",
			"lat_lon":[28.141580614202176, -15.43296645397386],
			"Transport": "",
		},
		{
			"spot": "Centro Comercial El Muelle",
			"lat_lon":[28.142002220779485, -15.427405066099043],
			"Transport": "Walk",
		},
		{
			"spot": "Playa de Las Canteras",
			"lat_lon":[28.142792949485955, -15.433755594677619],
			"Transport": "Walk",
		},
		],
		"photo": [
			{
				"time" : "14:10",
				"title": "City sight",
				"source": "images/gran-canaria/city-sight.jpg",
				"description":"",
			},
			{
				"time" : "14:17",
				"title": "Puerto de la Luz",
				"source": "images/gran-canaria/puerto-de-la-luz.jpg",
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


const screenWidth = window.innerWidth;
const mapZoomSize = screenWidth <= 768 ? 9 : 10;
var lat_lon_1 = cityFootprints[0]["footprints"][0]["lat_lon"];  // Cactus Host
var lat_lon_2 = cityFootprints[0]["footprints"][1]["lat_lon"];  // Puerto Rico de Gran Canaria
var lat_lon_center = [(lat_lon_1[0] + lat_lon_2[0])/2.0, (lat_lon_1[1] + lat_lon_2[1])/2.0];


createMemoryYearFilter(cityFootprints);
printCityOnHtml('printCityByJS',"Las Palmas (Gran Canaria)");
travelFootprints(lat_lon_center, mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);