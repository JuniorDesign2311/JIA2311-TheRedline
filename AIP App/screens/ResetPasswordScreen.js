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
    const [password, setPassword] = useState('');
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '80%', '80%' ]);

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            var user = userCredential.user;
            navigation.navigate("Map");
        })
        .catch(error => alert(error.message))
    }

    const handlePasswordReset = async () => {
        auth.sendPasswordResetEmail(email)
        .then(userCredential => {
            console.log("Email sent")
        })
        .catch(error => alert(error.message))
      }


    const SendLinkPressed = () => {
        if (email === "") {
            alert("Please enter your email address")
        } else {
            handlePasswordReset();
            alert("A reset link has been sent to your email")
        }
    }

    const onCancelPressed = () => {
        navigation.navigate("Login");
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