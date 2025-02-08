let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const result = document.getElementById('result');

function showQuestion(index) {
    questions.forEach((question, i) => {
        question.classList.remove('active');
        if (i === index) {
            question.classList.add('active');
        }
    });
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let score = 0;
    const answers = ['31%', 'Wind', 'Rising Sea Temperatures', '20%', 'Beaver', 'To connect habitats', 'Brazil', 'Using reusable products', 'Sea Otter', 'Climate Change', '1%', 'Coastal protection', 'Carbon Dioxide', 'Agriculture', 'Oil', 'Pollination', 'Pacific Ocean', 'To combat climate change', 'Grass', 'Habitat Loss'];
    questions.forEach((question, index) => {
        const selected = question.querySelector('input[type="radio"]:checked');
        if (selected && selected.value === answers[index]) {
            score++;
        }
    });
    result.textContent = `You got ${score} out of ${questions.length} correct!`;
});

showQuestion(currentQuestion);