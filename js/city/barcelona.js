

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
	},		
];

const screenWidth = window.innerWidth;
const mapZoomSize = screenWidth <= 768 ? 12 : 13;
printCityOnHtml('printCityByJS',"Barcelona");
travelFootprints([41.38800220666444, 2.167651666002077], mapZoomSize, cityFootprints, "../images/city-spot.png");