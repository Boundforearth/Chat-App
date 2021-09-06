# Chat-App

## Description
This is an App that allows users to set a name and join a chat room.  There, users will be able to send messages, send photos, take and send pictures, and send their location.  The App will ask for permission before accessing the users photos, camera, or location.

## Dependencies
 - React Native
 - Expo
 - Expo Image Picker
 - Expo-location
 - Gifted Chat
 - Google Firebase
 - JavaScript
 - Proptypes


## Setup

First, install expo globally using the command

`npm install expo-cli --global`

Navigate to the apps folder in the command line, then install the apps dependencies with

`npm Install`

To run the app, use:

`npm start` or `expo start`

This will open up a page in your browser. With an iPhone, you can open the camera app and scan the QR code provided to open up the app. Android users will need to use the Expo Go to scan.


For the database, you need to create an account in Google Firebase.  Then create a project, and name it whatever you would like.  

From the projects page, create a Firestore Database and run it in test mode.  From there you will be able to create collections and documents.  The collection should be called "messages".  To get all you need to config your own database, get to "Project Settings" and go the "General" tab.  In the section "Your apps".  You want to use Firestore for Web, which should be the </> icon.  That should bring up your configuration.  

In the Chat.js file, find the code
`const firebaseConfig ={}	`

Place your config options inside of there to use your own database.

To allow images, open the build tab in your project's page and click on storage.  Click "Get Started" 
And keep everything default to set up cloud storage.  This is where images that are sent will be kept.


