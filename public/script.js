let userId = null;

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            fetchBotResponse(message);
        }
    }

    function addMessage(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function fetchBotResponse(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message, userId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bot response');
            }

            const data = await response.json();
            addMessage(data.message, false);
            userId = data.userId;
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, an error occurred. Please try again.', false);
        }
    }

    const fetchHistoryButton = document.getElementById('fetchHistoryButton');
    fetchHistoryButton.addEventListener('click', fetchChatHistory);

    async function fetchChatHistory() {
        try {
            const response = await fetch('/api/history');
            if (!response.ok) {
                throw new Error('Failed to fetch chat history');
            }
            const history = await response.json();
            displayChatHistory(history);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    }

    function displayChatHistory(history) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = ''; // Clear existing messages

        history.forEach(entry => {
            addMessage(entry.message, entry.isUser);
        });
    }
});
