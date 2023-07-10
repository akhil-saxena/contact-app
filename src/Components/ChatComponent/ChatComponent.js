import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ChatDrawer from '../ChatDrawer/ChatDrawer';
import './ChatComponent.css';

const ChatComponent = ({ contacts }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const toggleExpansion = () => {
    setExpanded(!expanded);
    setSelectedContact(null);
  };

  const openChatDrawer = (contact) => {
    setSelectedContact(contact);
  };

  const onCloseChatDrawer = () => {
    setSelectedContact(null);
  };

  return (
    <div className={`chat-container ${expanded ? 'expanded' : ''}`}>
      <div className="chat-toggle" onClick={toggleExpansion}>
        <FontAwesomeIcon icon={faMessage} className="chat-icon" />
        Chat
        <FontAwesomeIcon icon={faChevronRight} className={`arrow-icon ${expanded ? 'expanded' : ''}`} />
      </div>
      {expanded && (
        <div className="contact-list">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className={`contact-item ${selectedContact === contact ? 'active' : ''}`}
              onClick={() => openChatDrawer(contact)}
            >
              <div className={`status-indicator ${contact.status ? 'active' : ''}`} />
              <div className="contact-image-chat">
                <img src={contact.profilepicture} alt={contact.name} />
              </div>
              {contact.name}
            </div>
          ))}
        </div>
      )}
      {selectedContact && <ChatDrawer contact={selectedContact} onClose={onCloseChatDrawer} />}
    </div>
  );
};

export default ChatComponent;