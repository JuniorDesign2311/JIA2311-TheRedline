import React, {useState, useRef, useMemo} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AttendeeHostButtons from '../components/AttendeeHostButtons';
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

    // Error Handling
    const [firstNameError, setfirstNameError] = useState('');
    const [lastNameError, setlastNameError] = useState('');
    const [stateError, setstateError] = useState('');
    const [accountTypeError, setAccountTypeError] = useState('');

    const createUser = async () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed in 
            writeUserData();
            //Navigates to second creation screen and passes data through
            navigation.navigate('AccountCreated')
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
            attendee: attendeeClicked
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    const onAttendeePressed = () => {
        if (hostClicked)  {
            console.warn("Please only choose one account type.");
        } else {
            setAttendeeClicked(!attendeeClicked);
        }  
        
        console.log("Attendee Clicked");
    }

    const onHostPressed = () => {
        if (attendeeClicked)  {
            console.warn("Please only choose one account type.");
        } else {
            setHostClicked(!hostClicked);
        }  
        console.log("Host Clicked");
    }

    const validateAccountType = () => {
        if (attendeeClicked === false && hostClicked === false) {
            setAccountTypeError('Please select an account type')
        }
        else {
            setAccountTypeError('');
        }
    }

    const validateState = () => {
        if (state.length === 0) {
            setstateError('Please Select a State')
        }
        else {
            setstateError('');
        }
    }

    const validateLastName = () => {
        if (lastName.length === 0) {
            setlastNameError('Last Name is Empty')
        }
        else {
            setlastNameError('');
        }
    }

    const validateFirstName = () => {
        if (firstName.length === 0) {
            setfirstNameError('First Name is Empty')
        }
        else {
            setfirstNameError('');
        }
    }

    const onCreateAccountPressed = () => {
        validateFirstName();
        validateLastName();
        validateState();
        validateAccountType();
        //Error handling
        var errorMessage = ""

        if (firstName === "" || lastName === ""
            || (!attendeeClicked && !hostClicked) || (attendeeClicked && hostClicked)) {

            // Error message if a field is not filled out
            if (firstName === "" || lastName === "") {
                errorMessage = errorMessage + "Fill out blank field(s).";
            }

            if (!attendeeClicked && !hostClicked) {
                if (errorMessage != "") errorMessage = errorMessage + "\n";
                errorMessage = errorMessage + "Please choose an account type."
            }

            console.warn(errorMessage);
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
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#d796fa'}}>
                <Text style={[styles.header]}> Create Account </Text>
                <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ display: "none" }}
                >
                    <View style={styles.sheet}>
                    <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} secureTextEntry={false} />
                    <Text style={styles.error}> {firstNameError} </Text>
                    <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} secureTextEntry={false} />
                    <Text style={styles.error}> {lastNameError} </Text>
                    <States state={state} setState={setState} />
                    <Text style={styles.error}> {stateError} </Text>

                    <View style={{ flexDirection: "row" }}>
                        <AttendeeHostButtons onPress={onAttendeePressed} buttonClicked={attendeeClicked} buttonName="Attendee" />
                        <AttendeeHostButtons onPress={onHostPressed} buttonClicked={hostClicked} buttonName="Host" />
                    </View>
                    <Text style={styles.error}> {accountTypeError} </Text>

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