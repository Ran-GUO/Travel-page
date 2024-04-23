//python3 -m http.server
//http://localhost:8000/

const key = 'ayoPJhNrPgf1eLBVDNY3';

//Setting
var MAP_CENTER = [52, 30];
const MAP_ZOOM = 2;

const FLIGHT_TRACE_COLOR = '#e8530e';
const FLIGHT_TRACE_WIDTH = 2;
const FLIGHT_TRACE_SPEED = 7;

const Flight_MARKER_ICON = "https://ran-guo.github.io/travel-page/images/airport-marker-icon.png";
const CITY_MARKER_ICON = "https://ran-guo.github.io/travel-page/images/city-marker-icon.png";

const MARKER_SCALE = 0.6;
const MARKER_OPACITY = 0.75;

var clicked_value = '';

// Begin Here=======================================

// Create map
const attribution = new ol.control.Attribution({
  collapsible: false,
});

const source = new ol.source.TileJSON({
  url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`,
  tileSize: 512,
  crossOrigin: 'anonymous'
});

const tileLayer = new ol.layer.Tile({
  source: source,
});

const map = new ol.Map({
  layers: [tileLayer],
  controls: ol.control.defaults.defaults({attribution: false}).extend([attribution]),
  target: 'map',
  view: new ol.View({
    constrainResolution: true,
    center: ol.proj.fromLonLat(MAP_CENTER),
    zoom: MAP_ZOOM
  }),
});

var flightsLayer;
var flightsIconLayer;
var cityIconLayer;

setTimeout(() => {
  // Create and add layers
  flightsLayer = createFlightLayer();
  map.addLayer(flightsLayer);

  flightsIconLayer = CreateFlightIconLayer();
  map.addLayer(flightsIconLayer);

  cityIconLayer = CreateCityIconLayer();
  map.addLayer(cityIconLayer);

}, 500);

//Functions ============================================
//Create flight layer
function createFlightLayer(){
  const style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: FLIGHT_TRACE_COLOR,
      width: FLIGHT_TRACE_WIDTH,
    }),
  });
  
  const flightsSource = new ol.source.Vector({
    loader: function () {
      for (let i = 0; i < flightsData.length; i++) {
        const flight = flightsData[i];
        // const from = flight[0][1];
        // const to = flight[1][1];
    
        // const arcGenerator = new arc.GreatCircle(
        //   {x: from[1], y: from[0]},
        //   {x: to[1], y: to[0]},
        // );
        if (clicked_value == '' || (flight["Iata_from"] == clicked_value || flight["Iata_to"] == clicked_value)) {
          const arcGenerator = new arc.GreatCircle(
            {x: flight["From_lon"], y: flight["From_lat"]},
            {x: flight["To_lon"], y: flight["To_lat"]},
          );
          const arcLine = arcGenerator.Arc(100, {offset: 10});
          const features = [];
          arcLine.geometries.forEach(function (geometry) {
            const line = new ol.geom.LineString(geometry.coords);
            line.transform('EPSG:4326', 'EPSG:3857');

            features.push(
              new ol.Feature({
                type: 'flight',
                geometry: line,
                finished: false,
              }),
            ); 
          });
          addLater(features, 1);
        }
      }
      tileLayer.on('postrender', animateFlights);
    },
  });

  const flightsLayer = new ol.layer.Vector({
    source: flightsSource,
    style: function (feature) {
      // if the animation is still active for a feature, do not
      // render the feature with the layer style
      if (feature.get('finished')) {
        return style;
      }
      return null;
    },
  });

  const pointsPerMs = 0.02 * FLIGHT_TRACE_SPEED;
  function animateFlights(event) {
    const vectorContext = ol.render.getVectorContext(event);
    const frameState = event.frameState;
    vectorContext.setStyle(style);

    const features = flightsSource.getFeatures();
    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      if (!feature.get('finished')) {
        // only draw the lines for which the animation has not finished yet
        const coords = feature.getGeometry().getCoordinates();
        const elapsedTime = frameState.time - feature.get('start');
        if (elapsedTime >= 0) {
          const elapsedPoints = elapsedTime * pointsPerMs;

          if (elapsedPoints >= coords.length) {
            feature.set('finished', true);
          }

          const maxIndex = Math.min(elapsedPoints, coords.length);
          const currentLine = new ol.geom.LineString(coords.slice(0, maxIndex));

          // animation is needed in the current and nearest adjacent wrapped world
          const worldWidth = ol.extent.getWidth(map.getView().getProjection().getExtent());
          const offset = Math.floor(map.getView().getCenter()[0] / worldWidth);

          // directly draw the lines with the vector context
          currentLine.translate(offset * worldWidth, 0);
          vectorContext.drawGeometry(currentLine);
          currentLine.translate(worldWidth, 0);
          vectorContext.drawGeometry(currentLine);
        }
      }
    }
    // tell OpenLayers to continue the animation
    map.render();
  }

  function addLater(features, timeout) {
    window.setTimeout(function () {
      let start = Date.now();
      features.forEach(function (feature) {
        feature.set('start', start);
        flightsSource.addFeature(feature);
        const duration =
          (feature.getGeometry().getCoordinates().length - 1) / pointsPerMs;
        start += duration;
      });
    }, timeout);
  }

return flightsLayer;
}


//Create flight marker layer
function CreateFlightIconLayer(){
  const container = new ol.layer.Vector({
    source: new ol.source.Vector(),
  });

  for (let i = 0; i < flightsData.length; i++) {
    var index = [["Iata_from","From_lat","From_lon"],["Iata_to","To_lat","To_lon"]];
    for (let j = 0; j < 2; j++) {
      const featureData=[flightsData[i][index[j][0]],[flightsData[i][index[j][1]],flightsData[i][index[j][2]]]];
      const pointFeature = CreatePointFeature(featureData, Flight_MARKER_ICON);
      if (pointFeature) container.getSource()?.addFeature(pointFeature);
    }
  }

  return container;
}

//Create city marker layer
function CreateCityIconLayer(){
  const container = new ol.layer.Vector({
    source: new ol.source.Vector(),
  });

  for (let i = 0; i < cityData.length; i++) {
    const pointFeature = CreatePointFeature(cityData[i], CITY_MARKER_ICON);
    if (pointFeature) container.getSource()?.addFeature(pointFeature);
  }

  return container;
}

//Setting marker feature
function CreatePointFeature(triplet, icon_src) {
  const feature = new ol.Feature({
    type: icon_src == CITY_MARKER_ICON ? 'city' : 'airport',
    geometry: new ol.geom.Point(ol.proj.fromLonLat([triplet[1][1], triplet[1][0]])),
    id: triplet[0],
  });

  const iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: icon_src,
      scale: MARKER_SCALE,
      opacity: MARKER_OPACITY,
      anchor: [0.5, 0.5],
    }),
  });
  feature.setStyle(iconStyle);

  return feature;
}

// Hop on
map.on('pointermove', function(e) {
  // if (e.dragging) {
  //     return;
  // }

  // var pixel = map.getEventPixel(e.originalEvent);
  // var hit = map.hasFeatureAtPixel(pixel);
  
  //map.getTarget().style.cursor = hit ? 'pointer' : '';

  // if (hit) displayPopup(e);
  displayPopup(e);
});

map.on('click', function(e) {
  clicked_value = displayPopup(e);
  let test = document.getElementById("random_id");
  test.innerHTML = "It is => " + clicked_value;
  map.removeLayer(flightsLayer);
  flightsLayer = createFlightLayer();
  map.addLayer(flightsLayer);
})

const popup = new ol.Overlay({
  element: document.getElementById('popup'),
});

map.addOverlay(popup);
const element = popup.getElement();

function displayPopup(e) {
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
    content: hit ? '<p>' + f.get('id') + '</p>' : '',
    html: true,
    placement: 'right',
    // title: 'Welcome to OpenLayers',
    title: hit ? f.get('type') : '',
    offset: [20, 20],
  });
  if (f && (f.get('type') == 'city' || f.get('type') == 'airport')) {
    popover.show();
  }
  else {
    popover.hide();
  }
  return hit ? f.get('id') : '';
}


function checkBoxFunction() {
  // Get the checkbox
  var checkBoxFlight = document.getElementById("checkBoxFlight");
  var checkBoxAirport = document.getElementById("checkBoxAirport");
  var checkBoxCity = document.getElementById("checkBoxCity");

  // If the checkbox is checked, display the output text
  if (checkBoxFlight.checked == true){
    flightsLayer.setVisible(true);
  } else {
    flightsLayer.setVisible(false);
  }

  if (checkBoxAirport.checked == true){
    flightsIconLayer.setVisible(true);
  } else {
    flightsIconLayer.setVisible(false);
  }

  if (checkBoxCity.checked == true){
    cityIconLayer.setVisible(true);
  } else {
    cityIconLayer.setVisible(false);
  }
}
