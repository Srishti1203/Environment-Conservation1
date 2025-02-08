document.getElementById('eco-score-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const energy = parseFloat(document.getElementById('energy').value);
    const water = parseFloat(document.getElementById('water').value);
    const waste = parseFloat(document.getElementById('waste').value);
    const transport = parseFloat(document.getElementById('transport').value);

    if (isNaN(energy) || isNaN(water) || isNaN(waste) || isNaN(transport)) {
        document.getElementById('eco-score-result').textContent = "Please enter valid numbers for all fields.";
        return;
    }

    const ecoScore = calculateEcoScore(energy, water, waste, transport);
    document.getElementById('eco-score-result').textContent = `Your Eco-Score is: ${ecoScore}`;
    document.getElementById('eco-tips').style.display = 'block';
});

function calculateEcoScore(energy, water, waste, transport) {
    // Simple formula to calculate Eco-Score
    const score = 100 - (energy * 0.1 + water * 0.05 + waste * 0.2 + transport * 0.1);
    return Math.max(0, Math.round(score));
}