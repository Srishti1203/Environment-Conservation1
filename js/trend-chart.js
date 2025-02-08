// Fetch data from APIs or public sources
async function fetchData() {
    // Example APIs - replace with actual ones
    const deforestationApiUrl = 'https://api.example.com/deforestation';
    const airQualityApiUrl = 'https://api.example.com/air-quality';
    const waterQualityApiUrl = 'https://api.example.com/water-quality';

    const [deforestationData, airQualityData, waterQualityData] = await Promise.all([
        fetch(deforestationApiUrl).then(res => res.json()),
        fetch(airQualityApiUrl).then(res => res.json()),
        fetch(waterQualityApiUrl).then(res => res.json())
    ]);

    return { deforestationData, airQualityData, waterQualityData };
}

// Process and display data on a Chart.js graph
async function displayTrendChart() {
    const { deforestationData, airQualityData, waterQualityData } = await fetchData();

    const ctx = document.getElementById('trendChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: deforestationData.map(item => item.year), // Assuming all data have the same years
            datasets: [
                {
                    label: 'Deforestation (hectares)',
                    data: deforestationData.map(item => item.value),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y1'
                },
                {
                    label: 'Air Quality Index (AQI)',
                    data: airQualityData.map(item => item.aqi),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    yAxisID: 'y2'
                },
                {
                    label: 'Water Pollution (Contaminant Level)',
                    data: waterQualityData.map(item => item.contaminantLevel),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    yAxisID: 'y3'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Deforestation (hectares)'
                    }
                },
                y2: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Air Quality Index (AQI)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y3: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Water Pollution (Contaminant Level)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Call the function to display the chart

