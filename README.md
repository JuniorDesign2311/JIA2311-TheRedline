# AutoIndustryPortal
There is currently no centralized place for vintage car enthusiasts to connect with the greater car community. 
Our application is an all-in-one platform that will aggregate car show events and meetups, 
allowing users to favorite and post their own events.

## Release Notes

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
