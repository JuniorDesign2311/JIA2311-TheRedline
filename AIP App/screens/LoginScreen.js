import React, {useState, useRef, useMemo} from 'react'
import { View, Text, TouchableOpacity, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import BottomSheet from '@gorhom/bottom-sheet';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    
    const validateEmail = () => {
        if (email.length === 0) {
            setEmailError('Email Field is Empty')
        }
        else if (!email.includes('@')) {
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
        else {
            setPasswordError('');
        }
    }

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            var user = userCredential.user;
            setEmailError('');
            setPasswordError('');
            navigation.navigate("Map");
        })
        .catch(error => console.warn(error.message))
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate("ResetPassword");   
        setEmailError('');
        setPasswordError('');
    }


    const onLoginPressed = () => {
        validateEmail();
        validatePassword();
        handleLogin();
    }

    const onCreateAccountPressed = () => {
        navigation.navigate("AccountCreation");
        setEmailError('');
        setPasswordError('');
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: '#d796fa'}}>
            <Text style={styles.header}>
            Welcome
            </Text>

            <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            style={styles.bottomSheetStyle}
            handleIndicatorStyle={{ display: "none" }}
            >
                <View style={styles.sheet}>
                <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false}/>
                <Text style={styles.error}> {emailError} </Text>
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
                <Text style={styles.error}> {passwordError} </Text>
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
                    style={{alignItems: 'center', marginTop: 20,}}
                >
                    <Text style = {{fontSize:13, color: '#039be5'}}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
                </View>
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
        paddingTop: 50,
        marginBottom: 650,
        marginRight: 170
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
  });

export default LoginScreen