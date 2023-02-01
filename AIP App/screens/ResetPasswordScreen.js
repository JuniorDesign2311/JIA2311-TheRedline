import React, {useState, useRef, useMemo} from 'react'
import { View, Text, TouchableOpacity, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import ResetPasswordInput from '../components/ResetPasswordInput';
import CustomButton from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomInput from '../components/CustomInput';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    const [hasValidEmail, setHasValidEmail] = useState(true);

    const validateEmail = () => {
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
                handleIndicatorStyle={{ display: "none" }}
                >
                    <View style={styles.sheet}>
                <Text style = {{fontSize:14, textAlign: 'center', color: 'grey', marginRight:15, marginLeft:15, marginBottom:5, textAlign: 'center'}}>
                    Please enter the email address you'd like your password reset information to be sent to.
                </Text>
                    <CustomInput placeholder="Enter Email Address" value={email} setValue={setEmail} secureTextEntry={false} iconName="email-outline" isValid = {hasValidEmail} inputError = {emailError}/>
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
        marginBottom: 600
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
  });


export default LoginScreen