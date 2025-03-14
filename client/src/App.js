import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Message from './components/Message';
import IndividualMessage from './messages/IndividualMessage';

function App() {

  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([{}]);

  const fetchMessages = async () => {
    const response = await fetch(`/api/messages`);
    const data = await response.json();
    setMessages(data);
  };

  const addMessage = async () => {
    let message = {
      text: document.getElementById('message-text').value,
      user: document.getElementById('user-name').value,
      image: document.getElementById('user-image').value,
    };
    await fetch(`/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    fetchMessages();
    document.getElementById('message-text').value = '';
    document.getElementById('user-name').value = '';
    document.getElementById('user-image').value = 'Onizuka';
  }

  // for now, the images are hardcoded because I dont wanna worry about uploading images to a file server
  const setAllImages = async () => {
    const images = [{
      name: "Onizuka",
      url: "onizuka.png"
    }, {
      name: "Dandy",
      url: "dandy.jpg"
    }, {
      name: "Lelouch",
      url: "lelouch.webp"
    }, {
      name: "Okabe",
      url: "okabe.webp"
    }, {
      name: "Shinji",
      url: "shinji.webp"
    }, {
      name: "Naota",
      url: "naota.jpg"
    }]
    setImages(images);
  }

  useEffect(() => {
    setAllImages();
    fetchMessages();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="container">
          <div className="top-bar">
            <label htmlFor="message-text">Message Text</label>
            <input id="message-text" type="text" placeholder="Message Text" required/>
            <label htmlFor="user-name">Your Name</label>
            <input id="user-name" type="text" placeholder="Your Name" required/>
            <label htmlFor="user-image">Your Image</label>
            <select id="user-image" name="user-image">
              {images.map((image) => (
                <option value={image.url}>{image.name}</option>
              ))}
            </select>
            <button className="add-message-button" onClick={addMessage}>Add your own message!</button>
          </div>
          <h1>Message Board</h1>
          {messages.map(message => (
            <Message
              key={message.id + message.user}
              id={message.id}
              user={message.user}
              text={message.text}
              image={message.image}
            />
          ))}
        </div>
      } />
      <Route path="/message/:id" element={<IndividualMessage />} />
    </Routes>
  );
}

export default App;
