// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Form submission
document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        const feedbackRef = database.ref('feedback').push();
        feedbackRef.set({
            name: name,
            email: email,
            message: message
        }).then(() => {
            document.getElementById('form-message').textContent = "Thank you for your feedback!";
            document.getElementById('feedback-form').reset();
        }).catch((error) => {
            document.getElementById('form-message').textContent = "Error: " + error.message;
        });
    } else {
        document.getElementById('form-message').textContent = "Please fill out all fields.";
    }
});