var terrain = new L.tileLayer('//{s}.tiles.maps.eox.at/wmts/1.0.0/terrain-light_3857/default/g/{z}/{y}/{x}.jpg', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
});
var overlay = new L.tileLayer('//{s}.tiles.maps.eox.at/wmts/1.0.0/overlay_3857/default/g/{z}/{y}/{x}.jpg', {
    minZoom: 0,
    maxZoom: 18,
    attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
});

var map = L.map('map', {
    layers: [terrain]
});

var baseMaps = {
    "Terrain": terrain
};
var overlayMaps = {
    "Overlay": overlay
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

map.fitWorld()
