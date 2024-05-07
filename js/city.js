// Javascript for cities pages
    
var TIMEOUT = 500;
let cityData = readCSVData('../js/data/travelcities.csv',',');
addCityPages("","<li><a class=\"dropdown-item\" href=\"../city.html\">CITIES MAP</a></li>");
fix_footer();


// fixed footer
function fix_footer() {
  var siteFooter = document.getElementById('site-footer');
  if ((siteFooter.offsetTop + siteFooter.offsetHeight) < window.innerHeight) {
      siteFooter.classList.add('fixed-bottom', 'bottom-0', 'left-0', 'w-full');
  }
}

function printCityToString(city) {
    let str = "";

    var arrivalTime = city["FREQ"];
    var index = [["1st arrival", "1st arrival transport"],["2nd arrival", "2nd arrival transport"], 
                  ["3rd arrival", "3rd arrival transport"],["4th arrival", "4th arrival transport"]];
    for(let j = 0; j < arrivalTime; j++) {
      str = str + "["+ city[index[j][0]] + "] Arrived by  " + getTransportName(city[index[j][1]]) + ".<br>";
    }
    return str;

    function getTransportName(name) {
      let str="";
      if (name == "F") {
        str = "flight";
        let element = document.getElementById("transport_flight");
        element.style.display = "block";
      }
      else if(name == "B") {
        str = "bus";
        let element = document.getElementById("transport_bus");
        element.style.display = "block";
      }
      else if(name == "T") {
        str = "train";
        let element = document.getElementById("transport_train");
        element.style.display = "block";
      }
      else if(name == "A") {
        str = "airport";
      }
      else if(name == "W") {
        str = "walking";
      }
      else {
        str = "others";
      }
      return str;
    }
}

function printCityOnHtml(idName,cityName){
  setTimeout(() => {
    let element = document.getElementById(idName);
    element.innerHTML = printCityToString(getCityData(cityName));
  }, TIMEOUT);
}


function travelFootprints(city, var_zoom, cityFootprints, spot_icon){
	const map = new ol.Map({
		target: 'map',
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM(),
			}),
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([city[1],city[0]]),
			zoom: var_zoom,
		}),
	});
	
	traceLayer = CreateTraceLayer(cityFootprints);
	map.addLayer(traceLayer);
	
	function CreateTraceLayer(cityFootprints){
		const container = new ol.layer.Vector({
			source: new ol.source.Vector(),
		});
		for (let i = 0; i < cityFootprints.length; i++) {
			for (let j = 0; j < cityFootprints[i]["foodPrints"].length; j++) {
				const feature = new ol.Feature({
					type:  'spot',
					geometry: new ol.geom.Point(ol.proj.fromLonLat([cityFootprints[i]["foodPrints"][j]["lat_lon"][1], cityFootprints[i]["foodPrints"][j]["lat_lon"][0]])),
					id: cityFootprints[i]["foodPrints"][j]["spot"],
				  });
				
				const iconStyle = new ol.style.Style({
					image: new ol.style.Icon({
					  src: spot_icon,
					  scale: 0.6,
					  opacity: 1,
					  anchor: [0.5, 0.5],
					}),
				});
				feature.setStyle(iconStyle);
				if (feature) container.getSource()?.addFeature(feature);
			}
		}
		return container;
	}

}
