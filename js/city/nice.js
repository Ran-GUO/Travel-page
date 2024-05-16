

const cityFootprints = [
	{
		"Date": "2019-08-29",
		"footprints": [
		{
			"spot": "Nice Côte D'Azur airport (NCE)",
			"lat_lon":[43.664872629856674, 7.213360760250804],
			"Transport": "Flight",
		},
		{
			"spot": "International Centre De Valbonne (CIV)",
			"lat_lon":[43.62160817541559, 7.041470220362989],
			"Transport": "Car",
		},
		],
		"photo":[],
	},	
	{
		"Date": "2020-06-20",
		"footprints": [
		{
			"spot": "Nice-Ville Gare",
			"lat_lon":[43.70495764449359, 7.261722822507325],
			"Transport": "",
		},
		{
			"spot": "Ville Franche Sur Mer",
			"lat_lon":[43.706835, 7.315063],
			"Transport": "Train",
		},
		],
		"photo": [
			{
				"time" : "16:32",
				"title": "Ville Franche Sur Mer",
				"source": "images/nice/ville-franche-sur-mer.jpg",
				"description":"Beach!",
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
var lat_lon_1 = cityFootprints[0]["footprints"][0]["lat_lon"]; // Nice Côte D'Azur airport (NCE)
var lat_lon_2 = cityFootprints[1]["footprints"][1]["lat_lon"]; // Ville Franche Sur Mer
var lat_lon_center = [(lat_lon_1[0] + lat_lon_2[0])/2.0, (lat_lon_1[1] + lat_lon_2[1])/2.0];


createMemoryYearFilter(cityFootprints);
printCityOnHtml('printCityByJS',"Nice");
travelFootprints(lat_lon_center, mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);

