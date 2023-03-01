import React, { useState } from 'react'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import EventDescriptionInput from '../components/EventDescriptionInput';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import uuid from 'react-native-uuid';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EventCreationScreen = ({ navigation }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Search for a location');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('Select a date');
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [time, setTime] = useState('');
    const [time12Hour, setTime12Hour] = useState('Select a time');
    const [description, setDescription] = useState('');
    const [placeID, setPlaceID] = useState('');
    // Form Validation Handling
    const [titleError, setTitleError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    // Error variables for input fields
    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidLocation, setIsValidLocation] = useState(true);
    const [isValidDate, setIsValidDate] = useState(true);
    const [isValidTime, setIsValidTime] = useState(true);
    const [isValidDescription, setIsValidDescription] = useState(true);
    // Variables to allow event creation
    const [titleNavigationCheck, setTitleNavigationCheck] = useState(false);
    const [locationNavigationCheck, setLocationNavigationCheck] = useState(false);
    const [dateNavigationCheck, setDateNavigationCheck] = useState(false);
    const [timeNavigationCheck, setTimeNavigationCheck] = useState(false);
    const [descriptionNavigationCheck, setDescriptionNavigationCheck] = useState(false);

    //User Data
    const user = firebase.auth().currentUser;

    //Event ID
    const eventID = uuid.v4();

    // Method that writes the event data into The Redline's Firebase Firestore
    const handleEventLogging = async () => {
        //Code to log user data and make it an object and then log the object's username
        firebase.firestore().collection("hosts").doc(user.uid).get().then((snapshot) => {
            if (snapshot.exists) {
                const userData = snapshot.data();
                userData["username"].toString();
                console.log(userData["username"].toString());
                db.collection("events").doc(eventID).set({
                    title: title,
                    location: location,
                    placeID: placeID,
                    date: date,
                    time: time,
                    time12Hour: time12Hour,
                    description: description,
                    host: userData["username"].toString(),
                })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            } else {
                console.log("User does not exist");
            }
        })
    }

    // Method that validates the inputs within each of the fields
    const validateInput = () => {
        // Error Handling

        var noError = true;

        // Title Validation
        if (title.length === 0) {
            noError = false;
            setTitleError('Title Field is Empty');
            setIsValidTitle(false);
        } else if (title.indexOf('&') >= 0 || title.indexOf('=') >= 0 || title.indexOf('_') >= 0 || title.indexOf("'") >= 0 || title.indexOf('-') >= 0 || title.indexOf('%') >= 0 || title.indexOf('$') >= 0
            || title.indexOf('+') >= 0 || title.indexOf(',') >= 0 || title.indexOf('<') >= 0 || title.indexOf('>') >= 0 || title.indexOf('~') >= 0 || title.indexOf('"') >= 0 || title.indexOf('.') >= 0) {
            noError = false;
            setTitleError('Title Cannot Contain Special Characters');
            setIsValidTitle(false);
        } else {
            console.log("no title error");
            setTitleNavigationCheck(true);
            setTitleError('');
            setIsValidTitle(true);
        }

        // Location Validation
        if (location === "Search for a location") {
            console.log("LocError2");
            setLocationError('Location Field is Empty');
            setIsValidLocation(false);
        } else {
            console.log("No Loc Error");
            setLocationNavigationCheck(true);
            setLocationError('');
            setIsValidLocation(true);
        }

        // Date Validation
        if (date === "Select a date") {
            console.log("DateError2");
            setDateError('Date Field is Empty');
            setIsValidDate(false);
        } else {
            console.log("No Date Error");
            setDateNavigationCheck(true);
            setDateError('');
            setIsValidDate(true);
        }

        // Time Validation
        if (time === "Select a time") {
            console.log("TimeError2");
            setTimeError('Time Field is Empty');
            setIsValidTime(false);
        } else {
            console.log("No Time Error");
            setTimeNavigationCheck(true);
            setTimeError('');
            setIsValidTime(true);
        }

        // Description Validation
        if (description.length === 0) {
            noError = false;
            setDescriptionError('Description Field is Empty');
            setIsValidDescription(false);
        } else {
            setDescriptionNavigationCheck(true);
            setDescriptionError('');
            setIsValidDescription(true);
        }

        if (titleNavigationCheck && locationNavigationCheck && dateNavigationCheck && timeNavigationCheck && descriptionNavigationCheck) {
            handleEventLogging();
            navigation.navigate("BottomTabs")
        }
    }

    // Method that handles Submit button click
    const onSubmitPressed = () => {
        validateInput()
    }

    // Method that handles Cancel button click
    const onCancelPressed = () => {
        navigation.navigate("BottomTabs");
    }

    // Methods for toggling visibility of date-picker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (input) => {
        console.warn("A date has been picked: ", input); // date will be in format: YYYY-MM-DDTXX:XX:XX.XXXZ
        setDate(input.toString().substring(0, 15));
        hideDatePicker();
    };

    // Methods for toggling visibility of time-picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleTimeConfirm = (timeInput) => {
        console.warn("A time has been picked: ", timeInput); // time will be in format: XXXX-XX-XXTHH:MM:XX.XXXZ

        var convertTime = timeInput.toString().substring(16, 18) + timeInput.toString().substring(19, 21);
        convertTime = parseInt(convertTime);
        if (convertTime < 10) { // ------------------------------- 12:00AM - 12:09AM
            convertTime = "12:0" + convertTime + " AM";
        } else if (convertTime >= 10 && convertTime < 100) { //--- 12:10AM - 12:59AM
            convertTime = "12:" + convertTime + " AM";
        } else if (convertTime >= 100 && convertTime < 1000) { //- 1:00AM - 9:59AM
            convertTime = Math.floor(convertTime / 100) + ":" + convertTime.toString().substring(1, 3) + " AM";
        } else if (convertTime >= 1000 && convertTime < 1200) { // 10:00AM - 11:59AM
            convertTime = Math.floor(convertTime / 100) + ":" + convertTime.toString().substring(2, 4) + " AM";
        } else if (convertTime >= 1200 && convertTime < 1300) { // 12:00PM - 12:59PM
            convertTime = Math.floor(convertTime / 100) + ":" + convertTime.toString().substring(2, 4) + " PM";
        } else if (convertTime >= 1300 && convertTime < 2200) { // 1:00PM - 9:59PM
            convertTime = convertTime - 1200;
            convertTime = Math.floor(convertTime / 100) + ":" + convertTime.toString().substring(1, 3) + " PM";
        } else if (convertTime >= 2200 && convertTime < 2400) { // 10:00PM - 11:59PM
            convertTime = convertTime - 1200;
            convertTime = Math.floor(convertTime / 100) + ":" + convertTime.toString().substring(2, 4) + " PM";
        }
        setTime12Hour(convertTime);
        setTime(timeInput.toString().substring(16, 21));
        hideTimePicker();
    };

    //Google place setting place ID
    const handleLocationInput = (description, locationID) => {
        console.log(description, ", ", locationID);
        setLocation(description);
        setPlaceID(locationID);
    }

    // UI Components
    return (
        <KeyboardAvoidingWrapper>
            <View style={GlobalStyles.viewStyle}>
                <Text style={[styles.header]}> Create Event </Text>
                <View style={styles.sheet}>
                    <CustomInput placeholder="Event Title" value={title} setValue={setTitle} secureTextEntry={false} inputError={titleError} isValid={isValidTitle} />
                    <View style={styles.locationContainer} horizontal={false}>
                        <Text>Location</Text>
                        <ScrollView horizontal={true} keyboardShouldPersistTaps="handled">
                            <GooglePlacesAutocomplete
                                placeholder={location}
                                onPress={(data, details = null) => {
                                    console.log(data, details);
                                    handleLocationInput(data.description, data.place_id);
                                }}
                                query={{
                                    key: 'AIzaSyDTKNiZ9cnqslVZD9GS_1F_Z6K_6DJ9kfw',
                                    language: 'en',
                                }}
                                isValid={isValidLocation}
                                locationError={false}
                                fetchDetails={true}
                            />
                        </ScrollView>
                    </View>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        display='inline'
                        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <View style={styles.dateContainer}>
                        <Text>Date</Text>
                        <Button
                            title={date.substring(0, 15)}
                            onPress={showDatePicker}
                            borderColor="#D3D3D3"
                            inputError={dateError}
                            isValid={isValidDate}
                        />
                    </View>

                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        timeZoneOffsetInSeconds={3600}
                        mode='time'
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />
                    <View style={styles.dateContainer}>
                        <Text>Time</Text>
                        <Button
                            title={time12Hour}
                            onPress={showTimePicker}
                            borderColor="#D3D3D3"
                            inputError={timeError}
                            isValid={isValidTime}
                        />
                    </View>

                    <EventDescriptionInput placeholder="Event Description" value={description} setValue={setDescription} secureTextEntry={false} inputError={descriptionError} isValid={isValidDescription} />

                    <View style={{ flexDirection: "row", marginBottom: 0, marginTop: 15 }}>
                        <CustomButton onPress={onSubmitPressed} buttonName="Submit" type="PRIMARY" />
                    </View>
                    <TouchableOpacity onPress={onCancelPressed}>
                        <Text style={GlobalStyles.blueText} iconName="account-outline"> Cancel </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingWrapper>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        paddingTop: '40%',
        marginBottom: "10%",
        textAlign: 'left',
    },
    sheet: {
        alignItems: 'center',
        marginBottom: '40%',
    },
    locationContainer: {
        width: '90%',
        flex: 0,
        alignSelf: 'flex-start',
    },
    dateContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
})
export default EventCreationScreen;