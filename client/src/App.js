import { useState, useEffect } from 'react';
import './App.css';
import Message from './components/Message';

function App() {

  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);

  const fetchMessages = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`);
    const data = await response.json();
    setMessages(data);
  };

  const addMessage = async () => {
    let message = {
      text: document.getElementById('message-text').value,
      user: document.getElementById('user-name').value,
      image: document.getElementById('user-image').value,
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
    document.getElementById('user-image').value = '';
  }

  useEffect(() => {
    // for now these are hardcoded
    setImages(["onizuka.png", "dandy.jpg", "lelouch.webp", "okabe.webp"])
    fetchMessages();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <label htmlFor="message-text">Message Text</label>
        <input id="message-text" type="text" placeholder="Message Text" required/>
        <label htmlFor="user-name">Your Name</label>
        <input id="user-name" type="text" placeholder="Your Name" required/>
        <label htmlFor="user-image">Your Image</label>
        <select id="user-image" name="user-image">
          {images.map((image) => (
            <option value={image}>{image}</option>
          ))}
        </select>
        <button className="add-message-button" onClick={addMessage}>Add your own message!</button>
      </div>
      <h1>Message Board</h1>
      {messages.map(message => (
        <Message
          key={message.id}
          id={message.id}
          user={message.user}
          text={message.text}
          image={message.image}
        />
      ))}
    </div>
  );
}

export default App;
