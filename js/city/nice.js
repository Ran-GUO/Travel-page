

const cityFootprints = [
	{
		"Date": "2019-08-29",
		"footprints": [
		{
			"spot": "Nice Côte D'Azur airport (NCE)",
			"lat_lon":[43.664872629856674, 7.213360760250804],
			"Transport": "Flight",
		},
		],
	},	
];

const screenWidth = window.innerWidth;
const mapZoomSize = screenWidth <= 768 ? 12 : 13;
printCityOnHtml('printCityByJS',"Nice");
travelFootprints([43.688958953330285, 7.241849726990818], mapZoomSize, cityFootprints, "../images/city-spot.png");