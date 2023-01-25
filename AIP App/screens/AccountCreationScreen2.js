import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import AttendeeHostButtons from '../components/AttendeeHostButtons';
import States from '../components/States';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import { useNavigation } from '@react-navigation/native';
import "firebase/firestore";


/*
const isValidEmail = (email) =>
/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email);

const isValidPhoneNumber = (phone) =>
/^(?(\d{3}))?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
*/
const AccountCreationScreen2 = ({ navigation, route }) => {
    /* useState returns the original value argument that's passed in and a function that returns the changed value */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [state, setState] = useState('');
    const [attendeeClicked, setAttendeeClicked] = useState(false);
    const [hostClicked, setHostClicked] = useState(false);
    var db = firebase.firestore();
    var documentId = route.params.docID

    const updateData = () => {
        db.collection("users").doc(documentId).update({
            first: firstName,
            last: lastName,
            state: state,
            host: hostClicked,
            attendee: attendeeClicked
        })
    }

    const onAttendeePressed = () => {
        if (hostClicked)  {
            alert("Please only choose one account type.");
        } else {
            setAttendeeClicked(!attendeeClicked);
        }  
        
        console.log("Attendee Clicked");
    }

    const onHostPressed = () => {
        if (attendeeClicked)  {
            alert("Please only choose one account type.");
        } else {
            setHostClicked(!hostClicked);
        }  
        console.log("Host Clicked");
    }

    const onCreateAccountPressed = () => {
        //Error handling
        var errorMessage = ""

        if (firstName === "" || lastName === ""
            || (!attendeeClicked && !hostClicked) || (attendeeClicked && hostClicked)) {

            // Error message if a field is not filled out
            if (firstName === "" || lastName === "") {
                errorMessage = errorMessage + "Fill out blank field(s).";
            }

            if (!attendeeClicked && !hostClicked) {
                if (errorMessage != "") errorMessage = errorMessage + "\n";
                errorMessage = errorMessage + "Please choose an account type."
            }

            alert(errorMessage);
        } else {
        
            updateData();
            console.warn("Account Created");
            navigation.navigate("AccountCreated");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={[styles.setTitleFont]}> Create Account </Text>

                <CustomInput placeholder="First Name" value={firstName} setValue={setFirstName} secureTextEntry={false} />
                <CustomInput placeholder="Last Name" value={lastName} setValue={setLastName} secureTextEntry={false} />
                <States state={state} setState={setState} />

                <View style={{ flexDirection: "row" }}>
                    <AttendeeHostButtons onPress={onAttendeePressed} buttonClicked={attendeeClicked} buttonName="Attendee" />
                    <AttendeeHostButtons onPress={onHostPressed} buttonClicked={hostClicked} buttonName="Host" />
                </View>

                <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 20 }}>
                    <CustomButton onPress={onCreateAccountPressed} buttonName="Create Account" type="PRIMARY" /></View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    setTitleFont: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 30,
    },
    text: {
        textAlign: "left"
    }
})
export default AccountCreationScreen2