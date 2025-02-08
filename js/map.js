// map.js

// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Sample heatmap data (you can replace this with real-time data)
var heatData = [
    [51.505, -0.09, 0.5],
    [51.51, -0.1, 0.6],
    [51.51, -0.12, 0.4]
];

// Create a heat layer
L.heatLayer(heatData).addTo(map);

// Load real-time air quality data
setInterval(() => {
    fetch('https://your-api-endpoint/air-quality')
        .then(response => response.json())
        .then(data => {
            // Process and update your map with new data
            // Example: clear existing heatmap and add new data
            // L.heatLayer(newHeatData).addTo(map);
        })
        .catch(error => console.error('Error fetching data:', error));
}, 60000); // Update every minute