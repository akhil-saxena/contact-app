# React Quiz App

This is a simple React contact application that allows users to see a list of contacts fetched form an API call. Upon clicking any contact, their details show up on the page in a two-column layout. Certain pages are shown as Coming Soon. There is a non-functional chat functionality which shows a list of contacts and opens a chat window when contact is clicked. 

## Features

- Display list of contacts fetched from an API call.
- Display additional details for the contact selected.
- A user profile widget which opens when clicking user profile with ability to Sign Out and go back to contact list.
- A map using MapBox which shows the location of the user based on the latitude and longitude provided.

## Technologies Used

- React
- Axios
- MapBox

## Getting Started

Follow the instructions below to run the React quiz app on your local machine.

### Prerequisites

Make sure you have the following software installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:
```git clone https://github.com/akhil-saxena/contact-app.git```

2. Navigate to the project directory:
```cd contact-app```

3. Install the dependencies:
```npm i```

4. Start the development server:
```npm start```

5. Open your browser and visit `http://localhost:3000` to access the app.


## Usage

1. The app starts with a list of contacts.

2. Select a contact from the list to open Contact Details page.

3. Contact Details page shows additonal details of the selected contact.

4. Open User Profile widget by clicking on top right profile icon, signout to go to contact list

5. Click the Chat Window on bottom right to open a chat list.

6. Select a contact to open up that contacts' chat drawer.
