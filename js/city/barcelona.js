

const cityFootprints = [
	{
		"Date": "2019-10-29",
		"footprints": [
		{
			"spot": "La Casa Batlló",
			"lat_lon":[41.39187838178268, 2.164903229384712],
			"Transport": "",
		},
		{
			"spot": "Recinte Modernista de Sant Pau",
			"lat_lon":[41.41193246911304, 2.174360954515213],
			"Transport": "",
		},
		{
			"spot": "Park Güell",
			"lat_lon":[41.414695921453855, 2.152780327532446],
			"Transport": "",
		},
		],
		"photo": [
			{
				"time" : "08:59",
				"title": "Breakfast",
				"source": "images/barcelona/breakfast.jpg",
				"description":"",
			},
			{
				"time" : "09:43",
				"title": "La Casa Batlló",
				"source": "images/barcelona/la_casa_batllo.jpg",
				"description":"",
			},
			{
				"time" : "12:37",
				"title": "Sant Pau Recinte Modernista",
				"source": "images/barcelona/sant_pau_recinte_modernista.jpg",
				"description":"",
			},
			{
				"time" : "18:14",
				"title": "Park Güell",
				"source": "images/barcelona/park_guell.jpg",
				"description":"",
			},
		],
	},
	{
		"Date": "2019-10-30",
		"footprints": [
		{
			"spot": "La Casa Milà",
			"lat_lon":[41.39543277791744, 2.161913125678301],
			"Transport": "",
		},
		{
			"spot": "Poble Espanyol",
			"lat_lon":[41.368985607903895, 2.148208823823902],
			"Transport": "",
		},
		{
			"spot": "Castell de Montjuïc",
			"lat_lon":[41.363087809520955, 2.1650635968342113],
			"Transport": "",
		},
		],
		"photo": [
			{
				"time" : "10:19",
				"title": "La Casa Milà",
				"source": "images/barcelona/la_casa_mila.jpg",
				"description":"",
			},
			{
				"time" : "15:35",
				"title": "Poble Espanyol",
				"source": "images/barcelona/poble_espanyol.jpg",
				"description":"",
			},
			{
				"time" : "18:08",
				"title": "Castell de Montjuïc (Montjuïc Castle)",
				"source": "images/barcelona/montjuic_castle.jpg",
				"description":"",
			},
		],
	},	
	{
		"Date": "2019-10-31",
		"footprints": [
		{
			"spot": "Barcelona cathedrale",
			"lat_lon":[41.38413101685518, 2.176188368005439],
			"Transport": "",
		},
		{
			"spot": "Sagrada Família",
			"lat_lon":[41.383002164657015, 2.168806728097051],
			"Transport": "",
		},
		],
		"photo": [
			{
				"time" : "10:33",
				"title": "Barcelona cathedrale",
				"source": "images/barcelona/barcelona_cathedrale.jpg",
				"description":"",
			},
			{
				"time" : "14:27",
				"title": "Sagrada Família",
				"source": "images/barcelona/sagrada_familia.jpg",
				"description":"",
			},
			{
				"time" : "15:19",
				"title": "Sagrada Família",
				"source": "images/barcelona/sagrada_familia_2.jpg",
				"description":"",
			},
		],
	},	
	{
		"Date": "2019-11-01",
		"footprints": [
		{
			"spot": "Barcelona-Sants train station",
			"lat_lon":[41.38147564584334, 2.139870114898277],
			"Transport": "",
		},
		{
			"spot": "Montserrat Mountain Natural Park",
			"lat_lon":[41.61085367440367, 1.814178325687705],
			"Transport": "Train",
		},
		],
		"photo": [
			{
				"time" : "17:03",
				"title": "Montserrat Mountain Natural Park",
				"source": "images/barcelona/montserrat_mountain.jpg",
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
printCityOnHtml('printCityByJS',"Barcelona");
travelFootprints([41.38800220666444, 2.167651666002077], mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);