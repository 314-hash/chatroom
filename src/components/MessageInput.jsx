// src/components/MessageInput.jsx
import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);
  const sendButtonRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
      // GSAP button feedback animation
      gsap.fromTo(sendButtonRef.current, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)'});
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Send the image as a Base64 string
        onSend('', event.target.result);
      };
      reader.readAsDataURL(file);
    }
    // Reset file input value to allow uploading the same file again
    e.target.value = null; 
  };

  return (
    <div className="message-input-area">
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <button type="button" onClick={handleUploadClick} className="upload-button">
          Photo
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
          placeholder="Type your message... use @ to mention"
        />
        <button ref={sendButtonRef} type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
