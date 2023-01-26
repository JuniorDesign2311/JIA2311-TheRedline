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
                                            // auth.createUserWithEmailAndPassword(email, password)
                                            //     .then(userCredential => {
                                            //         // Signed in 
                                                    getData();
                                            //         //Navigates to second creation screen and passes data through
                                            //         navigation.navigate('AccountCreation2', {
                                            //             docID: (username+phoneNumber)
                                            //         });
                                            //     })
                                            //     .catch(error => alert(error.message))
                                            navigation.navigate('AccountCreation2', {
                                                docID: (username+phoneNumber),
                                                username: username,
                                                email: email,
                                                phoneNumber: phoneNumber,
                                                password: password
                                            });
                                        } else {
                                            alert("Email is already linked to an account.")
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
                                alert("Phone number is already linked to an account.")
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
                    alert("Username already taken.")
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

    const getData = async () => {
        db.collection("users").doc(documentId).set({
            first: null,
            last: null,
            phoneNumber: phoneNumber,
            username: username,
            usernameToLowerCase: username.toLowerCase(),
            state: null,
            email: email,
            emailToLowerCase: email.toLower(),
            host: null,
            attendee: null
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

    const onContinuePressed = () => {
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

            // Error message if password is less than 6 characters
            if (password.length < 6) {
                if (errorMessage != "") errorMessage = errorMessage + "\n";
                errorMessage = errorMessage + "Password must have at least 6 charaters.";
            }

            if (password.length > 40) {
                if (errorMessage != "") errorMessage = errorMessage + "\n";
                errorMessage = errorMessage + "Password can't be longer than 40 charaters.";
            }

            if (phoneNumber.length != 10) {
                if (errorMessage != "") errorMessage = errorMessage + "\n";
                errorMessage = errorMessage + "Your phone number is too long or too short";
            }

            alert(errorMessage);
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
                    <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false} keyboardType = 'email-address'/>
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
                    <CustomInput placeholder="Confirm Password" value={cpassword} setValue={setcPassword} secureTextEntry={true}/>
                    <CustomInput placeholder="Phone Number" value={phoneNumber} setValue={setPhoneNumber} secureTextEntry={false} keyboardType = 'phone-pad'/>
                    <View style={{flexDirection:"row", marginBottom: 20, marginTop: 10 }}>
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
        marginBottom: 650,
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