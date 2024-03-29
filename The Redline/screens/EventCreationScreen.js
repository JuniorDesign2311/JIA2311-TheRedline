import React, {useState} from 'react'
import { Dimensions, Button, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import EventDescriptionInput from '../components/EventDescriptionInput';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import uuid from 'react-native-uuid';
import GlobalStyles from '../components/GlobalStyles';
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-element-dropdown';

const EventCreationScreen = ({ navigation }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Search for a location');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('Select a date');
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [time, setTime] = useState('Select a time'); // 12-hour time. What the user sees
    const [time24Hour, setTime24Hour] = useState(''); // 24-hour time. For backend use
    const [repeats, setRepeats] = useState('');
    const [description, setDescription] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const repeatOptions = [
        { label: 'Does not repeat', value: '1' },
        { label: 'Daily', value: '2' },
        { label: 'Weekly', value: '3' },
        { label: 'Monthly', value: '4' },
        { label: 'Yearly', value: '5' },
    ];

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
                db.collection("events").doc(eventID).set({
                    isExpanded: false,
                    title: title,
                    location: location,
                    longitude: longitude,
                    latitude: latitude,
                    date: date,
                    time: time,
                    time24Hour: time24Hour,
                    repeats: repeats,
                    description: description,
                    host: userData["username"].toString(),
                })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            } else {
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
        } else if (title.length > 27) {
            noError = false;
            setTitleError('Title Exceeds Character Limit');
            setIsValidTitle(false);
        } else {
            setTitleError('');
            setIsValidTitle(true);
        }

        // Location Validation
        if (location === "Search for a location") {
            setLocationError('Location Field is Empty');
            setIsValidLocation(false);
        } else {
            setLocationError('');
            setIsValidLocation(true);
        }

        // Date Validation
        if (date === "Select a date") {
            setDateError('Date Field is Empty');
            setIsValidDate(false);
        } else {
            setDateError('');
            setIsValidDate(true);
        }

        // Time Validation
        if (time === "Select a time") {
            setTimeError('Time Field is Empty');
            setIsValidTime(false);
        } else {
            setTimeError('');
            setIsValidTime(true);
        }

        // Description Validation
        if (description.length === 0) {
            noError = false;
            setDescriptionError('Description Field is Empty');
            setIsValidDescription(false);
        } else {
            setDescriptionError('');
            setIsValidDescription(true);
        }

        if (noError) {
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
        setTime(convertTime);
        setTime24Hour(timeInput.toString().substring(16, 21));
        hideTimePicker();
    };

    //Google place setting place ID
    const handleLocationInput = (description, longitude, latitude) => {
        setLongitude(longitude)
        setLatitude(latitude)
        setLocation(description);
    }

    // UI Components
    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
            <View style={GlobalStyles.viewStyle}>
                <Text style={[styles.header]}> Create Event </Text>
                
                <View style={styles.sheet}>
                    <CustomInput placeholder="Event Title" value={title} setValue={setTitle} secureTextEntry={false} inputError={titleError} isValid={isValidTitle}/>
                    <Text style={styles.dateTimeText}>Location</Text>
                        
                        <View style={styles.fieldContainter}>
                        <View style={[styles.boundingBox, {borderColor: isValidDate ? '#e8e8e8': 'red'}]}>

                        <ScrollView horizontal={true} nestedScrollEnabled={true} keyboardShouldPersistTaps='handled'>
                            <GooglePlacesAutocomplete
                                placeholder={ location }
                                onPress={(data, details = null) => {
                                    handleLocationInput(data.description, details.geometry.location.lng, details.geometry.location.lat);
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
                        </View>
                        
                

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <Text style={styles.dateTimeText}>Date</Text>
                        <View style={styles.fieldContainter}>
                        <View style={[styles.boundingBox, {borderColor: isValidDate ? '#e8e8e8': 'red'}]}>
                            
                            <Button
                                title={date.substring(0,15)}
                                onPress={showDatePicker}
                                inputError={dateError}
                                isValid={isValidDate}
                            />
                            </View>
                           
                    </View>

                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        timeZoneOffsetInSeconds={3600}
                        mode='time'
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />
                    <Text style={styles.dateTimeText}>Time</Text>
                    <View style={styles.fieldContainter}>
                        <View style={[styles.boundingBox, {borderColor: isValidTime ? '#e8e8e8': 'red'}]}>
                            <Button
                                title={time}
                                onPress={showTimePicker}
                                inputError={timeError}
                                isValid={isValidTime}
                            />
                        </View>
                    </View>

                    <Text style={styles.dateTimeText}>Repeats</Text>
                    <View style={styles.fieldContainter}>
                        <View style={[styles.boundingBox, {borderColor: isValidTime ? '#e8e8e8': 'red'}]}>
                            <Dropdown
                                style={{width: '100%', paddingHorizontal: '3%'}}
                                data={repeatOptions}
                                placeholder={repeats}
                                labelField="label"
                                valueField="value"
                                value={repeats}
                                onChange = { item => {
                                    setRepeats(item.label);
                                }}
                            />
                        </View>
                    </View>

                    <EventDescriptionInput placeholder="Event Description" value={description} setValue={setDescription} secureTextEntry={false} inputError={descriptionError} isValid={isValidDescription}/>
                    <View style={{flexDirection:"row", marginBottom: 0, marginTop: 15 }}>
                        <CustomButton onPress={onSubmitPressed} buttonName="Submit" type="PRIMARY"/>
                    </View>
                    <TouchableOpacity onPress={onCancelPressed}>
                        <Text style = {GlobalStyles.blueText} iconName="account-outline"> Cancel </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
    fieldContainter:{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: "2%",
        alignSelf: 'flex-start',
        backgroundColor: 'white'
    },
    dateTimeText:{      
        width: '100%',
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
    },
    boundingBox:{
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        borderColor: '#e8e8e8',

        alignItems: "center",
        paddingVertical: "1%",
        marginVertical: "0.15%",
    },
})
export default EventCreationScreen;