import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import EventDescriptionInput from '../components/EventDescriptionInput';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import uuid from 'react-native-uuid';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const EventCreationScreen = ({ navigation }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [oldDate, setOldDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
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
            console.log(userData["username"].toString());
            db.collection("events").doc(eventID).set({
                title: title,
                location: location,
                date: oldDate,
                time: time,
                description: description,
                host: userData["username"].toString()
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
            setTitleError('');
            setIsValidTitle(true);
        }

        // Location Validation
        if (location.length === 0) {
            noError = false;
            setLocationError('Location Field is Empty');
            setIsValidLocation(false);
        } else if (location.includes('.')) {
            noError = false;
            setLocationError('Invalid Location');
            setIsValidLocation(false);
        } else if (location.indexOf('&') >= 0 || location.indexOf('=') >= 0 || location.indexOf("'") >= 0 || location.indexOf('*') >= 0 || location.indexOf('%') >= 0
        || location.indexOf('+') >= 0 || location.indexOf(',') >= 0 || location.indexOf('<') >= 0 || location.indexOf('>') >= 0 || location.indexOf('$') >= 0 || location.indexOf('"') >= 0) {
            noError = false;
            setLocationError('Location Cannot Contain Special Characters');
            setIsValidLocation(false);
        } else {
            setLocationError('');
            setIsValidLocation(true);
        }

        // Date Validation
        if (oldDate.length === 0) {
            noError = false;
            setDateError('Date Field is Empty');
            setIsValidDate(false);
        } else if (oldDate.indexOf(' ') >= 0) {
            noError = false;
            setDateError('Date Cannot Contain Spaces');
            setIsValidDate(false);
        } else {
            setDateError('');
            setIsValidDate(true);
        }
        
        // Time Validation
        if (time.length === 0) {
            noError = false;
            setTimeError('Time Field is Empty');
            setIsValidTime(false);
        } else if (time.indexOf(' ') >= 0) {
            noError = false;
            setTimeError('Time Cannot Contain Spaces');
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
        
        return noError;
    }

    // Method that handles Submit button click
    const onSubmitPressed = () => {
        if (!validateInput()) {
            // If validateInput returns false, then user had error creating account
            console.warn("Account could not be created");
        } else {
            console.log(eventID);
            handleEventLogging();
            navigation.navigate("Map");
        }
    }

    // Method that handles Cancel button click
    const onCancelPressed = () => {
        navigation.navigate("Map");
    }

    // UI Components
    return (
        <KeyboardAvoidingWrapper>
            
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'white'}}>
                <Text style={[styles.header]}> Create Event </Text>
                <View style={styles.sheet}>
                    <CustomInput placeholder="Event Title" value={title} setValue={setTitle} secureTextEntry={false} inputError={titleError} isValid={isValidTitle}/>
                    <CustomInput placeholder="Location" value={location} setValue={setLocation} secureTextEntry={false} inputError={locationError} isValid={isValidLocation}/>
                    <GooglePlacesAutocomplete
                            placeholder="Location"
                            onPress={(data, details = null) => {
                                console.log(data,details);
                            }}
                            query={{
                                key: 'AIzaSyDTKNiZ9cnqslVZD9GS_1F_Z6K_6DJ9kfw',
                                language: 'en',
                            }}
                    />
                    <CustomInput placeholder="Date" value={oldDate} setValue={setOldDate} secureTextEntry={false} inputError={dateError} isValid={isValidDate}/>
                    <CustomInput placeholder="Time" value={time} setValue={setTime} secureTextEntry={false} inputError={timeError} isValid={isValidTime} textContentType = 'oneTimeCode'/>
                    <EventDescriptionInput placeholder="Event Description" value={description} setValue={setDescription} secureTextEntry={false} inputError={descriptionError} isValid={isValidDescription}/>
                   
                    <View style={{flexDirection:"row", marginBottom: 0, marginTop: 15 }}>
                        <CustomButton onPress={onSubmitPressed} buttonName="Submit" type="PRIMARY"/>
                    </View>
                    <TouchableOpacity onPress={onCancelPressed}>
                        <Text style = {{fontSize:13, marginTop: 0,  color: '#039be5'}} iconName="account-outline">
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingWrapper>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "left"
    },
    header: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        paddingTop: '40%',
        marginBottom: "10%",
        textAlign: 'left',
    },
    error: {
        color:'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sheet: {
        alignItems: 'center',
        marginBottom: '40%',
    }
})
export default EventCreationScreen;


// UNCOMMENT EVERYTHING BELOW AND COMMENT EVERYTHING ABOVE TO SEE GOOGLE PLACES AUTOCOMPLETE FUNCTION

// import React, {useState, useRef, useMemo} from 'react'
// import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform } from 'react-native'
// import CustomInput from '../components/CustomInput';
// import CustomButton from '../components/CustomButton';
// import EventDescriptionInput from '../components/EventDescriptionInput';
// import States from '../components/States';
// import { auth } from '../firebaseConfig';
// import { db } from '../firebaseConfig';
// import firebase from "firebase/app";
// import { useNavigation } from '@react-navigation/native';
// import "firebase/firestore";
// import { set } from 'react-native-reanimated';
// import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// const EventCreationScreen = ({ navigation }) => {
//     /* useState returns the original value argument that's passed in and a function that returns the changed value */
//     const [title, setTitle] = useState('');
//     const [location, setLocation] = useState('');
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const [description, setDescription] = useState('');
//     // Error Handling
//     const [titleError, setTitleError] = useState('');
//     const [locationError, setLocationError] = useState('');
//     const [dateError, setDateError] = useState('');
//     const [timeError, setTimeError] = useState('');
//     const [descriptionError, setDescriptionError] = useState('');

