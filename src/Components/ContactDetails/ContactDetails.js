import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ChatComponent from "../ChatComponent/ChatComponent"
import './ContactDetails.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWtoaWxzYXhlbmEiLCJhIjoiY2xqczU3eXgxMGl4ZDNkdnNtbzRqdHd2YyJ9.xPrT44xA8FaUSS09HMyRWw';

const ContactDetails = ({ contact, onDeselectContact }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    
    const [selectedMenuItem, setSelectedMenuItem] = useState('Profile');
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [contacts, setContacts] = useState([]);

    const { address } = contact;
    const { street, suite, city, zipcode, geo } = address;
    
    const validateLatitude = (latitudeValue) => {return (latitudeValue > -90 && latitudeValue < 90) ? latitudeValue : 12.971599 }
    const validateLongitude = (longitudeValue) => {return (longitudeValue > -180 && longitudeValue < 180) ? longitudeValue : 77.594566 }
    const latitude = validateLatitude(geo.lat);
    const longitude = validateLongitude(geo.lng);

    const toggleUserProfile = () => {
        setShowUserProfile(!showUserProfile);
    };
    
    const fetchContacts = async () => {
        try {
            const response = await fetch('https://panorbit.in/api/users.json');
            const data = await response.json();
            setContacts(data.users);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignout = () => {
        onDeselectContact()
        toggleUserProfile();
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [longitude, latitude],
            zoom: 10
        });
    });

    return (
        <div className="contact-details-page">
            <div className="user-profile-container" onClick={toggleUserProfile}>
                <img className="user-profile-icon" src={contact.profilepicture} alt={contact.name} />
                <p className="username">{contact.name}</p>
            </div>
            {showUserProfile && (
                <div className="user-profile-card">
                    <img className="profile-image" src={contact.profilepicture} alt={contact.name} />
                    <h3 className="title">{contact.name}</h3>
                    <p className="profile-email">{contact.email}</p>
                    <hr className='divider'></hr>
                    {contacts.slice(0, 2).map((contact) => (
                        <div
                            key={contact.id}
                            className="profile-item"
                        >
                            <img className="profile-item-image" src={contact.profilepicture} alt={contact.name} />
                            <p className="contact-name">{contact.name}</p>
                        </div>
                    ))}
                    <button class="signout-button" onClick={handleSignout}>Sign Out</button>

                </div>
            )}

            <div className="navigation-menu">
                <ul>
                    <li
                        className={selectedMenuItem === 'Profile' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('Profile')}
                    >
                        Profile
                    </li>
                    <li
                        className={selectedMenuItem === 'Posts' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('Posts')}
                    >
                        Posts
                    </li>
                    <li
                        className={selectedMenuItem === 'Gallery' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('Gallery')}
                    >
                        Gallery
                    </li>
                    <li
                        className={selectedMenuItem === 'ToDo' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('ToDo')}
                    >
                        ToDo
                    </li>
                </ul>
            </div>
            {selectedMenuItem === 'Profile' && (<>
                <div className="contact-info">
                    <div className="profile-info">
                        <img className='contact-image-large' src={contact.profilepicture} alt={contact.name} />
                        <div className="profile-data">
                            <h3 className="title">{contact.name}</h3>
                            <p>
                                <span className="key">Username:</span> {contact.username}
                            </p>
                            <p>
                                <span className="key">Email:</span> {contact.email}
                            </p>
                            <p>
                                <span className="key">Phone:</span> {contact.phone}
                            </p>
                            <p>
                                <span className="key">Website:</span> {contact.website}
                            </p>

                            <hr className="divider" />
                            <h3 className="title">Company</h3>
                            <p>
                                <span className="key">Name:</span> {contact.company.name}
                            </p>
                            <p>
                                <span className="key">catchphrase:</span> {contact.company.catchPhrase}
                            </p>
                            <p>
                                <span className="key">bs:</span> {contact.company.bs}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="address-info">
                    <ChatComponent contacts={contacts} />

                    {selectedMenuItem === 'Profile' && (
                        <>
                            <div className="profile-data">
                                <h3 className="title">Address</h3>
                                <p>
                                    <span className="key">Street:</span> {street}
                                </p>
                                <p>
                                    <span className="key">Suite:</span> {suite}
                                </p>
                                <p>
                                    <span className="key">City:</span> {city}
                                </p>
                                <p>
                                    <span className="key">ZipCode:</span> {zipcode}
                                </p>
                            </div>
                            <div className="map-container">
                                <div ref={mapContainer} className="map-container" />
                                <div className='map-coordinates'>
                                    <p>
                                        <span className="lat-lng">Lat:</span> {latitude}</p>
                                    <p>
                                        <span className="lat-lng"> Long:</span> {longitude}
                                    </p>
                                </div>
                            </div>
                        </>)}
                </div>
            </>)}
            {selectedMenuItem !== 'Profile' && (
                <div className="coming-soon">
                    <h2>Coming Soon</h2>
                </div>
            )}
        </div>
    );
};

export default ContactDetails;