import React, {useState} from 'react'
import { View, Text } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const onLoginPressed = () => {
        navigation.navigate("Map");
    }

    const onCreateAccountPressed = () => {
        navigation.navigate("AccountCreation");
    }
    
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>

            <CustomButton onPress={onLoginPressed} buttonName="Login" type="PRIMARY"/>

            <Text>Don't have an account?</Text>
            <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/>
        </View>
    );
}

export default LoginScreen