import React, {useState, useRef, useMemo} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import States from '../components/States';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import { useNavigation } from '@react-navigation/native';
import "firebase/firestore";
import BottomSheet from '@gorhom/bottom-sheet';

const AccountCreationScreen = ({ navigation }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [state, setState] = useState('');
    const [attendeeClicked, setAttendeeClicked] = useState(false);
    const [hostClicked, setHostClicked] = useState(false);
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    // Error Handling
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    // Document id to distinguish each user within our database
    const documentId = username+phoneNumber;

    const handleSignUp = () => {
        var db = firebase.firestore();
        var usersRef = db.collection("users");
        // query for inputted username
        usersRef.where("usernameToLowerCase", '==', username.toLowerCase()).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    // query for inputted phone number
                    usersRef.where("phoneNumber", "==", phoneNumber).get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                usersRef.where("emailToLowerCase", "==", email.toLowerCase()).get()
                                    .then(snapshot => {
                                        if (snapshot.empty) {
                                            navigation.navigate('AccountCreation2', {
                                                docID: (username+phoneNumber),
                                                username: username,
                                                email: email,
                                                phoneNumber: phoneNumber,
                                                password: password
                                            });
                                        } else {
                                            console.warn("Email is already linked to an account.")
                                        }
            
                                    })
                                    .then(createdUser => {
                                        console.log(createdUser);
                                        db.collection("users").doc(createdUser.user.uid).set({ email: email });
                                    })
                                    .catch(err => {
                                        console.log("Error: ", err);
                                    })
                            } else {
                                console.warn("Phone number is already linked to an account.")
                            }

                        })
                        .then(createdUser => {
                            console.log(createdUser);
                            db.collection("users").doc(createdUser.user.uid).set({ phoneNumber: phoneNumber });
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                        })

                } else {
                    console.warn("Username already taken.")
                }
            })
            .then(createdUser => {
                console.log(createdUser);
                //Create the user doc in the users collection
                db.collection("users").doc(createdUser.user.uid).set({ username: username });
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    }

    const validateEmail = () => {
        if (email.length === 0) {
            setEmailError('Email Field is Empty')
        }
        else if (!email.includes('@')) {
            setEmailError('Invalid Email Address');
        }
        else if (!email.includes('.')) {
            setEmailError('Invalid Email Address');
        }
        else if (email.indexOf(' ') >= 0) {
            setEmailError('Email Cannot Contain Spaces')
        }
        else {
            setEmailError('');
        }
    }

    const validatePassword = () => {
        if (password.length === 0) {
            setPasswordError('Password Field is Empty')
        }
        else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        }
        else if (password.indexOf(' ') >= 0) {
            setPasswordError('Password Cannot Contain Spaces')
        }
        else if (password != cpassword) {
            setPasswordError('Passwords do not match')
        }
        else {
            setPasswordError('');
        }
    }

    const validatePhone = () => {
        if (phoneNumber.length === 0) {
            setPhoneNumberError('Phone Number Field is Empty')
        }
        else if (phoneNumber.length != 10) {
            setPhoneNumberError('Phone Number is incorrect');
        }
        else {
            setPhoneNumberError('');
        }
    }

    const validateUsername = () => {
        if (username.length === 0) {
            setUsernameError('Username Field is Empty')
        }
        // else if (password.length < 6) {
        //     setUsernameError('Password must be at least 6 characters');
        // }
        else if (username.indexOf(' ') >= 0) {
            setUsernameError('Username Cannot Contain Spaces')
        }
        else {
            setUsernameError('');
        }
    }

    const onContinuePressed = () => {
        validateEmail();
        validatePassword();
        validatePhone();
        validateUsername();
        //Error handling
        var errorMessage = ""

        if (username === "" || email === "" || password === "" || cpassword === ""|| phoneNumber === ""
            || password != cpassword || password.length < 6 || password.length > 40 || phoneNumber.length != 10) {

            // Error message if a field is not filled out
            if (username === "" || email === "" || password === "" || cpassword === ""|| phoneNumber === "") {
                errorMessage = errorMessage + "Fill out blank field(s).";
            }

            // Error message if password and password confirmation do not match
            if (password != cpassword) {
                if (errorMessage != "") errorMessage = errorMessage + "\n";
                errorMessage = errorMessage + "Passwords do not match.";
            }

            if (password.length > 40) {
                if (errorMessage != "") errorMessage = errorMessage + "\n";
                errorMessage = errorMessage + "Password can't be longer than 40 charaters.";
            }

            console.warn(errorMessage);
        } else {
            handleSignUp();
        }
    }

    const onCancelPressed = () => {
        navigation.navigate("Login");
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
                    <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false}/>
                    <Text style={styles.error}> {usernameError} </Text>
                    <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false} keyboardType = 'email-address'/>
                    <Text style={styles.error}> {emailError} </Text>
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
                    <CustomInput placeholder="Confirm Password" value={cpassword} setValue={setcPassword} secureTextEntry={true}/>
                    <Text style={styles.error}> {passwordError} </Text>
                    <CustomInput placeholder="Phone Number" value={phoneNumber} setValue={setPhoneNumber} secureTextEntry={false} keyboardType = 'phone-pad'/>
                    <Text style={styles.error}> {phoneNumberError} </Text>
                    <View style={{flexDirection:"row", marginBottom: 0, marginTop: 0 }}>
                        <CustomButton onPress={onContinuePressed} buttonName="Continue" type="PRIMARY"/>
                    </View>
                   
                    <TouchableOpacity onPress={onCancelPressed}>
                        <Text style = {{fontSize:13, marginTop: 0,  color: '#039be5'}}>
                            Back To Login
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
        marginTop: 150,
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
export default AccountCreationScreen