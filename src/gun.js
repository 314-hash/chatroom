// src/gun.js
import Gun from 'gun/gun';
import 'gun/sea'; // Security, Encryption, and Authorization
import 'gun/axe'; // Advanced Exchange Equation (for network resilience)

// Using a public relay peer. For production, you'd host your own.
const gun = Gun({
  peers: ['https://gun-manhattan.herokuapp.com/gun']
});

export default gun;
