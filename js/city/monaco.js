

const cityFootprints = [
	{
		"Date": "2019-09-11",
		"footprints": [
		{
			"spot": "Montecarlo train station",
			"lat_lon":[43.737976730465995, 7.419991664445814],
			"Transport": "Train",
		},
		{
			"spot": "Prince's Palace",
			"lat_lon":[43.73114831324096, 7.42022154517871],
			"Transport": "Walk",
		},
		{
			"spot": "Oceanographic Museum",
			"lat_lon":[43.73097681713515, 7.4255992549768681],
			"Transport": "Walk",
		},
		{
			"spot": "Monte-Carlo Casino",
			"lat_lon":[43.73911710728557, 7.4280967961928175],
			"Transport": "Bus",
		},
		],
		"photo": [
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
const mapZoomSize = screenWidth <= 768 ? 14 : 15;
var lat_lon_1 = cityFootprints[0]["footprints"][3]["lat_lon"]; // Prince's Palace
var lat_lon_2 = cityFootprints[0]["footprints"][1]["lat_lon"]; // Monte-Carlo Casino
var lat_lon_center = [(lat_lon_1[0] + lat_lon_2[0])/2.0, (lat_lon_1[1] + lat_lon_2[1])/2.0];


createMemoryYearFilter(cityFootprints);
printCityOnHtml('printCityByJS',"Monaco (Monte Carlo)");
travelFootprints(lat_lon_center, mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);