//python3 -m http.server
//http://localhost:8000/

const key = 'ayoPJhNrPgf1eLBVDNY3';

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
    center: ol.proj.fromLonLat([0, 0]),
    zoom: 2
  })
});

//const layer = new ol.layer.Vector({
//
//});

const layer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([12.550343, 55.665957])),
      })
    ]
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      crossOrigin: 'anonymous',
      src: 'https://ran-guo.github.io/Travel-page/images/marker-icon.png',
    })
  })
});

map.addLayer(layer);

const style = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: '#e8530e',
    width: 2,
  }),
});

const flightsSource = new ol.source.Vector({
  loader: function () {
    var flightsData = [[[40.641766, -73.780968], [35.553333, 139.781113]], // JFK-HND
                       [[33.942496, -118.408048], [-20.889999, 55.516389]], // LAX-RUN
                       [[-34.822221, -58.535832], [38.967, 121.540]], // EZE-DLC
                       [[49.009722, 2.547778], [22.308889, 113.914722]], // CDG-HKG
                       [[-1.319241, 36.927775], [1.359211, 103.989333]]]; // NBO-SIN
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

map.addLayer(flightsLayer);

const pointsPerMs = 0.02 * 2;
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