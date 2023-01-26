import React, {useState, useRef, useMemo} from 'react'
import { View, Text, TouchableOpacity, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import ResetPasswordInput from '../components/ResetPasswordInput';
import RequestLinkButton from '../components/RequestLinkButton';
import CustomButton from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import BottomSheet from '@gorhom/bottom-sheet';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '80%', '80%' ]);

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

    const handlePasswordReset = async () => {
        auth.sendPasswordResetEmail(email)
        .then(userCredential => {
            console.log("Email sent")
            navigation.navigate("Login");
        })
        .catch(error => console.warn(error.message))
      }


    const SendLinkPressed = () => {
        validateEmail();
        if (emailError === '') {
            handlePasswordReset();
            console.warn("A reset link has been sent to your email")
        } else {
            validateEmail();
        }
    }

    const onCancelPressed = () => {
        navigation.navigate("Login");
        setEmailError('');
    }
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#d796fa'}}>
            <Text style={styles.header}>
            Reset Password
            </Text>
                <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                style={styles.bottomSheetStyle}
                >
                    <View style={styles.sheet}>
                <Text style = {{fontSize:14, textAlign: 'center', color: 'grey', marginRight:15, marginLeft:15, marginBottom:20, textAlign: 'center'}}>
                    Please enter the email address you'd like your password reset information to be sent to.
                </Text>
                    <ResetPasswordInput placeholder="Enter email address" value={email} setValue={setEmail} secureTextEntry={false}/>
                <Text style={styles.error}> {emailError} </Text>
                    <CustomButton onPress={SendLinkPressed} buttonName="Request Reset Link" type="PRIMARY"/>
                    <TouchableOpacity
                        onPress={onCancelPressed}
                    >
                        <Text style = {{fontSize:13, marginTop: 0,  color: '#039be5'}}>
                            Back To Login
                        </Text>
                    </TouchableOpacity>
                    </View>
                </BottomSheet>
        </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        paddingTop: 50,
        marginBottom: 650
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