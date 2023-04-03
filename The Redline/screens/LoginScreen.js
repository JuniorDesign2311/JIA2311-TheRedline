import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Alert} from 'react-native';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';

const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState(route?.params?.email);
    const [password, setPassword] = useState(route?.params?.password);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasValidEmail, setHasValidEmail] = useState(true);
    const [hasValidPassword, setHasValidPassword] = useState(true);
    const [loginError, setLoginError] = useState(false);
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
        else {
            setEmailError('');
            setHasValidEmail(true);
        }

        if (!password) {
            noErrors = false;
            setPasswordError('Password Field is Empty');
            setHasValidPassword(false);
        }
        else if (password.length < 6) {
            noErrors = false;
            setPasswordError('Password must be at least 6 characters');
            setHasValidPassword(false);
        }
        else if (password.indexOf(' ') >= 0) {
            noErrors = false;
            setPasswordError('Password Cannot Contain Spaces')
            setHasValidPassword(false);
        }
        else {
            setPasswordError('');
            setHasValidPassword(true);
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
                loginSuccessful = true;
                getPermissions();
            })
            .catch(error => {
                if (!loginSuccessful) {
                    setLoginError("Invalid credentials")
                }
            }
        )
    };

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied. Please update in Settings.');

            navigation.navigate("BottomTabs", {
                screen: 'Map',
                params: {
                    long: -122.43, 
                    lat: 37.77,
                    trackLocation: false,
                }
            });

            return;
        }

        getLocation();
    };

    const getLocation = async() => {
        let currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Low,
        });
        longitude = currentLocation.coords.longitude;
        latitude = currentLocation.coords.latitude;

        navigation.navigate("BottomTabs", {
            screen: 'Map',
            params: {
                long: longitude, 
                lat: latitude,
                trackLocation: true,
            }
        });
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate("ResetPassword");
        setLoginError('');
    }

    const onLoginPressed = () => {
        Keyboard.dismiss();
        validateLogin();
    };

    const onCreateAccountPressed = () => {
        navigation.navigate("TermsOfService");
        setLoginError('');
    };

    return (
        <KeyboardAvoidingWrapper>
            <View style={GlobalStyles.viewStyle}>
                <Text style={GlobalStyles.header}> Welcome! </Text>
                <BottomSheet
                    ref={sheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    style={GlobalStyles.bottomSheet}
                    handleIndicatorStyle={{ display: "none" }}
                >
                    <View style={GlobalStyles.sheet}>
                        <Text style={GlobalStyles.error}> {loginError} </Text>
                        <CustomInput placeholder="Email Address" value={email} setValue={setEmail} secureTextEntry={false} iconName="email-outline" defaultValue={route?.params?.username} isValid = {hasValidEmail} inputError = {emailError}/>
                        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} iconName="lock-outline" defaultValue={route?.params?.password} isValid = {hasValidPassword} inputError = {passwordError}/>
                        <CustomButton onPress={onLoginPressed} buttonName="Log in" type="PRIMARY"/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginRight: 25}}>
                            <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey'}} />
                                <View>
                                    <Text style={{width: 50, color:'grey', textAlign: 'center', fontFamily: 'Helvetica Neue'}}> or </Text>
                                </View>
                            <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey'}} />
                        </View>
                        <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/>
                        <TouchableOpacity
                            onPress={onForgotPasswordPressed}
                            style={{ alignItems: 'center', marginTop: 5, }}
                        >
                            <Text style = {GlobalStyles.blueText}> Forgot password? </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
        </KeyboardAvoidingWrapper>
    )
};

export default LoginScreen
