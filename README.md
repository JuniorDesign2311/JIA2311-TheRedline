# The Redline 🚗
There is currently no centralized place for vintage car enthusiasts to connect with the greater car community. Our application is an all-in-one platform that will aggregate car show events and meetups, allowing users to favorite and post their own events. 

# Release Notes version The Redline 1.0 

## NEW FEATURES 
* Location Permission Services for Users 
* Event Search Bar with Filters for Event Title, Date, and Proximity  
* Event Creation with Google Places Autocomplete, Date Picker, and Time Picker 
* Capability to Edit and Delete Events 
* Interactive Event Markers with Pop-up on Google Maps API 
* Favoriting System for Events

## BUG FIXES 
* Fixed an error where our account system would create an account but not continue to the application’s landing page due to an error with our error handling. 
* Fixed distortion of the screen size on the map screen whenever a user logged in with their phone’s keyboard still active. 
* Fixed a bug for the submit button on the event creation that required 2 presses 
* Fixed Firebase Authentication/Writing error in which it would create the account before continuing to step 2. This was an issue as users were allowed to go back to change their email address, phone number, etc. and thus not allowing them to reuse their information previously chosen. 

## KNOWN ISSUES 
*  TBD

# Install Guide The Redline 1.0 

## PRE-REQUISITES 
* MacBook: Homebrew, Watchmen, Node.js, React Native Client, Expo Client, Git, 
 XCode (optionally) 
* Windows: Node.js, React Native Client, Expo Client, Git, JDK (for Android), Android Studio (optionally) 

_Note: Xcode needs to be in the most recent version and Android Studio emulator needs to have Google Play services SDK Tool downloaded._

## DEPENDENCIES 
Mac OS 
* Expo Go (on mobile phone if you want to emulate app on phone) 
* VS Code (for computer to code) 
* Homebrew & Watchmen (needed to set up expo go with React Native) 
* Xcode (to emulate iOS app) 
* Android Studio (to emulate the android app) 

Windows 
* Expo Go (on mobile phone if you want to emulate app on phone) 
* VS Code (for computer to code) 
* Android Studio (to emulate the android app) 

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
* With any of those commands, a QR code will be generated in the terminal and can be scanned with the camera app on iOS or the Expo Go app on Android (press “Scan QR Code in the “Home” tab of Expo Go app) 
* If you don’t want to emulate on your phone, you may also emulate on your laptop: 
    * “a” to load up Android emulator 
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
* Android Emulator not loading
    * Stop the Expo Go server with “Ctrl+C”
    * Reload the server and start up the Android App again

------------

# The Redline
There is currently no centralized place for vintage car enthusiasts to connect with the greater car community. 
Our application is an all-in-one platform that will aggregate car show events and meetups, 
allowing users to favorite and post their own events.

# Release Notes

## Version 0.4.0

### New Features
* Filtering by location, title, date
* Make delete button and cancel button on profile page change color
* Implement a confirmation pop-up for deleting events
* Ability to edit events
* Favoriting events that links to profile page
* Account settings

### Bug Fixes
* When the title is too long, it pushes the heart off the touchable opacity -- put a character limit on title length
* Event creation page submit button required 2 presses
* Search bar had gray space above it

### Issues
* There are too many callbacks on profile page
* Profile settings page doesn't sit well on iPhone 10 and higher screens

## Version 0.3.0

### New Features
* Button that moves map to user's current location
* Each event in the event pull-up links with marker on map
* Ability to delete events
* Bottom Navigation Bar
* Profile Page
* Interactive Event Markers
* Google Places Autocomplete
* Date Picker for creating events
* Time Picker for creating events
* Search bar that filters by event title

### Bug Fixes
* Corrected error handling in event creation page
* Users weren't able to scroll the entirety of the profile page
* Search bar wouldn't allow user to delete the last letter

### Issues
* Search bar doesn't reset correctly
* Event creation page submit button requires 2 presses

## Version 0.2.0

### New Features
* Event Creation Screen with Backend Logging
* Populated Event Pull-up Sheet
* Functioning Location Permission Services
* Current Location Functionality
* Event Map Markers
* Split the databse "users" into "hosts" and "attendees"

### Bug Fixes
* Fixed an issue in which certain buttons pressed would result in Render Errors due to invalid objects.
* Corrected error handling from the login page that ultimately restricted user login where our database was incorrectly reading.
* Our Firebase Database wouldn't read the correct user which didn't allow for accurate data updates.
* We fixed an error where our account system would create an account but not continue due to an error with our error handling.
* Another bug we encountered and fixed dealt with the map screen sizing. Whenever a user logs in with the keyboard not
dismissed it would distort the screen size of the map screen after so we fixed this by dismissing the keyboard upon login.
* We found a bug with the form validation changing only after we move backwards to the page. We fixed this error by
redesigning our form validation logic.
* Location tracking will occasionally zoom out on an area because area tracking accuracy is set to low.

## Version 0.1.0

### New Features
* Login Screen
* Account Creation Screen
* Forgot Password Authentication
* Map Screen
* App Open Animation
* Account Successfully Created Screen
* Full Account Creation Authentication With Firebase

### Bug Fixes
* Fixed an issue where pressing "Continue" on account creation would proceed to the next step of account creation 
even though certain fields/parameters were incorrect.
* Fixed Firebase Authentication/Writing error in which it would create the account before continuing to step 2.
This was an issue because users are allowed to go back to change their email address, phone number, etc. and thus
not allowing them to reuse their information previously chosen.
* Fixed an error where typing in the "Confirm Password" field would automatically fill in the "Phone Number" field.
* Fixed an error where "Confirm Password" would require a strong password
