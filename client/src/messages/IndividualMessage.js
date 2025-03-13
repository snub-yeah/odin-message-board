import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './IndividualMessage.module.css';

const IndividualMessage = () => {
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchMessage = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/messages/${id}`);
      if (response.status == 404) {
        navigate('/');
      }
      const data = await response.json();
      setMessage(data);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  if (!message) {
    return <div>Waiting for message...</div>;
  }

  return (
    <div className="container">
        <div className={styles.message}>
            <p><b>{message.user}</b> says:</p>
            <h1>{message.text}</h1>
            <img src={`/images/${message.image}`} alt={message.user} onClick={() => window.location.href = `/images/${message.image}`}/>
            <div className={styles.buttonContainer}>
                <button className="add-message-button" onClick={() => navigate('/')}>Back to the message board</button>
            </div>
        </div>
    </div>
  );
};

export default IndividualMessage;
