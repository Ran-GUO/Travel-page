// Javascript for cities pages
    
var TIMEOUT = 500;
let cityData = readCSVData('../js/data/travelcities.csv',',');
addCityPages("","<li><a class=\"dropdown-item\" href=\"../city.html\">CITIES MAP</a></li>");
fix_footer();

function searchMemoryFunction(){
	const sortDropdown = document.getElementById('memorySort');
	const sortBy = sortDropdown.value;
  const filterYearDropdown  = document.getElementById('yearFilter');
	const filterYearBy = filterYearDropdown.value;
  let sortType = 0;
  let yearFilter = 0;
	switch (sortBy) {
	  case 'random':
      sortType = 0;
      break;
	  case 'timeline':
      sortType = 1;
		  break;
	  case 'reverse timeline':
      sortType = 2;
		  break;
	  default:
		console.log('Invalid sorting option');
	}
  yearFilter = parseInt(filterYearBy);
  displayMemories("memories-cards", cityFootprints, sortType, yearFilter);
}



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



function displayMemories(idName, cityFootprints, sortType, yearFilter){
  let str = "";
  let memories = [];
  let count = 0;

  for(let i = 0; i < cityFootprints.length; i++){
    for(let j = 0; j < cityFootprints[i]["photo"].length; j++){
      if(yearFilter == 0 || getYearFromDate(cityFootprints[i]["Date"]) == yearFilter){
        memories.push(cityFootprints[i]["photo"][j]);
        memories[count]["Date"] = cityFootprints[i]["Date"]; 
        count ++;
      }
    }
  }

  let randomArray;
  if(sortType == 0){
    randomArray = generateRandomArray(memories.length);
  }

  for(let i = 0; i < memories.length; i++){
    let memory_data;
    if(sortType == 0){
      memory_data = memories[randomArray[i]];
    }
    else if(sortType == 1){
      memory_data = memories[i];
    }
    else if(sortType == 2){
      memory_data = memories[memories.length - 1 - i];
    }
    else{
      console.log("sort error");
    }

    str += "<div class=\"col-12 col-xs-12 col-sm-12 col-md-6 col-lg-4 card memory_container\"> ";
    str += "<img class=\"card-img-top memory_image_container\" src=" + memory_data["source"] + " alt=" +  memory_data["title"] + ">";
    str += "<div class=\"overlay\">";
    str += "<div class=\"overlay-text\">" + memory_data["description"] + "</div>";
    str += "</div>";
    str += "<div class=\"card-body\">";
    str += "<p class=\"card-text\">";
    str += memory_data["title"] + " <br>";
    str += memory_data["Date"] + " " + memory_data["time"] + " <br>";
    str += "</p>";
    str += "</div>";
    str += "</div>";   
  }

  setTimeout(() => {
    let element = document.getElementById(idName);
    element.innerHTML = str;
  }, TIMEOUT);

  //generate random array, length is n 
  function generateRandomArray(n) {
    // 创建一个包含 0 到 (n-1) 的初始数组
    const array = Array.from({ length: n }, (_, index) => index);
  
    // Fisher-Yates 洗牌算法
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 生成随机索引
      [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
  
    return array;
  }
}


function createMemoryYearFilter(data) {
  // 获取放置复选框的容器元素
  const container = document.getElementById('yearFilter');
  const option = document.createElement('option');
  option.value = 0; 
  option.textContent = "All"; 
  yearFilter.appendChild(option);

  // 创建选项并添加到下拉菜单中
  data.forEach(item => {
    let year = getYearFromDate(item.Date);
    const op = container.querySelector(`option[value="${year}"]`);
    if(op == null){
      const option = document.createElement('option');
      option.value = year; 
      option.textContent = year; 
      yearFilter.appendChild(option);
    }
  });
}

function printTips(idName, tips){
  let str="";
  for(let i = 0; i < tips.length; i++){
    str += "<div class=\"tips\">";
    str += "<p class=\"tipsHeader\">" + tips[i]["header"] + "</p>";
    str += "<p class=\"tipsMain\">" + tips[i]["main"] + "</p>";
    str += "<p class=\"tipsDate\">" + tips[i]["date"] + "</p>";
    str += "</div>";
  }

  setTimeout(() => {
    let element = document.getElementById(idName);
    element.innerHTML = str;
  }, TIMEOUT);
}
