"use client";


import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle chat visibility
  const [message, setMessage] = useState(''); // To store user's input message
  const [messages, setMessages] = useState([
    { sender: 'Bot', text: 'Hi there, how can I help you today?' }
  ]);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = async () => {
    if (!message.trim()) return; // Prevent empty messages

    try {
      // Display the user's message in the chat
      setMessages([...messages, { sender: 'You', text: message }]);

      const requestUrl = 'http://localhost:5000/chat'; // Backend URL
      const requestBody = { message };

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        mode: 'cors',
      });

      const responseData = await response.json();

      // Display the bot's response in the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'You', text: message },
        { sender: 'Bot', text: responseData.response }
      ]);

      setMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <button
        onClick={toggleChatBot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '18px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
      >
        Chat
      </button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '350px',
            maxHeight: '500px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'max-height 0.3s ease',
          }}
        >
          <header
            style={{
              backgroundColor: '#007bff',
              padding: '15px',
              borderBottom: '1px solid #ddd',
              borderRadius: '10px 10px 0 0',
              textAlign: 'center',
            }}
          >
            <h2 style={{ margin: '0', fontSize: '18px' }}>
              Welcome to Judicio, how may I assist you today?
            </h2>
          </header>
          <ul
            style={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              listStyle: 'none',
              margin: '0',
            }}
          >
            {messages.map((msg, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                  alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'You' ? 'white' : '#007bff',
                  color: msg.sender === 'You' ? 'black' : 'white',
                }}
              >
                <p style={{ margin: '0', fontSize: '16px' }}>{msg.text}</p>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderTop: '1px solid #ddd',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            }}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message..."
              spellCheck="false"
              required
              style={{
                flex: 1,
                border: 'none',
                padding: '10px',
                borderRadius: '5px',
                resize: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
              }}
            ></textarea>
            <span
              onClick={handleClick}
              style={{
                marginLeft: '10px',
                cursor: 'pointer',
                color: '#007bff',
                fontSize: '20px',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              SEND
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
