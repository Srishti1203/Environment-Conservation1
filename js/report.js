document.addEventListener("DOMContentLoaded", function() {
    // Initialize Google Map
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        const input = document.getElementById("pac-input");
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.addListener("bounds_changed", function() {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener("places_changed", function() {
            const places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                new google.maps.Marker({
                    map,
                    title: place.name,
                    position: place.geometry.location,
                });
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }

    // Form Validation and Submission
    const reportForm = document.querySelector("#report-form form");
    reportForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const reportType = document.getElementById("report-type").value;
        const reportLocation = document.getElementById("report-location").value;
        const reportDescription = document.getElementById("report-description").value;
        if (reportType && reportLocation && reportDescription) {
            alert("Report submitted successfully!");
            reportForm.reset();
        } else {
            alert("Please fill in all required fields.");
        }
    });

    // Load Reports into History Section
    const reportList = document.getElementById("report-list");
    const reports = [
        { type: "Pollution", location: "Park Avenue", description: "Plastic waste in the park." },
        { type: "Wildlife", location: "River Side", description: "Spotted a rare bird." },
    ];
    reports.forEach(report => {
        const reportItem = document.createElement("div");
        reportItem.className = "report-item";
        reportItem.innerHTML = `
            <h3>${report.type}</h3>
            <p><strong>Location:</strong> ${report.location}</p>
            <p><strong>Description:</strong> ${report.description}</p>
        `;
        reportList.appendChild(reportItem);
    });

    // Initialize Real-time Data Charts
    const airQualityCtx = document.getElementById("air-quality-chart").getContext("2d");
    const waterQualityCtx = document.getElementById("water-quality-chart").getContext("2d");
    const temperatureCtx = document.getElementById("temperature-chart").getContext("2d");

    new Chart(airQualityCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Air Quality Index',
                data: [30, 50, 60, 70, 90, 100],
                borderColor: '#56ab2f',
                fill: false,
            }],
        },
        options: {
            responsive: true,
        },
    });

    new Chart(waterQualityCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Water Quality Index',
                data: [80, 70, 60, 90, 100, 110],
                borderColor: '#a8e063',
                fill: false,
            }],
        },
        options: {
            responsive: true,
        },
    });

    new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [22, 23, 24, 25, 26, 27],
                borderColor: '#ffa726',
                fill: false,
            }],
        },
        options: {
            responsive: true,
        },
    });

    // Initialize Heatmap
    const heatmapData = [
        { location: new google.maps.LatLng(37.782, -122.447), weight: 2 },
        { location: new google.maps.LatLng(37.782, -122.445), weight: 3 },
        // Add more data points here
    ];

    const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map
    });

    initMap();
});
