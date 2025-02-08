// Function to fetch water quality data from the EPA Water Quality Portal
async function fetchWaterQualityData() {
    const apiUrl = 'https://www.waterqualitydata.us/data/Result/search?countrycode=US&siteid=USGS-01594440&startDateLo=01-01-2020&mimeType=csv';
    try {
        const response = await fetch(apiUrl);
        const data = await response.text();

        // Process CSV data
        const processedData = processCSVData(data);
        displayWaterQualityChart(processedData);
    } catch (error) {
        console.error('Error fetching water quality data:', error);
    }
}

// Function to process CSV data
function processCSVData(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        headers.forEach((header, j) => {
            obj[header.trim()] = currentLine[j].trim();
        });

        result.push(obj);
    }

    return result;
}

// Function to display water quality data in a Chart.js chart
function displayWaterQualityChart(data) {
    const ctx = document.getElementById('waterQualityChart').getContext('2d');
    const labels = data.map(item => item['ActivityStartDate']);
    const ph = data.map(item => parseFloat(item['pH']));
    const contamination = data.map(item => parseFloat(item['Contaminant Level']));
    const turbidity = data.map(item => parseFloat(item['Turbidity']));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'pH Level',
                    data: ph,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Contamination Level',
                    data: contamination,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Turbidity',
                    data: turbidity,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}

// Call the function to fetch and display water quality data
fetchWaterQualityData();
