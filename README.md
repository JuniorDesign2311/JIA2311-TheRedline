# The Redline
There is currently no centralized place for vintage car enthusiasts to connect with the greater car community. 
Our application is an all-in-one platform that will aggregate car show events and meetups, 
allowing users to favorite and post their own events.

# Release Notes

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
* Users aren't able to scroll the entirety of the profile page
* Search bar wouldn't allow you to delete the last letter

### Need to Fix
* Search bar doesn't reset correctly
* Event creation page submit button requires 2 presses

## Version 0.4.0

### New Features
* 


### Bug Fixes
* 

### Need to Fix
* Search bar doesn't reset correctly
* Event creation page submit button requires 2 presses
* Search bar has gray space above it
* Profile settings page doesn't sit well on iPhone 10 and higher screens
