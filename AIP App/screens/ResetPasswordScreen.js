import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
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
            alert("Email field is empty")
        } else {
            handlePasswordReset();
        }
    }

    const onCancelPressed = () => {
        navigation.navigate("Login");
    }
    
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
                onPress={onCancelPressed}
                style={{marginRight:15, marginLeft:15, marginBottom:20, textAlign: 'center'}}
            >
                <Text style = {{fontSize:14}}>
                    Please enter the email address you'd like your password reset information to be sent to.
                </Text>
            </TouchableOpacity>
            <ResetPasswordInput placeholder="Enter email address" value={email} setValue={setEmail} secureTextEntry={false}/>
            {/* <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/> */}
            <RequestLinkButton onPress={SendLinkPressed} buttonName="Request Reset Link" type="PRIMARY"/>
            {/* <Button onPress={SendLinkPressed} title="Send Reset Link" color='black' borderColor='black' borderRadius/> */}
            <TouchableOpacity
                onPress={onCancelPressed}
                style={{marginTop:0,}}
            >
                <Text style = {{fontSize:16, textDecorationLine: 'underline'}}>
                    Back To Login
                </Text>
            </TouchableOpacity>
            {/* <Button onPress={onCancelPressed} title="Cancel" color='black' borderColor='black' borderRadius/> */}
            {/* <TouchableOpacity
                onPress={()=>navigation.navigate("AccountCreation")}
                style={{marginTop:0,}}
            >
                <Text style = {{fontSize:16}}>
                    Reset Password
                </Text>
            </TouchableOpacity> */}
            {/* <Text>Don't have an account?</Text> */}
        </View>
    );
}

export default LoginScreen