import React, { useEffect, useState } from 'react';
import './ContactList.css';

const ContactList = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://panorbit.in/api/users.json');
      const data = await response.json();
      setContacts(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactClick = (contact) => {
    onSelectContact(contact);
  };

  return (
    <div>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="contact-item"
          onClick={() => handleContactClick(contact)}
        >
          <div className="contact-image">
            <img src={contact.profilepicture} alt={contact.name} />
          </div>
            <p className="contact-name">{contact.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
