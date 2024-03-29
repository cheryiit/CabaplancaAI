function checkInput() {
    const userInput = document.getElementById('userInput').value;
    const sendButton = document.getElementById('sendButton');
    sendButton.disabled = !userInput.trim();
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    const aiType = document.getElementById('aiSelector').value;

    // Specify API endpoint by AI type
    const endpoint = `/api/message/${aiType}`;

    if (!userInput) {
        alert("The text area cannot be empty.");
        return;
    }

    fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Please, connect the API correctly.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('response').innerText = data.reply;
    })
    .catch(error => {
        document.getElementById('response').innerText = error.message;
    });
}

