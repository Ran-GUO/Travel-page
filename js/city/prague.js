

const cityFootprints = [
	{
		"Date": "2020-02-27",
		"footprints": [
		{
			// 布拉格城堡Matthias门
			"spot": "Matyášova brána <br>Matthias Gate",
			"lat_lon":[50.089989266904695, 14.39878467642027],
			"Transport": "Walk",
		},
		{
			//圣维特主教座堂
			"spot": "Katedrála sv. Víta <br>St. Vitus Cathedral",
			"lat_lon":[50.090949434128234, 14.400505927284128],
			"Transport": "Bus",
		},
		{
			// 黄金巷
			"spot": "Zlatá ulička u Daliborky <br>Golden Ln",
			"lat_lon":[50.09183819066711, 14.40379745867178],
			"Transport": "Walk",
		},
		{
			// 查理大桥
			"spot": "Karlův most <br>Charles Bridge",
			"lat_lon":[50.08660063464168, 14.411488063225557],
			"Transport": "Walk",
		},
		{
			// 老城广场
			"spot": "Staroměstské náměstí <br>Old Town Square",
			"lat_lon":[50.08762950871782, 14.421186317962386],
			"Transport": "Walk",
		}
		],
		"photo": [
			{
				"time" : "08:09",
				"title": "Katedrála sv. Víta (St. Vitus Cathedral)",
				"source": "images/prague/katedrala-sv-vita-3.jpg",
				"description":"St. Vitus Cathedral. <br>Located within Prague Castle. <br>Completed:1929.",
			},
			{
				"time" : "08:33",
				"title": "Katedrála sv. Víta (St. Vitus Cathedral)",
				"source": "images/prague/katedrala-sv-vita.jpg",
				"description":"St. Vitus Cathedral. <br>Located within Prague Castle. <br>Completed:1929.",
			},
			{
				"time" : "08:59",
				"title": "Matyášova brána (Matthias Gate)",
				"source": "images/prague/matyasova-brana.jpg",
				"description":"Changing of the Guard Ceremony at Matthias Gate. <br>Located in Prague Castle. <br>Erected:1614.",
			},
			{
				"time" : "09:07",
				"title": "Katedrála sv. Víta (St. Vitus Cathedral)",
				"source": "images/prague/katedrala-sv-vita-2.jpg",
				"description":"Stained glass windows.",
			},
			{
				"time" : "09:43",
				"title": "Zlatá ulička u Daliborky (Golden Ln)",
				"source": "images/prague/golden-ln.jpg",
				"description":"End of Golden Ln.",
			},
			{
				"time" : "11:38",
				"title": "Tram",
				"source": "images/prague/tram.jpg",
				"description":"",
			},
			{
				"time" : "11:54",
				"title": "Lunch Beer",
				"source": "images/prague/lunch-beer.jpg",
				"description":"Restaurant : Bredovský Dvůr <br>lat : 50.08261290863606 <br>lon : 14.429887956850052",
			},
			{
				"time" : "12:08",
				"title": "Lunch",
				"source": "images/prague/lunch.jpg",
				"description":"Restaurant : Bredovský Dvůr <br>lat : 50.08261290863606 <br>lon : 14.429887956850052",
			},

			
		],
	},
	{
		"Date": "2020-02-28",
		"footprints": [
		{
			// 莱特纳公园
			"spot": "Letenská pláň <br>Letna Park",
			"lat_lon":[50.09630210411797, 14.419441255216451],
			"Transport": "Walk",
		},
		{
			// 老城广场
			"spot": "Staroměstské náměstí <br>Old Town Square",
			"lat_lon":[50.08762950871782, 14.421186317962386],
			"Transport": "Walk",
		}
		],
		"photo": [
			{
				"time" : "11:55",
				"title": "Bridge sight",
				"source": "images/prague/bridge-sight.jpg",
				"description":"Captured at Letna Park",
			},
			{
				"time" : "12:41",
				"title": "Pražský orloj (Prague astronomical clock)",
				"source": "images/prague/prazsky-orloj.jpg",
				"description":"",
			},
			{
				"time" : "14:16",
				"title": "Trdelník (trdlo / trozkol)",
				"source": "images/prague/trdelnik.jpg",
				"description":"Bought at Old Town Square",
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
const mapZoomSize = screenWidth <= 768 ? 14 : 15;
var lat_lon_1 = cityFootprints[1]["footprints"][0]["lat_lon"]; // 莱特纳公园
var lat_lon_2 = cityFootprints[0]["footprints"][3]["lat_lon"]; // 查理大桥
var lat_lon_center = [(lat_lon_1[0] + lat_lon_2[0])/2.0, (lat_lon_1[1] + lat_lon_2[1])/2.0];


createMemoryYearFilter(cityFootprints);
printCityOnHtml('printCityByJS',"Prague (Praha)");
travelFootprints(lat_lon_center, mapZoomSize, cityFootprints, "../images/city-spot.png");
displayMemories("memories-cards", cityFootprints, 0, 0);
printTips("divTips", tips);