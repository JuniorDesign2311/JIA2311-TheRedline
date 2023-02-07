import React, {useState, useRef, useMemo} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AttendeeHostButtons from '../components/AttendeeHostButtons';
import HostButton from '../components/HostButton';
import States from '../components/States';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import { useNavigation } from '@react-navigation/native';
import "firebase/firestore";
import BottomSheet from '@gorhom/bottom-sheet';


/*
const isValidEmail = (email) =>
/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email);

const isValidPhoneNumber = (phone) =>
/^(?(\d{3}))?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
*/
const AccountCreationScreen2 = ({ navigation, route }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [state, setState] = useState('');
    const [attendeeClicked, setAttendeeClicked] = useState(false);
    const [hostClicked, setHostClicked] = useState(false);
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    var db = firebase.firestore();
    var usersRef = db.collection("users");
    var documentId = route.params.docID
    var username = route.params.username
    var email = route.params.email
    var phoneNumber = route.params.phoneNumber
    var password = route.params.password
    var locationAsked = route.params.locationAsked
    var locationTracking = route.params.locationTracking

    // Error Handling
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [stateError, setStateError] = useState('');
    const [attendeeHostError, setAttendeeHostError] = useState('');
    
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [isValidLastName, setIsValidLastName] = useState(true);
    const [hasStateError, setHasStateError] = useState(false);
    const [hasAttendeeHostError, setHasAttendeeHostError] = useState(false);
   
    

    const createUser = async () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed in 
            writeUserData();
            //Navigates to second creation screen and passes data through
            navigation.navigate('AccountCreated', {
                email1: route.params.email,
                password1: route.params.password,
            })
        })
        .catch(error => console.warn(error.message))
    }

    const writeUserData = async () => {
        db.collection("users").doc(documentId).set({
            first: firstName,
            last: lastName,
            phoneNumber: phoneNumber,
            username: username,
            usernameToLowerCase: username.toLowerCase(),
            state: state,
            email: email,
            emailToLowerCase: email.toLowerCase(),
            host: hostClicked,
            attendee: attendeeClicked,
            locationTracking: false,
            locationAsked: false
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    const onAttendeePressed = () => {
        if (hostClicked)  {
            alert("Please only choose one account type.");
        } else {
            setAttendeeClicked(!attendeeClicked);
        }  
        
        console.log("Attendee Clicked");
    }

    const onHostPressed = () => {
        if (attendeeClicked)  {
            alert("Please only choose one account type.");
        } else {
            setHostClicked(!hostClicked);
        }  
        console.log("Host Clicked");
    }

    const validateInputs = () => {
        var noError = true;

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

        if (!state) {
            noError = false;
            setStateError('Please Select a State')
            setHasStateError(true);
        } else {
            setStateError('');
            setHasStateError(false);
        }

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


    const onCreateAccountPressed = () => {    
        if (!validateInputs()) {
            console.warn("Error creating account")
        } else {
            createUser();
            console.warn("Account Created");
        }
    }

    const onGoBackPressed = () => {
        navigation.navigate("AccountCreation");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'white'}}>
                <Text style={[styles.header]}> Create Account </Text>
                <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ display: "none" }}
                >
                    <View style={styles.sheet}>
                    
                    
                    <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} secureTextEntry={false} inputError={firstNameError} isValid={isValidFirstName}/>
                    <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} secureTextEntry={false} inputError={lastNameError} isValid={isValidLastName}/>
                    <States state={state} setState={setState} />
                    <Text style={{color: "red"}}> {stateError} </Text>

                    <View style={{ flexDirection: "row" }}>
                        <AttendeeHostButtons onPress={onAttendeePressed} buttonClicked={attendeeClicked} buttonName="Attendee" inputError={AttendeeHostButtons} hasError={hasAttendeeHostError}/>
                        <HostButton onPress={onHostPressed} buttonClicked={hostClicked} buttonName="Host" hasError={hasAttendeeHostError}/>
                    </View>

                    <Text style={{color: "red"}}> {attendeeHostError} </Text>
                    
                    <View style={{ flexDirection: "row"}}>
                        
                        <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY" /></View>
                        
                        <TouchableOpacity onPress={onGoBackPressed}>
                        <Text style = {{fontSize:13, marginTop: 0,  color: '#039be5'}}>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                    
                    </View>
                </BottomSheet>
            </View>
        </TouchableWithoutFeedback>
    )
}



const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    setTitleFont: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 30,
    },
    text: {
        textAlign: "left"
    },
    header: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        paddingTop: 50,
        marginBottom: 600,
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
    },
    bottomSheetStyle: {
        borderRadius: 50
    }
})
export default AccountCreationScreen2
