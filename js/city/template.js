

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

const screenWidth = window.innerWidth;
const mapZoomSize = screenWidth <= 768 ? 12 : 13;
var lat_lon_1 = cityFootprints[0]["footprints"][0]["lat_lon"]; 
var lat_lon_2 = cityFootprints[0]["footprints"][1]["lat_lon"]; 
var lat_lon_center = [(lat_lon_1[0] + lat_lon_2[0])/2.0, (lat_lon_1[1] + lat_lon_2[1])/2.0];


createMemoryYearFilter(cityFootprints);
printCityOnHtml('printCityByJS',"XXX");
travelFootprints(lat_lon_center, mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);