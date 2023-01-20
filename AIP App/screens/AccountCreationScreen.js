import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AttendeeHostButtons from '../components/AttendeeHostButtons';
import {attendeeClicked} from '../components/AttendeeHostButtons';
import {hostClicked} from '../components/AttendeeHostButtons';

import States from '../components/States';
import { auth } from '../firebaseConfig';
import * as firebase from "firebase";

/*
const isValidEmail = (email) =>
/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email);

const isValidPhoneNumber = (phone) =>
/^(?(\d{3}))?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
*/
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
    
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Signed in 
                const user = userCredential.user;
                // user.updateFirstName(firstName);
                user.firstName = firstName;
                user.lastName = lastName;
                user.password = password;
                user.state = state;
                // console.log(phoneNumber);
                user.number = phoneNumber;
                // user.setPhoneNumber(phoneNumber);
                console.log(user.firstName, user.lastName, user.state, user.number, user.password, user.email, user.uid);
                navigation.navigate("Map");
            })
            .catch(error => alert(error.message))
    }


    const onAttendeePressed = () => {
        console.warn("Attendee Selected"); 
        
    }

    const onHostPressed = () => {
       console.warn("Host Selected");
      
    }

    const onCreateAccountPressed = () => {
        var errorMessage = "Error:"

        if (username === "" || email === "" || password === "" || cpassword === "" || firstName === "" || lastName === "" || phoneNumber === ""
            || (!attendeeClicked && !hostClicked) || (attendeeClicked && hostClicked) || password != cpassword) {

            if (username === "" || email === "" || password === "" || cpassword === "" || firstName === "" || lastName === "" || phoneNumber === "" || (!attendeeClicked && !hostClicked)) {
                errorMessage = errorMessage + "\nFill out blank field(s)";
            }

            if (attendeeClicked && hostClicked) {
                errorMessage = errorMessage + ("\nPlease only select 1 account type");
            }

            if (password != cpassword) {
                errorMessage = errorMessage + ("\nPassword and confirmation do not match");
            }

            alert(errorMessage);
        } else {
            handleSignUp();
            console.warn("Account Created");
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
                
                    <AttendeeHostButtons onPress={onAttendeePressed} buttonName="Attendee"/>
                    <AttendeeHostButtons onPress={onHostPressed} buttonName="Host"/>
                </View>

                <View style={{flexDirection:"row", marginBottom:50 }}>
                    <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY"/></View>
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
    },
    text: {
        textAlign: "left"
    }
})
export default AccountCreationScreen