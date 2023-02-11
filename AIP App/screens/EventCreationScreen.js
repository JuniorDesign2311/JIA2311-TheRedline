import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import EventDescriptionInput from '../components/EventDescriptionInput';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import uuid from 'react-native-uuid';

const EventCreationScreen = ({ navigation, route }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [oldDate, setOldDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    // Error Handling
    const [titleError, setTitleError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [dateError, setDateError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [isValidTitle, setIsValidTitle] = useState(true);
    const [isValidLocation, setIsValidLocation] = useState(true);
    const [isValidDate, setIsValidDate] = useState(true);
    const [isValidTime, setIsValidTime] = useState(true);
    const [isValidDescription, setIsValidDescription] = useState(true);

    //User Data
    const user = firebase.auth().currentUser;
    const [username, setUsername] = useState('');

    //Event ID
    const eventID = uuid.v4();


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

    const validateInput = () => {
        // Error Handling
        
        var noError = true;

        if (title.length === 0) {
            noError = false;
            setTitleError('Title Field is Empty');
            setIsValidTitle(false);
        }
        else if (title.indexOf('&') >= 0 || title.indexOf('=') >= 0 || title.indexOf('_') >= 0 || title.indexOf("'") >= 0 || title.indexOf('-') >= 0 || title.indexOf('%') >= 0 || title.indexOf('$') >= 0
                    || title.indexOf('+') >= 0 || title.indexOf(',') >= 0 || title.indexOf('<') >= 0 || title.indexOf('>') >= 0 || title.indexOf('~') >= 0 || title.indexOf('"') >= 0 || title.indexOf('.') >= 0) {
            noError = false;
            setTitleError('Title Cannot Contain Special Characters');
            setIsValidTitle(false);
        }
        else {
            setTitleError('');
            setIsValidTitle(true);
        }

        if (location.length === 0) {
            noError = false;
            setLocationError('Location Field is Empty');
            setIsValidLocation(false);
        }
        else if (location.includes('.')) {
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

        if (oldDate.length === 0) {
            noError = false;
            setDateError('Date Field is Empty');
            setIsValidDate(false);
        }
        else if (oldDate.indexOf(' ') >= 0) {
            noError = false;
            setDateError('Date Cannot Contain Spaces');
            setIsValidDate(false);
        } else {
            setDateError('');
            setIsValidDate(true);
        }

        if (time.length === 0) {
            noError = false;
            setTimeError('Time Field is Empty');
            setIsValidTime(false);
        }
        else if (time.indexOf(' ') >= 0) {
            noError = false;
            setTimeError('Time Cannot Contain Spaces');
            setIsValidTime(false);
        } else {
            setTimeError('');
            setIsValidTime(true);
        }

        if (description.length === 0) {
            noError = false;
            setDescriptionError('Description Field is Empty');
            setIsValidDescription(false);
        }
        else {
            setDescriptionError('');
            setIsValidDescription(true);
        }
        
        return noError;
    }


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

    const onCancelPressed = () => {
        navigation.navigate("Map");
    }

    return (
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'white'}}>
                <Text style={[styles.header]}> Create Event </Text>
                    <View style={styles.sheet}>
                    <CustomInput placeholder="Event Title" value={title} setValue={setTitle} secureTextEntry={false} inputError={titleError} isValid={isValidTitle}/>
                    <CustomInput placeholder="Location" value={location} setValue={setLocation} secureTextEntry={false} inputError={locationError} isValid={isValidLocation}/>
                    
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
        </TouchableWithoutFeedback>
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
    }
})
export default EventCreationScreen;
