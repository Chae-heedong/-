// OpenAI API 키 설정
const OPENAI_API_KEY = 'sk-여기에 키 입력'; // 여기에 OpenAI API 키 입력

// 메시지 전송 함수
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const message = inputField.value.trim();
    if (message === "") return;
    appendMessageToChat('user', message);
    inputField.value = "";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;
    appendMessageToChat('ai', aiMessage);
}

// 음성 인식 버튼을 누르면 음성 입력 시작
async function startVoiceRecognition() {
    const response = await fetch('/start_voice_recognition'); // 서버의 음성 인식 기능 호출
    const text = await response.text(); // 서버에서 변환된 텍스트를 받음
    document.getElementById('userInput').value = text; // 변환된 텍스트를 입력 필드에 표시
}

// 채팅 창에 메시지를 추가하는 함수
function appendMessageToChat(role, message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(role === 'user' ? 'user' : 'ai');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
