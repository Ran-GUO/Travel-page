

const cityFootprints = [
	{
		"Date": "2020-07-07",
		"footprints": [
		{
			"spot": "Praça Dom Pedro IV",
			"lat_lon":[38.71389755946654, -9.13946077145831],
			"Transport": "Walk",
		},
		{
			"spot": "Casa Pastéis de Belém",
			"lat_lon":[38.697569085439405, -9.203238332107759],
			"Transport": "Bus",
		},
		{
			//(发现者纪念碑) 1940 年为纪念航海家亨利逝世 500 周年而建
			"spot": "Padrão dos Descobrimentos",
			"lat_lon":[38.69375317720742, -9.205690443988145],
			"Transport": "Walk",
		},
		{
			// 贝伦塔
			"spot": "Torre de Belém",
			"lat_lon":[38.69166741255739, -9.215998760944142],
			"Transport": "Walk",
		},
		],
		"photo": [
			{
				"time" : "13:34",
				"title": "Casa Pastéis de Belém",
				"source": "images/lisbon/casa-pasteis-de-belem.jpg",
				"description":"",
			},
			{
				"time" : "15:01",
				"title": "Padrão dos Descobrimentos",
				"source": "images/lisbon/padrao-dos-descobrimentos.jpg",
				"description":"",
			},
			{
				"time" : "15:38",
				"title": "Torre de Belém",
				"source": "images/lisbon/torre-de-belem.jpg",
				"description":"",
			},
			{
				"time" : "20:37",
				"title": "Dinner",
				"source": "images/lisbon/dinner.jpg",
				"description":"",
			},
		],
	},
	{
		"Date": "2020-07-08",
		"footprints": [
			{
				"spot": "Praça Dom Pedro IV",
				"lat_lon":[38.71389755946654, -9.13946077145831],
				"Transport": "Walk",
			},
			{
			"spot": "Praça do Comércio",
			"lat_lon":[38.707570327208, -9.136465503271166],
			"Transport": "Bus",
			},
		],
		"photo": [
			{
				"time" : "21:26",
				"title": "Praça do Comércio",
				"source": "images/lisbon/praca-do-comercio.jpg",
				"description":"",
			},
		],
	},	
	{
		"Date": "2020-07-09",
		"footprints": [
		{
			// 佩纳宫
			"spot": "lisbon train station (Rossio)",
			"lat_lon":[38.71402374991402, -9.138402207941887],
			"Transport": "Walk",
		},
		{
			"spot": "Palácio Nacional da Pena",
			"lat_lon":[38.78758735188021, -9.390607910818652],
			"Transport": "Train and Bus",
		},
		{
			// 雷加莱拉宫
			"spot": "Quinta da Regaleira",
			"lat_lon":[38.79632159073766, -9.396023359909652],
			"Transport": "Bus",
		},
		{
			// 罗卡角
			"spot": "Cabo da Roca",
			"lat_lon":[38.78042478394014, -9.49911173894468],
			"Transport": "Bus",
		},
		],
		"photo": [
			{
				"time" : "14:33",
				"title": "Palácio Nacional da Pena",
				"source": "images/lisbon/palacio-nacional-da-pena.jpg",
				"description":"",
			},
			{
				"time" : "15:53",
				"title": "Quinta da Regaleira",
				"source": "images/lisbon/quinta-da-regaleira.jpg",
				"description":"",
			},
			{
				"time" : "18:54",
				"title": "Cabo da Roca",
				"source": "images/lisbon/cabo-da-roca.jpg",
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
var lat_lon_1 = cityFootprints[2]["footprints"][0]["lat_lon"]; // lisbon train station (Rossio)
var lat_lon_2 = cityFootprints[0]["footprints"][3]["lat_lon"]; // Torre de Belém
var lat_lon_center = [(lat_lon_1[0] + lat_lon_2[0])/2.0, (lat_lon_1[1] + lat_lon_2[1])/2.0];


createMemoryYearFilter(cityFootprints);
printCityOnHtml('printCityByJS',"Lisbon (Lisboa)");
travelFootprints(lat_lon_center, mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);