import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
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


    const onLoginPressed = () => {
        handleLogin();
    }

    const onCreateAccountPressed = () => {
        navigation.navigate("AccountCreation");
    }
    
    return (
        <ScrollView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <TouchableOpacity
                onPress={()=>navigation.navigate("ResetPassword")}
                style={{marginBottom:0, marginRight:150,}}
            >
                <Text style = {{fontSize:13, textDecorationLine: 'underline'}}>
                    Forgot your password?
                </Text>
            </TouchableOpacity>
            <CustomButton onPress={onLoginPressed} buttonName="Login" type="PRIMARY"/>
            {/* <Text>Don't have an account?</Text> */}
            <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/>
        </ScrollView>
    );
}

export default LoginScreen