//     const [isValidTitle, setIsValidTitle] = useState(true);
//     const [isValidLocation, setIsValidLocation] = useState(true);
//     const [isValidDate, setIsValidDate] = useState(true);
//     const [isValidTime, setIsValidTime] = useState(true);
//     const [isValidDescription, setIsValidDescription] = useState(true);

//     const validateInput = () => {
//         // Error Handling

//         var noError = true;

//         if (title.length === 0) {
//             noError = false;
//             setTitleError('Title Field is Empty');
//             setIsValidTitle(false);
//         }
//         else if (Title.indexOf(' ') >= 0) {
//             noError = false;
//             setTitleError('Title Cannot Contain Spaces');
//             setIsValidTitle(false);
//         }
//         else if (Title.indexOf('&') >= 0 || Title.indexOf('=') >= 0 || Title.indexOf('_') >= 0 || Title.indexOf("'") >= 0 || Title.indexOf('-') >= 0 || Title.indexOf('%') >= 0 || Title.indexOf('$') >= 0
//                     || Title.indexOf('+') >= 0 || Title.indexOf(',') >= 0 || Title.indexOf('<') >= 0 || Title.indexOf('>') >= 0 || Title.indexOf('~') >= 0 || Title.indexOf('"') >= 0 || Title.indexOf('.') >= 0) {
//             noError = false;
//             setTitleError('Title Cannot Contain Special Characters');
//             setIsValidTitle(false);
//         }
//         else {
//             setTitleError('');
//             setIsValidTitle(true);
//         }

//         if (location.length === 0) {
//             noError = false;
//             setLocationError('Location Field is Empty');
//             setIsValidLocation(false);
//         }
//         else if (!location.includes('.')) {
//             noError = false;
//             setLocationError('Invalid Location');
//             setIsValidLocation(false);
//         } else if (location.indexOf(' ') >= 0 || location.indexOf('&') >= 0 || location.indexOf('=') >= 0 || location.indexOf("'") >= 0 || location.indexOf('*') >= 0 || location.indexOf('%') >= 0
//         || location.indexOf('+') >= 0 || location.indexOf(',') >= 0 || location.indexOf('<') >= 0 || location.indexOf('>') >= 0 || location.indexOf('$') >= 0 || location.indexOf('"') >= 0) {
//             noError = false;
//             setLocationError('Location Cannot Contain Special Characters');
//             setIsValidLocation(false);
//         } else {
//             setLocationError('');
//             setIsValidLocation(true);
//         }

//         if (date.length === 0) {
//             noError = false;
//             setDateError('Date Field is Empty');
//             setIsValidDate(false);
//         }
//         else if (date.indexOf(' ') >= 0) {
//             noError = false;
//             setDateError('Date Cannot Contain Spaces');
//             setIsValidDate(false);
//         } else {
//             setDateError('');
//             setIsValidDate(true);
//         }

//         if (time.length === 0) {
//             noError = false;
//             setTimeError('Time Field is Empty');
//             setIsValidTime(false);
//         }
//         else if (time.indexOf(' ') >= 0) {
//             noError = false;
//             setTimeError('Time Cannot Contain Spaces');
//             setIsValidTime(false);
//         } else {
//             setTimeError('');
//             setIsValidTime(true);
//         }

//         if (description.length === 0) {
//             noError = false;
//             setDescriptionError('Description Field is Empty');
//             setIsValidDescription(false);
//         }
//         else {
//             setTimeError('');
//             setIsValidDescription(true);
//         }

//         return noError;
//     }

//     const onSubmitPressed = () => {
//         navigation.navigate("Map")
//     }

//     const onCancelPressed = () => {
//         navigation.navigate("Map");
//     }

//     return (

//         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

//        <View style={{flex:1,padding:50,backgroundColor: 'white'}}>
//                 <Text style={[styles.header]}> Create Event </Text>
//                     <GooglePlacesAutocomplete
//                         placeholder="Location"
//                         onPress={(data, details = null) => {
//                             console.log(data,details);
//                         }}
//                         query={{
//                             key: 'AIzaSyDTKNiZ9cnqslVZD9GS_1F_Z6K_6DJ9kfw',
//                             language: 'en',
//                         }}
//                     />
//             </View>
//         </TouchableWithoutFeedback>
//     )
// }

// const styles = StyleSheet.create({
//     text: {
//         textAlign: "left"
//     },
//     header: {
//         fontSize: 45,
//         fontFamily: 'Helvetica Neue',
//         fontWeight: 'bold',
//         marginBottom: "10%",
//         textAlign: 'left',
//     },
//     error: {
//         color:'red',
//         fontSize: 15,
//         fontWeight: 'bold',
//         textAlign: 'center'
//     },
//     sheet: {
//         alignItems: 'center',
//     }
// })
// export default EventCreationScreen;
	