import React, {useState, useRef, useMemo} from 'react'
import { View, Text,  StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import firebase from "firebase/app";
import "firebase/firestore";
import BottomSheet from '@gorhom/bottom-sheet';

const AccountCreationScreen = ({ navigation }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    // Error Handling
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirm, setIsValidConfirm] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);


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
                                    .then(createdUser => {
                                        // console.log(createdUser);
                                        db.collection("users").doc(createdUser.user.uid).set({ email: email });
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
                        .then(createdUser => {
                            // console.log(createdUser);
                            db.collection("users").doc(createdUser.user.uid).set({ phoneNumber: phoneNumber });
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
            .then(createdUser => {
                // console.log(createdUser);
                //Create the user doc in the users collection
                db.collection("users").doc(createdUser.user.uid).set({ username: username });
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    }

    const validateInput = () => {
        // Error Handling
        
        var noError = true;

        if (username.length === 0) {
            noError = false;
            setUsernameError('Username Field is Empty');
            setIsValidUsername(false);
        }
        else if (username.indexOf(' ') >= 0) {
            noError = false;
            setUsernameError('Username Cannot Contain Spaces');
            setIsValidUsername(false);
        }
        else if (username.indexOf('&') >= 0 || username.indexOf('=') >= 0 || username.indexOf('_') >= 0 || username.indexOf("'") >= 0 || username.indexOf('-') >= 0 || username.indexOf('%') >= 0 || username.indexOf('$') >= 0
                    || username.indexOf('+') >= 0 || username.indexOf(',') >= 0 || username.indexOf('<') >= 0 || username.indexOf('>') >= 0 || username.indexOf('~') >= 0 || username.indexOf('"') >= 0 || username.indexOf('.') >= 0) {
            noError = false;
            setUsernameError('Username Cannot Contain Special Characters');
            setIsValidUsername(false);
        }
        else {
            setUsernameError('');
            setIsValidUsername(true);
        }

        if (email.length === 0) {
            noError = false;
            setEmailError('Email Field is Empty');
            setIsValidEmail(false);
        } 
        if (!email.includes('@')) {
            noError = false;
            setEmailError('Invalid Email Address');
            setIsValidEmail(false);
        }
        else if (!email.includes('.')) {
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

        if (password.length === 0) {
            noError = false;
            setPasswordError('Password Field is Empty');
            setIsValidPassword(false);
        }
        else if (password.length < 6) {
            noError = false;
            setPasswordError('Password must be at least 6 characters');
            setIsValidPassword(false);
        }
        else if (password.length > 40) {
            noError = false;
            setPasswordError("Password can't be longer than 40 charaters");
            setIsValidPassword(false);
        }
        else if (password.indexOf(' ') >= 0) {
            noError = false;
            setPasswordError('Password Cannot Contain Spaces');
            setIsValidPassword(false);
        } else {
            setPasswordError('');
            setIsValidPassword(true);
        }

        if (!cpassword) {
            setConfirmError('Please confirm password');
            setIsValidConfirm(false);
        }
        else if (password != cpassword) {
            noError = false;
            setConfirmError('Passwords do not match');
            setIsValidConfirm(false);
        }  else {
            setConfirmError('');
            setIsValidConfirm(true);
        }

        if (phoneNumber.length === 0) {
            noError = false;
            setPhoneError('Phone Number Field is Empty');
            setIsValidPhone(false);
        }
        else if (phoneNumber.length != 10) {
            noError = false;
            setPhoneError('Phone Number is not valid');
            setIsValidPhone(false);
        }
        else {
            setPhoneError('');
            setIsValidPhone(true);
        }

        return noError;
    }

    const onContinuePressed = () => {
        if (!validateInput()) {
            // If validateInput returns false, then user had error creating account
            console.warn("Account could not be created");
        } else {
            validateUser();
        }
    }

    const onCancelPressed = () => {
        navigation.navigate("Login");
    }

    return (
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss} accessible={false}>
       
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'white'}}>
                <Text style={[styles.header]}> Create Account </Text>

                
                <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                handleIndicatorStyle={{ display: "none" }}
                >   

                  

                    <View style={styles.sheet}>
                    <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false} iconName="account-outline" inputError={usernameError} isValid={isValidUsername}/>
                    <CustomInput placeholder="Email Address" value={email} setValue={setEmail} secureTextEntry={false} keyboardType = 'email-address' iconName="email-outline" inputError={emailError} isValid={isValidEmail}/>
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} iconName="lock-outline" inputError={passwordError} isValid={isValidPassword}/>
                    <CustomInput placeholder="Confirm Password" value={cpassword} setValue={setcPassword} secureTextEntry={true} iconName="lock-outline" inputError={confirmError} isValid={isValidConfirm} textContentType = 'oneTimeCode'/>
                    <CustomInput placeholder="Phone Number" value={phoneNumber} setValue={setPhoneNumber} secureTextEntry={false} keyboardType = 'phone-pad' iconName="phone-outline" inputError={phoneError} isValid={isValidPhone}/>
                   
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
        </ScrollView>
                
      

        
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
        paddingTop: "30%",
        marginBottom: "175%",
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
        borderRadius: 50,
    }
})
export default AccountCreationScreen;
