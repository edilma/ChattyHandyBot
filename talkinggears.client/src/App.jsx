import { useEffect, useState } from 'react';
import './App.css';
import './assets/css/chatbox.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = async () => {
        // If the message is empty, don't send it
        if (!newMessage.trim()) return;
        
        const message = {
            id: 7,
            user: 'user',
            text: newMessage
        };
        setMessages([...messages, message]);
        setNewMessage('');
        //Here we are calling the back end to send the message. Using fetch 
        try {
            const response = await fetch('https://localhost:7151/api/Chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
            // If the response is not ok, throw an error
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const responseData = await response.json();
            setMessages([...messages, { id: Date.now(), user: 'fridge', text: responseData.message }]);
            setMessages(''); // Clear the input
        }
catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Talk With Your Appliances</h1>
            <div className="chatBox">
    {messages.map((message) => (
        <div key={message.id} className={`message ${message.user === 'user' ? 'message-user' : 'message-fridge'}`}>
            {message.text}
        </div>
    ))}
</div>

            <input 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
                type="text" 
                placeholder="Type a message..." 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
