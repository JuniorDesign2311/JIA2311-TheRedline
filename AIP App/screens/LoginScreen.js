import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Alert} from 'react-native';
import { View, Text, TouchableOpacity, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import firebase from "firebase/app";
import { auth } from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';


const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState(route?.params?.email);
    const [password, setPassword] = useState(route?.params?.password);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    const [hasValidEmail, setHasValidEmail] = useState(true);
    const [hasValidPassword, setHasValidPassword] = useState(true);

    const [loginError, setLoginError] = useState(false);

    var db = firebase.firestore();
    var usersRef = db.collection("users");

    var loginSuccessful;

    const focus = useIsFocused();
    useEffect(() => {
        if (focus) {
        setEmail(route?.params?.email);
        setPassword(route?.params?.password);
        setHasValidEmail(true);
        setHasValidPassword(true);
        setEmailError("");
        setPasswordError("");
        }
    }, [focus]);

    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);

    const validateLogin = () => {
        var noErrors = true;

        if (!email) {
            noErrors = false;
            setEmailError('Email Field is Empty');
            setHasValidEmail(false);

        }
        else if (!email.includes('@')) {
            noErrors = false;
            setEmailError('Invalid Email Address');
            setHasValidEmail(false);
        }
        else if (email.indexOf(' ') >= 0) {
            noErrors = false;
            setEmailError('Email Cannot Contain Spaces');
            setHasValidEmail(false);
        }
        
        if (!password) {
            console.log(password);
            setPasswordError('Password Field is Empty');
            setHasValidPassword(false);
        }
        else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            setHasValidPassword(false);
        }
        else if (password.indexOf(' ') >= 0) {
            setPasswordError('Password Cannot Contain Spaces')
            setHasValidPassword(false);
        }
       

        if (noErrors) {
            handleLogin();
        }
    };

    const handleLogin = () => {
        loginSuccessful = false;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                var user = userCredential.user;
                usersRef.where("emailToLowerCase", "==", email.toLowerCase()).get()
                .then(snapshot => { 
                    if (snapshot.exists) {
                        usersRef.doc(username+phoneNumber).update({"locationTracking": locationTrackingQuestion()});
                    } else {
                        console.log("hit")
                    }
                })
                // usersRef.doc(username+phoneNumber).update({"locationTracking": locationTrackingQuestion()});
                loginSuccessful = true;
                navigation.navigate("Map");
            })
            .catch(error => {
                console.warn(error.message);
                if (!loginSuccessful) {
                    setLoginError("Invalid credentials")
                }
            }
        )
    };

    const locationTrackingQuestion = () => {
        Alert.alert(
            //title
            'Allow "AIP" to access your location while you are using the app?',
            //body
            'Your current location will be displayed on the map and used for directions and nearby search results.',
            [
                { 
                    text: 'Allow While Using App', 
                    onPress: () => console.log('Location being tracked'),
                    return: true },            
                {
                    text: "Don't Allow",
                    onPress: () => console.log('Location NOT being tracked'),
                    style: 'cancel',
                    return: false
                },
            ],
            { cancelable: false }
        );
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate("ResetPassword");   
        setLoginError('');
    }
    
    const onLoginPressed = () => {
        validateLogin();
    };

    const onCreateAccountPressed = () => {
        navigation.navigate("TermsOfService");
        setLoginError('');
    };
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
            <Text style={styles.header}>
            Welcome!
            </Text>


            <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            style={styles.bottomSheetStyle}
            handleIndicatorStyle={{ display: "none" }}
            >
                <View style={styles.sheet}>
                <Text style={styles.error}> {loginError} </Text>
                <CustomInput placeholder="Email Address" value={email} setValue={setEmail} secureTextEntry={false} iconName="email-outline" defaultValue={route?.params?.username} isValid = {hasValidEmail} inputError = {emailError}/>
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} iconName="lock-outline" defaultValue={route?.params?.password} isValid = {hasValidPassword} inputError = {passwordError}/>
                <CustomButton onPress={onLoginPressed} buttonName="Log in" type="PRIMARY"/>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginRight: 25}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey'}} />
                    <View>
                    <Text style={{width: 50, color:'grey', textAlign: 'center', fontFamily: 'Helvetica Neue'}}>or</Text>
                    </View>

                <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey'}} />
                </View>

                <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/>
                <TouchableOpacity
                    onPress={onForgotPasswordPressed}
                    style={{alignItems: 'center', marginTop: 5,}}>
                <Text style = {{fontSize:13, color: '#039be5'}}>
                    Forgot password?
                </Text>
            </TouchableOpacity>
                </View>
            </BottomSheet>
            </View>
        </TouchableWithoutFeedback>

    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        marginBottom: '135%',
        marginRight: '37%',
    },
    error: {
        fontSize: 15,
        fontWeight: 'bold',
        color:'red'
    },
    sheet: {
        alignItems: 'center',
    },
    bottomSheetStyle: {
        borderRadius: 50
    }
  });

export default LoginScreen