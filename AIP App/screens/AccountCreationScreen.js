import React, {useState} from 'react'
import { getAuth } from 'firebase/auth';
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import States from '../components/States';
// import { auth } from '../firebaseConfig';
// import { createUserWithEmailAndPassword } from "firebase/auth";

const AccountCreationScreen = ({navigation}) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [state, setState] = useState('');

/*
    const isValidEmail = (email) =>
    /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email);
  
    const isValidPhoneNumber = (phone) =>
    /^(?(\d{3}))?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
*/
    const onAttendeePressed = () => {
        console.warn("Attendee Selected");
        
    }

    const onHostPressed = () => {
        console.warn("Host Selected");

    }

    const onCreateAccountPressed = () => {
        console.warn("Account Created");
        if (username === "") {
            alert("Username field is Required.")
        } else if (email === "") {
            alert("Email field is required.")
        } else if (password === "") {
            alert("Password field is required.")
        } else if (cpassword === "") {
            alert("Please confirm your password.")
        } else if (firstName === "") {
            alert("First name field is required.")
        } else if (lastName === "") {
            alert("Last name field is required.")
        } else if (phoneNumber === "") {
            alert("Phone number field is required.")
        } else {
            navigation.navigate("Map");
        }
    }

    return (
        <ScrollView>
        <View style={styles.root}> 
            <Text style={[styles.setTitleFont]}> Create Account </Text>
        
            <CustomInput placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false}/>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomInput placeholder="Confirm Password" value={cpassword} setValue={setcPassword} secureTextEntry={true}/>
            <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} secureTextEntry={false}/>
            <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} secureTextEntry={false}/>
            <CustomInput placeholder="Phone Number" value={phoneNumber} setValue={setPhoneNumber} secureTextEntry={false}/>
            <States state={state} setState={setState}/>

            <View style={{flexDirection: "row"}}>
                <CustomButton onPress={onAttendeePressed} buttonName="Attendee" type = "SECONDARY"/>
                <CustomButton onPress={onHostPressed} buttonName="Host" type = "SECONDARY"/>
            </View>

            <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    setTitleFont: {
        fontSize: 25
    }
})
export default AccountCreationScreen