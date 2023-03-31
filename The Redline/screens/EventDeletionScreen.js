import React, {useState} from 'react'
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import EmptyInputBox from '../components/EmptyInputBox';
import EventDescriptionInput from '../components/EventDescriptionInput';
import { db } from '../firebaseConfig';
import firebase from "firebase/app";
import uuid from 'react-native-uuid';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';


const EventDeletionScreen = ({ route, navigation }) => {
    const { dataId } = route.params;

    const onBackPressed = () => {
        navigation.navigate("EditEvents", {
            dataId: dataId
        })
    }

    const onDeleteEventPressed = () => {
        navigation.navigate("Profile")
    }

    return (
        <View style={GlobalStyles.viewStyle}>
            <Text>Event Deletion Screen</Text>
            <CustomButton onPress={onDeleteEventPressed} buttonName="Delete Event" type="PRIMARY"/>
            <CustomButton onPress={onBackPressed} buttonName="Back" type="PRIMARY"/>
        </View>
    )
}

export default EventDeletionScreen;