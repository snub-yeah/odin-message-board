import { useState, useEffect } from 'react';
import './App.css';
//gaming
function App() {

  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`);
    const data = await response.json();
    setMessages(data);
  };

  const addMessage = async () => {
    let message = {
      text: document.getElementById('message-text').value,
      user: document.getElementById('user-name').value,
    };
    await fetch(`${process.env.REACT_APP_API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    fetchMessages();
    document.getElementById('message-text').value = '';
    document.getElementById('user-name').value = '';
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <label htmlFor="message-text">Message Text</label>
        <input id="message-text" type="text" placeholder="Message Text" required/>
        <label htmlFor="user-name">Your Name</label>
        <input id="user-name" type="text" placeholder="Your Name" required/>
        <button className="add-message-button" onClick={addMessage}>Add your own message!</button>
      </div>
      <h1>Message Board</h1>
      {messages.map(message => (
        <div key={message.id}>
          <h2>{message.user}</h2>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
