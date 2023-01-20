import React, {useState} from 'react'
import { View, Text } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
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
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>

            <CustomButton onPress={onLoginPressed} buttonName="Login" type="PRIMARY"/>

            <Text>Don't have an account?</Text>
            <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/>
        </View>
    );
}

export default LoginScreen