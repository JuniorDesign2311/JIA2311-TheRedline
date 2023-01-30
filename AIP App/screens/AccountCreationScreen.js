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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [attendeeClicked, setAttendeeClicked] = useState(false);
    const [hostClicked, setHostClicked] = useState(false);
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    // Error Handling
    const [inputError, setInputError] = useState('');
    // Document id to distinguish each user within our database
    const documentId = username+phoneNumber;

    const validateUser = () => {
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
                                            navigation.navigate('TermsOfService', {
                                                docID: (username+phoneNumber),
                                                username: username,
                                                email: email,
                                                phoneNumber: phoneNumber,
                                                password: password
                                            });
                                        } else {
                                            setInputError('Email already linked to an account')
                                            console.warn("Email already linked to an account.")
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
                                setInputError('Phone number already linked to an account')
                                console.warn("Phone number already linked to an account.")
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
                    setInputError('Username already taken')
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

    const validateInput = () => {
        // Error Handling
        var noError = false;

        if (username.length === 0) {
            setInputError('Username Field is Empty')
        }
        else if (username.indexOf(' ') >= 0) {
            setInputError('Username Cannot Contain Spaces')
        }
        else if (email.length === 0) {
            setInputError('Email Field is Empty')
        }
        else if (!email.includes('@')) {
            setInputError('Invalid Email Address');
        }
        else if (!email.includes('.')) {
            setInputError('Invalid Email Address');
        }
        else if (email.indexOf(' ') >= 0) {
            setInputError('Email Cannot Contain Spaces')
        }
        else if (password.length === 0) {
            setInputError('Password Field is Empty')
        }
        else if (password.length < 6) {
            setInputError('Password Must be at Least 6 Characters');
        }
        else if (password.length > 40) {
            setInputError("Password Can't be Longer Than 40 Charaters");
        }
        else if (password.indexOf(' ') >= 0) {
            setInputError('Password Cannot Contain Spaces')
        }
        else if (password != cpassword) {
            setInputError('Passwords do not Match')
        }
        else if (phoneNumber.length === 0) {
            setInputError('Phone Number Field is Empty')
        }
        else if (phoneNumber.length != 10) {
            setInputError('Phone Number is Incorrect');
        }
        else {
            setInputError('');
            noError = true;
        }
        return noError;
    }

    const onContinuePressed = () => {
        if (!validateInput()) {
            // If validateInput returns false, then user had error creating account
            console.warn("Error creating account");
        } else {
            validateUser();
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
                    <Text style={styles.error}> {inputError} </Text>
                    <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false} iconName="account-outline"/>
                    {/* <Text style={styles.error}> {usernameError} </Text> */}
                    <CustomInput placeholder="Email Address" value={email} setValue={setEmail} secureTextEntry={false} keyboardType = 'email-address' iconName="email-outline"/>
                    {/* <Text style={styles.error}> {emailError} </Text> */}
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} iconName="lock-outline"/>
                    <CustomInput placeholder="Confirm Password" value={cpassword} setValue={setcPassword} secureTextEntry={true} iconName="lock-outline"/>
                    {/* <Text style={styles.error}> {passwordError} </Text> */}
                    <CustomInput placeholder="Phone Number" value={phoneNumber} setValue={setPhoneNumber} secureTextEntry={false} keyboardType = 'phone-pad' iconName="phone-outline"/>
                    {/* <Text style={styles.error}> {phoneNumberError} </Text> */}
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
export default AccountCreationScreen;
