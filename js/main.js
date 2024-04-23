//python3 -m http.server
//http://localhost:8000/

const key = 'ayoPJhNrPgf1eLBVDNY3';

//Setting
var MAP_CENTER = [0, 0];
const MAP_ZOOM = 2;

const FLIGHT_TRACE_COLOR = '#e8530e';
const FLIGHT_TRACE_WIDTH = 2;
const FLIGHT_TRACE_SPEED = 2;

const MARKER_ICON = "https://ran-guo.github.io/travel-page/images/marker-icon.png";
const MARKER_SCALE = 0.5;
const MARKER_OPACITY = 0.75;

//Data
var MarkerData = [
  [36.6749, -4.49911],  //AGP
  [43.3521, 77.0405],   //ALA
  [31.7226, 35.9932]];  //AMM

var flightsData = [[[40.641766, -73.780968], [35.553333, 139.781113]], // JFK-HND
                  [[33.942496, -118.408048], [-20.889999, 55.516389]], // LAX-RUN
                  [[-34.822221, -58.535832], [38.967, 121.540]], // EZE-DLC
                  [[49.009722, 2.547778], [22.308889, 113.914722]], // CDG-HKG
                  [[-1.319241, 36.927775], [1.359211, 103.989333]]]; // NBO-SIN


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
  })
});

// Create and add layers
const flightsLayer = createFlightLayer();
map.addLayer(flightsLayer);

const markerLayer = CreateMarkerLayer()
map.addLayer(markerLayer);




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
        const from = flight[0];
        const to = flight[1];
    
        const arcGenerator = new arc.GreatCircle(
          {x: from[1], y: from[0]},
          {x: to[1], y: to[0]},
        );
        const arcLine = arcGenerator.Arc(100, {offset: 10});
        const features = [];
        arcLine.geometries.forEach(function (geometry) {
          const line = new ol.geom.LineString(geometry.coords);
          line.transform('EPSG:4326', 'EPSG:3857');

          features.push(
            new ol.Feature({
              geometry: line,
              finished: false,
            }),
          ); 
        });
        addLater(features, i * 50);
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



//Create marker layer
function CreateMarkerLayer(){
  const container = new ol.layer.Vector({
    source: new ol.source.Vector(),
  });

  for (let i = 0; i < flightsData.length; i++) {
    for (let j = 0; j < 2; j++) {
      const pointFeature = CreatePointFeature(flightsData[i][j][1],flightsData[i][j][0]);
      if (pointFeature) container.getSource()?.addFeature(pointFeature);
    }
  }

  for (let i = 0; i < MarkerData.length; i++) {
    const pointFeature = CreatePointFeature(MarkerData[i][1],MarkerData[i][0]);
    if (pointFeature) container.getSource()?.addFeature(pointFeature);
  }


  function CreatePointFeature(x, y) {

    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([x , y])),
    });

    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: MARKER_ICON,
        scale: MARKER_SCALE,
        opacity: MARKER_OPACITY,
        anchor: [0.5, 1],
      }),
    });
    feature.setStyle(iconStyle);

    return feature;
  }

  return container;
}



//const layer = new ol.layer.Vector({
//
//});


// const layer = new ol.layer.Vector({
//   source: new ol.source.Vector({
//     features: [
//       new ol.Feature({
//         geometry: new ol.geom.Point(ol.proj.fromLonLat([12.550343, 55.665957])),
//       })
//     ]
//   }),
//   style: new ol.style.Style({
//     image: new ol.style.Icon({
//       anchor: [0.5, 1],
//       crossOrigin: 'anonymous',
//       src: 'https://ran-guo.github.io/travel-page/images/marker-icon.png',
//     })
//   })
// });
// map.addLayer(layer);
