document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    var map = L.map('wildlife-habitat-map').setView([0, 0], 2);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Custom animal icon for markers
    var animalIcon = L.icon({
        iconUrl: 'path/to/animal-icon.png',  // Replace with the path to your animal icon image
        iconSize: [32, 32],                  // Size of the icon
        popupAnchor: [0, -10]                // Where the popup will open relative to the icon
    });

    // Example marker for Amazon Rainforest
    var amazonMarker = L.marker([-3.4653, -62.2159], {icon: animalIcon}).addTo(map)
        .bindPopup("<b>Amazon Rainforest</b><br>Home to jaguars, harpy eagles, and pink dolphins.")
        .openPopup();

    // Wetlands habitat polygon
    var wetlands = L.polygon([
        [-3.4653, -62.2159], [-10.4653, -55.2159], [-7.4653, -45.2159]  // Example coordinates
    ], {
        color: "blue",
        fillOpacity: 0.2
    }).bindPopup("Wetlands Habitat").addTo(map);

    // Layer toggle for Forests and Deserts
    var forestLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');
    var desertLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');

    var baseMaps = {
        "Forests": forestLayer,
        "Deserts": desertLayer
    };

    L.control.layers(baseMaps).addTo(map);

    // GeoJSON data for deforestation visualization
    var deforestationData = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-5.4653, -62.2159], [-6.4653, -60.2159], [-7.4653, -59.2159], [-5.4653, -62.2159]
                ]]
            },
            "properties": {
                "name": "Deforestation Area"
            }
        }]
    };

    L.geoJSON(deforestationData, {
        style: function(feature) {
            return { color: "red", fillOpacity: 0.4 };
        }
    }).bindPopup("Deforestation Impact Zone").addTo(map);
});
