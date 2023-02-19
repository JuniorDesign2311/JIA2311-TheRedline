import React, {useState, useRef, useMemo} from 'react'
import { View, Text,  StyleSheet, TouchableOpacity} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import firebase from "firebase/app";
import "firebase/firestore";
import BottomSheet from '@gorhom/bottom-sheet';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';

const AccountCreationScreen = ({ navigation }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    // Form Validation Handling
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    // Error variables for input fields
    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirm, setIsValidConfirm] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);

    // Method to check if the user exists or not (within the user collection of the database)
    const validateUser = () => {
        var db = firebase.firestore();
        var attendeeRef = db.collection("attendees");
        // query for inputted username
        attendeeRef.where("usernameToLowerCase", '==', username.toLowerCase()).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    // query for inputted phone number
                    attendeeRef.where("phoneNumber", "==", phoneNumber).get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                attendeeRef.where("emailToLowerCase", "==", email.toLowerCase()).get()
                                    .then(snapshot => {
                                        if (snapshot.empty) {
                                            checkHosts();
                                        } else {
                                            setEmailError('Email already linked to an account')
                                            setIsValidEmail(false);
                                            console.warn("Email already linked to an account.")
                                        }

                                    })
                                    .then(createdAttendee => {
                                        db.collection("attendees").doc(createdAttendee.user.uid).set({ email: email });
                                    })
                                    .catch(err => {
                                        console.log("Error: ", err);
                                    })
                            } else {
                                setPhoneError('Phone number already linked to an account');
                                setIsValidPhone(false);
                                console.warn("Phone number already linked to an account.");
                            }

                        })
                        .then(createdAttendee => {
                            db.collection("attendees").doc(createdAttendee.user.uid).set({ phoneNumber: phoneNumber });
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                        })

                } else {
                    setUsernameError('Username already taken');
                    setIsValidUsername(false);
                    console.warn("Username already taken.")
                }
            })
            .then(createdAttendee => {
                //Create the user doc in the users collection
                db.collection("attendees").doc(createdAttendee.user.uid).set({ username: username });
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    }

    // Method to check if the user exists or not (within the host collection of the database)
    const checkHosts = () => {
        var db = firebase.firestore();
        var hostRef = db.collection("hosts");
        // query for inputted username
        hostRef.where("usernameToLowerCase", '==', username.toLowerCase()).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    // query for inputted phone number
                    hostRef.where("phoneNumber", "==", phoneNumber).get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                hostRef.where("emailToLowerCase", "==", email.toLowerCase()).get()
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
                                            setEmailError('Email already linked to an account')
                                            setIsValidEmail(false);
                                            console.warn("Email already linked to an account.")
                                        }

                                    })
                                    .then(createdHost => {
                                        db.collection("hosts").doc(createdHost.user.uid).set({ email: email });
                                    })
                                    .catch(err => {
                                        console.log("Error: ", err);
                                    })
                            } else {
                                setPhoneError('Phone number already linked to an account');
                                setIsValidPhone(false);
                                console.warn("Phone number already linked to an account.");
                            }

                        })
                        .then(createdHost => {
                            db.collection("hosts").doc(createdHost.user.uid).set({ phoneNumber: phoneNumber });
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                        })

                } else {
                    setUsernameError('Username already taken');
                    setIsValidUsername(false);
                    console.warn("Username already taken.")
                }
            })
            .then(createdHost => {
                //Create the user doc in the users collection
                db.collection("hosts").doc(createdHost.user.uid).set({ username: username });
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    }


    // Method that validates the inputs within each of the fields
    const validateInput = () => {
        // Error Handling

        var noError = true;

        if (username.length === 0) {
            noError = false;
            setUsernameError('Username Field is Empty');
            setIsValidUsername(false);
        } else if (username.indexOf(' ') >= 0) {
            noError = false;
            setUsernameError('Username Cannot Contain Spaces');
            setIsValidUsername(false);
        } else if (username.indexOf('&') >= 0 || username.indexOf('=') >= 0 || username.indexOf('_') >= 0 || username.indexOf("'") >= 0 || username.indexOf('-') >= 0 || username.indexOf('%') >= 0 || username.indexOf('$') >= 0
                    || username.indexOf('+') >= 0 || username.indexOf(',') >= 0 || username.indexOf('<') >= 0 || username.indexOf('>') >= 0 || username.indexOf('~') >= 0 || username.indexOf('"') >= 0 || username.indexOf('.') >= 0) {
            noError = false;
            setUsernameError('Username Cannot Contain Special Characters');
            setIsValidUsername(false);
        } else {
            setUsernameError('');
            setIsValidUsername(true);
        }

        // Email Validation
        if (email.length === 0) {
            noError = false;
            setEmailError('Email Field is Empty');
            setIsValidEmail(false);
        } else if (!email.includes('@')) {
            noError = false;
            setEmailError('Invalid Email Address');
            setIsValidEmail(false);
        } else if (!email.includes('.')) {
            noError = false;
            setEmailError('Invalid Email Address');
            setIsValidEmail(false);
        } else if (email.indexOf(' ') >= 0 || email.indexOf('&') >= 0 || email.indexOf('=') >= 0 || email.indexOf("'") >= 0 || email.indexOf('*') >= 0 || email.indexOf('%') >= 0
        || email.indexOf('+') >= 0 || email.indexOf(',') >= 0 || email.indexOf('<') >= 0 || email.indexOf('>') >= 0 || email.indexOf('$') >= 0 || email.indexOf('"') >= 0) {
            noError = false;
            setEmailError('Email Cannot Contain Special Characters');
            setIsValidEmail(false);
        } else {
            setEmailError('');
            setIsValidEmail(true);
        }

        // Password Validation
        if (password.length === 0) {
            noError = false;
            setPasswordError('Password Field is Empty');
            setIsValidPassword(false);
        } else if (password.length < 6) {
            noError = false;
            setPasswordError('Password must be at least 6 characters');
            setIsValidPassword(false);
        } else if (password.length > 40) {
            noError = false;
            setPasswordError("Password can't be longer than 40 charaters");
            setIsValidPassword(false);
        } else if (password.indexOf(' ') >= 0) {
            noError = false;
            setPasswordError('Password Cannot Contain Spaces');
            setIsValidPassword(false);
        } else {
            setPasswordError('');
            setIsValidPassword(true);
        }

        // Confirm Password Validation
        if (!cpassword) {
            setConfirmError('Please confirm password');
            setIsValidConfirm(false);
        } else if (password != cpassword) {
            noError = false;
            setConfirmError('Passwords do not match');
            setIsValidConfirm(false);
        } else {
            setConfirmError('');
            setIsValidConfirm(true);
        }

        // Phone Number Validation
        if (phoneNumber.length === 0) {
            noError = false;
            setPhoneError('Phone Number Field is Empty');
            setIsValidPhone(false);
        } else if (phoneNumber.length != 10) {
            noError = false;
            setPhoneError('Phone Number is not valid');
            setIsValidPhone(false);
        } else {
            setPhoneError('');
            setIsValidPhone(true);
        }

        return noError;
    }

    // Method to handle Continue button click
    const onContinuePressed = () => {
        if (!validateInput()) {
            // If validateInput returns false, then user had error creating account
        } else {
            validateUser();
        }
    }

    // Method to handle Cancel button click
    const onCancelPressed = () => {
        navigation.navigate("Login");
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
                        <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false} iconName="account-outline" inputError={usernameError} isValid={isValidUsername}/>
                        <CustomInput placeholder="Email Address" value={email} setValue={setEmail} secureTextEntry={false} keyboardType = 'email-address' iconName="email-outline" inputError={emailError} isValid={isValidEmail}/>
                        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} iconName="lock-outline" inputError={passwordError} isValid={isValidPassword}/>
                        <CustomInput placeholder="Confirm Password" value={cpassword} setValue={setcPassword} secureTextEntry={true} iconName="lock-outline" inputError={confirmError} isValid={isValidConfirm} textContentType = 'oneTimeCode'/>
                        <CustomInput placeholder="Phone Number" value={phoneNumber} setValue={setPhoneNumber} secureTextEntry={false} keyboardType = 'phone-pad' iconName="phone-outline" inputError={phoneError} isValid={isValidPhone}/>

                        <View style={{flexDirection:"row", marginBottom: 0, marginTop: 0 }}>
                            <CustomButton onPress={onContinuePressed} buttonName="Continue" type="PRIMARY"/>
                        </View>

                        <TouchableOpacity onPress={onCancelPressed}>
                            <Text style={GlobalStyles.blueText}> Back To Login </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
        </KeyboardAvoidingWrapper>
    )
}

export default AccountCreationScreen;
