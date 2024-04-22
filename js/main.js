const key = 'ayoPJhNrPgf1eLBVDNY3';

const attribution = new ol.control.Attribution({
  collapsible: false,
});

const source = new ol.source.TileJSON({
  url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`,
  tileSize: 512,
  crossOrigin: 'anonymous'
});

const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: source
    })
  ],
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
