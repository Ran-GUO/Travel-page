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
      minZoom: 5,
      maxZoom: 20,
		}),
	});
	
  var lineLayer = new Array(cityFootprints.length);
  var spotLayer = new Array(cityFootprints.length);
  createLineLayer(cityFootprints);
  CreateSpotLayer(cityFootprints);
  const popup = new ol.Overlay({
    element: document.getElementById('popup'),
  });
  const element = popup.getElement();
  map.addOverlay(popup);

  map.on('pointermove', function(e) {
    displayPopupSpot(e);
  });
  createCheckboxesForDates(cityFootprints);

	//create spot vectors
  function CreateSpotVectors(data){
    const container = new ol.layer.Vector({
			source: new ol.source.Vector(),
		});
    for (let j = 0; j < data["footprints"].length; j++) {
      const feature = new ol.Feature({
        type:  'spot',
        geometry: new ol.geom.Point(ol.proj.fromLonLat([data["footprints"][j]["lat_lon"][1], data["footprints"][j]["lat_lon"][0]])),
        id: data["Date"] + '<br>' + data["footprints"][j]["spot"],
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
    return container;
  }

  //create spot layer, display all spots using icons
  function CreateSpotLayer(cityFootprints){
    for (let i = 0; i < cityFootprints.length; i++) {
      spotLayer[i] = CreateSpotVectors(cityFootprints[i]);
      map.addLayer(spotLayer[i]);
    }
  }


  //display popup window for both spots and spot lines 
  function displayPopupSpot(e) {
    const coordinate = e.coordinate;
    const hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
    popup.setPosition(coordinate);
    let popover = bootstrap.Popover.getInstance(element);
    if (popover) {
      popover.dispose();
    }
    var f = map.forEachFeatureAtPixel(e.pixel, function(f){return f;});
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    popover = new bootstrap.Popover(element, {
      animation: false,
      container: element,
      // content: '<p>The location you clicked was: ' + hdms + '</p>',
      content: hit ? ((f.get('type') == 'spot' || f.get('type') == 'spotline')? f.get('id') : '' ) : '',
      html: true,
      placement: 'right',
      // title: 'Welcome to OpenLayers',
      offset: [20, 20],
    });
    if (f && ((f.get('type') == 'spot' || f.get('type') == 'spotline'))) {
      popover.show();
    }
    else {
      popover.hide();
    }
    return hit ? f.get('id') : '';
  }

  // creates line vector layers and return, not added on map
  function createLineVectors(data) {
    // 提取位置信息
    const locations = data.footprints.map(item => item.lat_lon);
    console.log(locations);
    // 创建线段要素数组
    const lineFeatures = [];
    for (let i = 0; i < locations.length - 1; i++) {
      const startPoint = ol.proj.fromLonLat([locations[i][1],locations[i][0]] );
      const endPoint = ol.proj.fromLonLat([locations[i + 1][1],locations[i + 1][0]]);
      const line = new ol.geom.LineString([startPoint, endPoint]);
      const lineFeature = new ol.Feature({
        type:  'spotline',
        geometry: line,
        id: data["Date"] + '<br>' + data["footprints"][i+1]["Transport"],
        });

      lineFeatures.push(lineFeature);
    }
  
    // 创建矢量图层
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: lineFeatures // 将线段要素数组添加到图层中
      }),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'blue',
          width: 2
        })
      })
    });
  
    return vectorLayer;
  }
  
  // add line layers on map
  function createLineLayer(cityFootprints){
    for (let i = 0; i < cityFootprints.length; i++) {
      lineLayer[i] = createLineVectors(cityFootprints[i]);
      map.addLayer(lineLayer[i]);
    }
  }

  // Create checkbox for each date
  function createCheckboxesForDates(data) {
    // 获取放置复选框的容器元素
    const container = document.getElementById('checkboxContainer');
  
    // 遍历数组，为每个日期创建复选框
    data.forEach(item => {
      // 创建复选框元素
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = item.Date;
      checkbox.checked = true; 
  
      // 创建标签元素
      const label = document.createElement('label');
      label.textContent = item.Date;
  
      // 创建换行元素
      const br = document.createElement('br');
  
      // 添加点击事件监听器，点击时运行另一个函数
      checkbox.addEventListener('click', function() {
        // 在这里调用你想要运行的函数
        // 示例：runAnotherFunction(item.Date);
        checkBoxFunction(data, checkbox,item.Date)

      });
  
      // 将复选框、标签和换行元素添加到容器中
      container.appendChild(checkbox);
      container.appendChild(label);
      container.appendChild(br);
    });


    function checkBoxFunction(data,checkbox,date){
      let i = 0;
      for(i = 0 ; i < data.length ; i++){
        if(data[i]["Date"] == date) break;
      }

      if (checkbox.checked == true){
        lineLayer[i].setVisible(true);
        spotLayer[i].setVisible(true);
      } else {
        lineLayer[i].setVisible(false);
        spotLayer[i].setVisible(false);
      }
    }
  }

}
