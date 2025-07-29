// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import gun from './gun';
import ChatRoom from './components/ChatRoom';
import { gsap } from 'gsap';
import './styles.css';

function App() {
  const [alias, setAlias] = useState(sessionStorage.getItem('alias') || '');
  const [tempAlias, setTempAlias] = useState('');
  const aliasContainerRef = useRef(null);

  useEffect(() => {
    // GSAP intro animation for the alias input
    if (!alias) {
      gsap.fromTo(aliasContainerRef.current, 
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
      );
    }
  }, [alias]);

  const handleAliasSubmit = (e) => {
    e.preventDefault();
    if (tempAlias.trim()) {
      sessionStorage.setItem('alias', tempAlias.trim());
      setAlias(tempAlias.trim());
    }
  };

  if (!alias) {
    return (
      <div ref={aliasContainerRef} className="alias-container">
        <h2>Enter Your Name</h2>
        <form onSubmit={handleAliasSubmit} className="input-form">
          <input
            type="text"
            value={tempAlias}
            onChange={(e) => setTempAlias(e.target.value)}
            className="text-input"
            placeholder="Your name or nickname..."
            required
          />
          <button type="submit" className="send-button">Join Chat</button>
        </form>
      </div>
    );
  }

  return <ChatRoom alias={alias} />;
}

export default App;
