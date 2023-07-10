import React, { useState } from 'react';
import './App.css';
import ContactList from './Components/ContactList/ContactList';
import ContactDetails from './Components/ContactDetails/ContactDetails';

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  const handleContactDeselect = () => {
    setSelectedContact(null);
  };

  return (
    <div>
      {selectedContact ? (
        <div className="contact-details-container">
          <ContactDetails
            contact={selectedContact}
            onDeselectContact={handleContactDeselect}
          />
        </div>
      ) : (
        <div className="container">
          <div className="heading">Select an account</div>
          <div className="contact-list">
            <ContactList onSelectContact={handleContactSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
