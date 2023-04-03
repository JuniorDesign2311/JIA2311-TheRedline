import React, {useState, useRef, useMemo} from 'react'
import { View, Text, StyleSheet, Keyboard, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AttendeeHostButtons from '../components/AttendeeHostButtons';
import HostButton from '../components/HostButton';
import { auth } from '../firebaseConfig';
import firebase from "firebase/app";
import "firebase/firestore";
import BottomSheet from '@gorhom/bottom-sheet';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';

const AccountCreationScreen2 = ({ navigation, route }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [attendeeClicked, setAttendeeClicked] = useState(false);
    const [hostClicked, setHostClicked] = useState(false);
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    var db = firebase.firestore();
    var username = route.params.username
    var email = route.params.email
    var phoneNumber = route.params.phoneNumber
    var password = route.params.password
    // Form Validation Handling
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [attendeeHostError, setAttendeeHostError] = useState('');
    // Error variables for input fields
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [isValidLastName, setIsValidLastName] = useState(true);
    const [hasAttendeeHostError, setHasAttendeeHostError] = useState(false);


    // Method to create the user
    const createUser = async () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            var userID = userCredential.user.uid;
            // Signed in
            writeUserData(userID);
            //Navigates to second creation screen and passes data through
            Keyboard.dismiss();
            navigation.navigate('AccountCreated', {
                email1: route.params.email,
                password1: route.params.password,
                username1: username
            })
        })
        .catch(error => console.warn(error.message))
    }

    // Method that writes the user's inputted data into The Redline's Firebase Firestore
    const writeUserData = async (userID) => {
        if (hostClicked) {
            db.collection("hosts").doc(userID).set({
                first: firstName,
                last: lastName,
                phoneNumber: phoneNumber,
                username: username,
                usernameToLowerCase: username.toLowerCase(),
                email: email,
                emailToLowerCase: email.toLowerCase(),
                favorites: [],
            })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            db.collection("attendees").doc(userID).set({
                first: firstName,
                last: lastName,
                phoneNumber: phoneNumber,
                username: username,
                usernameToLowerCase: username.toLowerCase(),
                email: email,
                emailToLowerCase: email.toLowerCase(),
                favorites: [],
            })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }

    // Method that checks if the Attendee user type is selected
    const onAttendeePressed = () => {
        if (hostClicked)  {
            setAttendeeClicked(!attendeeClicked);
            setHostClicked(!hostClicked);
        } else {
            setAttendeeClicked(!attendeeClicked);
        }
    }

    // Method that checks if the Host user type is selected
    const onHostPressed = () => {
        if (attendeeClicked)  {
            setAttendeeClicked(!attendeeClicked);
            setHostClicked(!hostClicked);
        } else {
            setHostClicked(!hostClicked);
        }
    }

    // Method that validates the inputs within each of the fields
    const validateInputs = () => {
        var noError = true;

        // First Name Validation
        if (!firstName) {
            noError = false;
            setFirstNameError('First Name is Empty');
            setIsValidFirstName(false);
        } else if (firstName.indexOf(' ') >= 0) {
            noError = false;
            setFirstNameError('Name Cannot Contain Spaces');
            setIsValidFirstName(false);
        } else {
            setFirstNameError('');
            setIsValidFirstName(true);
        }

        // Last Name Validation
        if (!lastName) {
            noError = false;
            setLastNameError('Last Name is Empty');
            setIsValidLastName(false);
        } else if (lastName.indexOf(' ') >= 0) {
            noError = false;
            setLastNameError('Name Cannot Contain Spaces');
            setIsValidLastName(false);
        } else {
            setLastNameError('')
            setIsValidLastName(true);
        }

        // User Type Validation
        if (attendeeClicked === false && hostClicked === false) {
            noError = false;
            setAttendeeHostError('Please select an account type');
            setHasAttendeeHostError(true);
        }
        else {
            setAttendeeHostError('');
            setHasAttendeeHostError(false);
        }

        return noError;
    }

    // Method that hanldes Create Account button click
    const onCreateAccountPressed = () => {
        Keyboard.dismiss();
        if (!validateInputs()) {
            console.log("Error creating account")
        } else {
            createUser();
        }
    }

    // Method that handles Go Back button click
    const onGoBackPressed = () => {
        navigation.navigate("AccountCreation");
    }

    // UI Components
    return (
        <KeyboardAvoidingWrapper>
            <View style={GlobalStyles.viewStyle}>
                <Text style={[GlobalStyles.header]}> Create Account </Text>
                <BottomSheet
                    ref={sheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    handleIndicatorStyle={{ display: "none" }}
                >
                    <View style={GlobalStyles.sheet}>
                        <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} secureTextEntry={false} inputError={firstNameError} isValid={isValidFirstName}/>
                        <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} secureTextEntry={false} inputError={lastNameError} isValid={isValidLastName}/>
                    
                        <View style={{ flexDirection: "row" }}>
                            <AttendeeHostButtons onPress={onAttendeePressed} buttonClicked={attendeeClicked} buttonName="Attendee" inputError={AttendeeHostButtons} hasError={hasAttendeeHostError}/>
                            <HostButton onPress={onHostPressed} buttonClicked={hostClicked} buttonName="Host" hasError={hasAttendeeHostError}/>
                        </View>

                        <Text style={{color: "red"}}> {attendeeHostError} </Text>

                        <View style={{ flexDirection: "row"}}>
                            <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY" />
                        </View>

                        <TouchableOpacity onPress={onGoBackPressed}>
                            <Text style = {GlobalStyles.blueText}> Go Back </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
        </KeyboardAvoidingWrapper>
    )
}

export default AccountCreationScreen2
