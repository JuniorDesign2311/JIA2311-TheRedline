import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AttendeeHostButtons from '../components/AttendeeHostButtons';
import {attendeeClicked} from '../components/AttendeeHostButtons';
import {hostClicked} from '../components/AttendeeHostButtons';

import States from '../components/States';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';

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
            user.firstName = firstName;
            user.lastName = lastName;
            user.password = password;
            user.attendee = attendeeClicked;
            user.host = hostClicked;
            user.state = state;
            user.number = phoneNumber;
            console.log(user.firstName, user.lastName, user.state, user.number, user.password, user.email, user.uid, user.attendee, user.host);
            getData();
            navigation.navigate("Login");
        })
        .catch(error => alert(error.message))
    }

    const getData = async () => {
        db.collection("users").add({
            first: firstName,
            last: lastName,
            phoneNumber: phoneNumber,
            username: username,
            state: state,
            email: email,
            host: hostClicked,
            attendee: attendeeClicked
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    const onAttendeePressed = () => {
        console.log("Attendee Selected"); 
        
    }

    const onHostPressed = () => {
       console.log("Host Selected");
      
    }

    const onCreateAccountPressed = () => {
        //Error handling
        if (username === "" || email === "" || password === "" || cpassword === "" || firstName === "" || lastName === "" || phoneNumber === ""
            || (!attendeeClicked && !hostClicked) || (attendeeClicked && hostClicked) || password != cpassword) {

            var errorMessage = "Error:"

            if (username === "" || email === "" || password === "" || cpassword === "" || firstName === "" || lastName === "" || phoneNumber === "" || (attendeeClicked && hostClicked)) {
                errorMessage = errorMessage + "\nFill out blank field(s)";
            }

            if (!attendeeClicked && !hostClicked) {
                errorMessage = errorMessage + "\nPlease only select 1 account type";
            }

            if (password != cpassword) {
                errorMessage = errorMessage + "\nPasswords do not match";
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