// src/components/ChatRoom.jsx
import React, { useState, useEffect, useRef } from 'react';
import gun from '../gun';
import { block } from 'million/react';
import { gsap } from 'gsap';
import Message from './Message';
import MessageInput from './MessageInput';

// Unique key for your chatroom. Change this for a different room.
const CHAT_KEY = 'service-chatroom-96';

const ChatRoomBlock = ({ alias }) => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Animate the whole chat window on load
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(chatContainerRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' })
      .fromTo('.chat-header', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo('.message-input-area', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "<");
  }, []);

  // Subscribe to Gun.js messages
  useEffect(() => {
    const chatNode = gun.get(CHAT_KEY);
    const messageMap = new Map();

    chatNode.map().on((data, id) => {
      if (data && data.text) {
        // Use a map to avoid duplicates and handle updates
        messageMap.set(id, {
          id,
          who: data.who,
          text: data.text,
          img: data.img,
          when: data.when,
        });
        
        // Convert map to sorted array
        const sortedMessages = Array.from(messageMap.values()).sort((a, b) => new Date(a.when) - new Date(b.when));
        setMessages(sortedMessages);
      }
    });

    // Clean up listener if component unmounts
    return () => {
      chatNode.off();
    };
  }, []);

  // Animate new messages and scroll down
  useEffect(() => {
    if (messagesRef.current) {
        // Animate the newest message
        const lastMessage = messagesRef.current.lastElementChild;
        if (lastMessage) {
            gsap.from(lastMessage, {
                opacity: 0,
                y: 20,
                scale: 0.95,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        }
      // Auto-scroll to bottom
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text, imageBase64 = null) => {
    if (text.trim() || imageBase64) {
      const message = {
        who: alias,
        text: text.trim(),
        img: imageBase64,
        when: new Date().toISOString(),
      };
      // .set() adds an item to a list/set in Gun
      gun.get(CHAT_KEY).set(message);
    }
  };

  return (
    <div ref={chatContainerRef} className="chat-container">
      <header className="chat-header">
        <h1>Customer Service Live Chat</h1>
      </header>
      <div ref={messagesRef} className="messages-list">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} isCurrentUser={msg.who === alias} />
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

// Wrap with million.block for performance
const ChatRoom = block(ChatRoomBlock);
export default ChatRoom;
