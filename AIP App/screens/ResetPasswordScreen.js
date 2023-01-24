import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import ResetPasswordInput from '../components/ResetPasswordInput';
import RequestLinkButton from '../components/RequestLinkButton';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.header}>
            Reset Password
            </Text>
                <Text style = {{fontSize:14, textAlign: 'center', color: 'grey', marginRight:15, marginLeft:15, marginBottom:20, textAlign: 'center'}}>
                    Please enter the email address you'd like your password reset information to be sent to.
                </Text>
            <ResetPasswordInput placeholder="Enter email address" value={email} setValue={setEmail} secureTextEntry={false}/>
            <RequestLinkButton onPress={SendLinkPressed} buttonName="Request Reset Link" type="PRIMARY"/>
            <TouchableOpacity
                onPress={onCancelPressed}
                style={{marginTop:0,}}
            >
                <Text style = {{fontSize:13, marginTop: 30,  color: '#039be5'}}>
                    Back To Login
                </Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontFamily: 'Helvetica Neue',
        marginBottom: 15,
    },
  });


export default LoginScreen