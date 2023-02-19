import React, {useState, useRef, useMemo} from 'react'
import { View, Text, TouchableOpacity, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import CustomButton from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomInput from '../components/CustomInput';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import GlobalStyles from '../components/GlobalStyles';

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
        <KeyboardAvoidingWrapper>
            <View style={GlobalStyles.viewStyle}>
                <Text style={GlobalStyles.header2}> Reset Password </Text>
                <BottomSheet
                    ref={sheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    style={GlobalStyles.bottomSheet}
                    handleIndicatorStyle={{ display: "none" }}
                >
                    <View style={GlobalStyles.sheet}>
                        <Text style = {styles.text}>
                            Please enter the email address you'd like your password reset information to be sent to.
                        </Text>
                        <CustomInput placeholder="Enter Email Address" value={email} setValue={setEmail} secureTextEntry={false} iconName="email-outline" isValid = {hasValidEmail} inputError = {emailError}/>
                        <CustomButton onPress={SendLinkPressed} buttonName="Request Reset Link" type="PRIMARY"/>
                        <TouchableOpacity onPress={onCancelPressed}>
                            <Text style = {GlobalStyles.blueText}> Back To Login </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
        </KeyboardAvoidingWrapper>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: 'grey',
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 5,
        textAlign: 'center'
    }
});

export default LoginScreen