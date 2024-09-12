// Your OpenAI API key
const OPENAI_API_KEY = 'your-api-key-here';

// Function to send a message
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
    
    if (message === "") return;

    // Create user message element
    appendMessageToChat('user', message);

    // Clear the input field
    inputField.value = "";

    // OpenAI API request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "your-finetuned-model-id",  // Replace with your fine-tuned model ID
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();

    // Get AI's reply and add it to the chat
    const aiMessage = data.choices[0].message.content;
    appendMessageToChat('ai', aiMessage);
}

// Function to append messages to the chat box
function appendMessageToChat(role, message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', role === 'user' ? 'user' : 'ai');
    messageElement.innerText = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
