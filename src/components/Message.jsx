// src/components/Message.jsx
import React from 'react';
import { format } from 'date-fns';

const Message = ({ message, isCurrentUser }) => {
  const { who, text, when, img } = message;

  // Function to parse text and wrap @mentions
  const renderTextWithMentions = (txt) => {
    const parts = txt.split(/(@\w+)/g);
    return parts.map((part, i) =>
      part.startsWith('@') ? (
        <span key={i} className="mention">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-meta">
        <span className="message-author">{who}</span>
        <span className="message-time">{format(new Date(when), 'p')}</span>
      </div>
      <div className="message-inner">
        <div className="message-content">
          {text && <p style={{ margin: 0 }}>{renderTextWithMentions(text)}</p>}
          {img && <img src={img} alt="Uploaded content" />}
        </div>
      </div>
    </div>
  );
};

export default Message;
