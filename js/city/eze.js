

const cityFootprints = [
	{
		"Date": "2019-11-09",
		"footprints": [
		{
			"spot": "Eze train station",
			"lat_lon":[43.72237606884739, 7.356936290435125],
			"Transport": "Train",
		},
		{
			"spot": "The exotic garden",
			"lat_lon":[43.72836467801438, 7.3612553678852795],
			"Transport": "Walk",
		},
		],
		"photo": [
			{
				"time" : "15:12",
				"title": "small town",
				"source": "images/eze/small-town.jpg",
				"description":"",
			},
			{
				"time" : "15:30",
				"title": "hilltop botanical gardens",
				"source": "images/eze/hilltop-botanical-gardens.jpg",
				"description":"",
			},
			{
				"time" : "15:53",
				"title": "statue",
				"source": "images/eze/statue.jpg",
				"description":"",
			},
			{
				"time" : "15:57",
				"title": "statue",
				"source": "images/eze/statue-2.jpg",
				"description":"",
			},
		],
	},
	{
		"Date": "2022-05-27",
		"footprints": [
		{
			"spot": "Eze train station",
			"lat_lon":[43.72237606884739, 7.356936290435125],
			"Transport": "Train",
		},
		{
			"spot": "The exotic garden ",
			"lat_lon":[43.72836467801438, 7.3612553678852795],
			"Transport": "Walk",
		},
		],
		"photo": [
		],
	},	
	{
		"Date": "2024-05-08",
		"footprints": [
		{
			"spot": "Eze train station",
			"lat_lon":[43.72237606884739, 7.356936290435125],
			"Transport": "Train",
		},
		{
			"spot": "The exotic garden ",
			"lat_lon":[43.72836467801438, 7.3612553678852795],
			"Transport": "Walk",
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

createMemoryYearFilter(cityFootprints);
const screenWidth = window.innerWidth;
const mapZoomSize = screenWidth <= 768 ? 12 : 15;
printCityOnHtml('printCityByJS',"Èze");
travelFootprints([43.72237606884739, 7.356936290435125], mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);