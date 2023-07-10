import React from 'react';
import './ChatDrawer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatDrawer = ({ contact, onClose }) => {
  return (
    <div className="chat-drawer">
      <div className="chat-header">
        {contact.name}
        <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
      </div>
      <div className="chat-window">
        {/* Add Chat Messages Here */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatDrawer;