import React, {useState, useRef, useMemo, useEffect} from 'react';
import { View, Text, TouchableOpacity, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

//import {password} from '../screens/AccountCreationScreen';
//import {email} from '../screens/AccountCreationScreen';
 
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, { AnimatedLayout, SlideInRight, FadeInLeft, FadeInDown} from 'react-native-reanimated';
    
    
    const isValidemail = true;
    const isValidPassword = true;

const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState(route?.params?.email);
    const [password, setPassword] = useState(route?.params?.password);
    const [loginError, setLoginError] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const focus = useIsFocused();
    useEffect(() => {
        if (focus) {
        setEmail(route?.params?.email);
        setPassword(route?.params?.password);
        }
    }, [focus]);
    
    // const [apassword, setPassword] = useState({password});
    // const [aemail, setEmail] = useState({email});

    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    
    const validateLogin = () => {
        if (!email) {
            setLoginError('Email Field is Empty')
        }
        else if (!email.includes('@')) {
            setLoginError('Invalid Email Address');
        }
        else if (email.indexOf(' ') >= 0) {
            setLoginError('Email Cannot Contain Spaces')
        }
        else if (password.length === 0) {
            console.log(password);
            setLoginError('Password Field is Empty')
        }
        else if (password.length < 6) {
            setLoginError('Password must be at least 6 characters');
        }
        else if (password.indexOf(' ') >= 0) {
            setLoginError('Password Cannot Contain Spaces')
        }
        else {
            setLoginError('');
            handleLogin();
        }
    }

    const handleLogin = () => {
        var loginSuccessful = false;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                var user = userCredential.user;
                loginSuccessful = true;
                setLoginError('');
                navigation.navigate("Map");
            })
            .catch(error => {
                console.warn(error.message);
                if (!loginSuccessful) {
                    setLoginError("Invalid credentials.")
                }
            }
        )
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate("ResetPassword");   
        setLoginError('');
    }


    const onLoginPressed = () => {
        validateLogin();
    }

    const onCreateAccountPressed = () => {
        navigation.navigate("TermsOfService");
        setLoginError('');
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: '#d796fa'}}>
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
                <Animated.View style={styles.sheet}>
                <Text style={styles.error}> {loginError} </Text>
                <CustomInput placeholder="Email Address" value={email} setValue={setEmail} secureTextEntry={false} iconName="email-outline" defaultValue={route?.params?.username}/>
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} iconName="lock-outline" defaultValue={route?.params?.password}/>
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
                </Animated.View>
            </BottomSheet>
            </View>
        </TouchableWithoutFeedback>

    )
}

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