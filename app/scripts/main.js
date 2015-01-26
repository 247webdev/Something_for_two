var osm = new L.tileLayer('//{s}.tiles.maps.eox.at/wmts/1.0.0/osm_3857/default/g/{z}/{y}/{x}.jpg', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'OpenStreetMap { Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Rendering &copy; <a href="https://github.com/mapserver/basemaps">MapServer</a> and <a href="http://eox.at">EOX</a> }'
});

var map = L.map('map', {
    zoomControl: false,
    layers: [osm,]
});

var sf = [37.783333, -122.416667];
map.setView(sf, 14);

var pinIcon = L.icon({
    iconUrl: 'images/pin.png',
    shadowUrl: 'images/pin-shadow.png',

    iconSize:     [40, 37],
    shadowSize:   [40, 37],
    iconAnchor:   [13, 40],
    shadowAnchor: [13, 40],
    popupAnchor:  [0, -40]
});

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
};

var myLayer = L.geoJson([], {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: pinIcon});
    },
    onEachFeature: onEachFeature
}).addTo(map);

$.getJSON( "dummy.json", function(json) {
    myLayer.addData(json);
});

map.locate({setView: true, watch: true})
    .on('locationfound', function(e){
        var marker = L.marker([e.latitude, e.longitude]).bindPopup("I'm here :)");
        var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        });
        map.addLayer(marker);
        map.addLayer(circle);
    })
   .on('locationerror', function(e){
        console.log(e);
        alert("Location access denied.");
    });

/*
TODO
    show bubble
    show pins of selected category

*/
