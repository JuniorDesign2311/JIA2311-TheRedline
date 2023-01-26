import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import {password} from '../screens/AccountCreationScreen';
import {email} from '../screens/AccountCreationScreen';


const LoginScreen = ({navigation}) => {

        //const [password, setPassword] = useState('');
        const [apassword, setPassword] = useState({password});
   
   
       // const [email, setEmail] = useState('');
 
        const [aemail, setEmail] = useState({email});
    
    
    const isValidemail = true;
    const isValidPassword = true;

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(aemail, apassword)
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.header}>
            Welcome
            </Text>
            <CustomInput placeholder="Email" value={aemail} setValue={setEmail} secureTextEntry={false}/>
            <Text style={styles.errorMsg}> Email is wrong </Text>
            <CustomInput placeholder="Password" value={apassword} setValue={setPassword} secureTextEntry={true}/>

            <CustomButton onPress={onLoginPressed} buttonName="Log in" type="PRIMARY"/>
            {/* <Text>Don't have an account?</Text> */}

            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginRight: 25}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey'}} />
            <View>
            <Text style={{width: 50, color:'grey', textAlign: 'center', fontFamily: 'Helvetica Neue'}}>or</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'lightgrey'}} />
            </View>

            <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/>
            <TouchableOpacity
                onPress={()=>navigation.navigate("ResetPassword")}
                style={{alignItems: 'center', marginTop: 20,}}
            >
                <Text style = {{fontSize:13, color: '#039be5'}}>
                    Forgot password?
                </Text>
            </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontFamily: 'Helvetica Neue',
        marginBottom: 30,
    },
  });

export default LoginScreen