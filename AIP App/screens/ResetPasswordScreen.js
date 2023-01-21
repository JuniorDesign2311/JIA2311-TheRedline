import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomButton';
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
            <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false}/>
            {/* <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/> */}
            <Button onPress={SendLinkPressed} title="Send Reset Link" color='black' borderColor='black' borderRadius/>
            <Button onPress={onCancelPressed} title="Cancel" color='black' borderColor='black' borderRadius/>
            {/* <TouchableOpacity
                onPress={()=>navigation.navigate("AccountCreation")}
                style={{marginTop:0,}}
            >
                <Text style = {{fontSize:16}}>
                    Reset Password
                </Text>
            </TouchableOpacity> */}
            {/* <Text>Don't have an account?</Text> */}
            {/* <CustomButton onPress={onCancelPressed} buttonName="Create Account" type="PRIMARY"/> */}
        </View>
    );
}

export default LoginScreen