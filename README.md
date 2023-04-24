# The Redline 🚗
There is currently no centralized place for vintage car enthusiasts to connect with the greater car community. Our application is an all-in-one platform that will aggregate car show events and meetups, allowing users to favorite and post their own events. 

# Release Notes

## Version 1.0 

### NEW FEATURES 
* Location Permission Services for Users 
* Event Search Bar with Filters for Event Title, Date, and Proximity  
* Event Creation with Google Places Autocomplete, Date Picker, and Time Picker 
* Capability to Edit and Delete Events 
* Interactive Event Markers with Pop-up on Google Maps API 
* Favoriting System for Events

### BUG FIXES 
* Fixed an error where our account system would create an account but not continue to the application’s landing page due to an error with our error handling. 
* Fixed distortion of the screen size on the map screen whenever a user logged in with their phone’s keyboard still active. 
* Fixed a bug for the submit button on the event creation that required 2 presses.
* Fixed Firebase Authentication/Writing error in which it would create the account before continuing to step 2. This was an issue as users were allowed to go back to change their email address, phone number, etc. and thus not allowing them to reuse their information previously chosen. 

### KNOWN ISSUES 
* Console warning: Sending 'onAnimatedValueUpdate' with no listeners registered.
* Console warning: AsyncStorage has been extracted from react-native-core and will be removed in a future release.
    * Neither of these console warnings cause issues with the functionality of the app, but they continuously pop up when simulating the build.

------------

# Installation Guide for The Redline 1.0 

## PRE-REQUISITES 
* MacBook: Homebrew, Watchmen, Node.js, React Native Client, Expo Client, Git, 
 XCode (optionally) 
* Windows: Node.js, React Native Client, Expo Client, Git, 

_Note: Xcode needs to be in the most recent version

## DEPENDENCIES 
Mac OS 
* Expo Go (on mobile phone if you want to emulate app on phone) 
* VS Code (for computer to code) 
* Homebrew & Watchmen (needed to set up expo go with React Native) 
* Xcode (to emulate iOS app) 

Windows 
* Expo Go (on mobile phone if you want to emulate app on phone) 
* VS Code (for computer to code) 

## DOWNLOAD 
* Get access to the project from GitHub and clone the repository 
* Navigate to folder you would like to keep the project in on local device 
* Open link to GitHub project and click green “Code” button 
* Copy HTTPS link under local tab 
* Open command line and type in `git clone <link>` and paste the link where it says <link> 
* A browser will pop up where you will log into GitHub 
* After logging in, the “AutoIndustryPortal” project files should be downloaded in the selected directory 

## BUILD 
* Open “The Redline” folder on VS Code 
* Open VS Code terminal and type `npm install` 
* The App is now ready to run 

## RUNNING THE APP 
* To run the application, there are multiple commands that may be run: 
    * `expo start` 
    * `npm run start` 
    * `npm start` 
* With any of those commands, a QR code will be generated in the terminal and can be scanned with the camera app on iOS
* If you don’t want to emulate on your phone, you may also emulate on your laptop: 
    * “i” to load up iOS emulator 

## INSTALLATION 
* None. 

## TROUBLESHOOTING 
* When pulling from the recent merge, sometimes you must run the app twice for it to build.  
* Sometimes watchmen needs to be updated.  
* If `npm start`, expo start, or `npm run` start isn't working, check to see if you are in the "The Redline" folder. 

## COMMON ERRORS AND SOLUTIONS: 
* The expected package.json path: `/Users/<username>/Desktop/Github Projects/JIA2311-TheRedline/package.json` does not exist 
    * Solution: right click package.json() > Open in integrated terminal 
* Tunnel URL not found, falled back to LAN URL 
    * Solutions: 
        * Make sure both devices are using the same internet connection 
        * Update expo-cli and @expo/ngrok 
        * To run the app, try using ‘expo-cli start –tunnel’ in the terminal 
