import React, {useState, useEffect, useMemo} from 'react'
import { View, Text,  StyleSheet, TouchableOpacity} from 'react-native'
import CustomButton from '../components/CustomButton';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';
import firebase from "firebase/app";

const ProfileScreen = ({navigation, route}) => {
    const [username, setUsername] = useState('');

    const user = firebase.auth().currentUser;

    useEffect(() => {
        firebase.firestore().collection("hosts").doc(user.uid).get().then((snapshot) => {
            console.log(snapshot.data());
            if (snapshot.exists) {
                const userData = snapshot.data();
                setUsername(userData["username"].toString())
            } else {
                firebase.firestore().collection("attendees").doc(user.uid).get().then((snapshot) => {
                    if (snapshot.exists) {
                        const userData = snapshot.data();
                        setUsername(userData["username"].toString())
                    }
                })
            }
        })
    }, []);

    const onSettingsPressed = () => {
        navigation.navigate("Settings");
    }

    const onSignOutPressed = () => {
        navigation.navigate("Login");
    }

    return (
        <KeyboardAvoidingWrapper>
        <View style={GlobalStyles.viewStyle}>
            <Text style={[GlobalStyles.header]}> {username} </Text>
            <CustomButton onPress={onSettingsPressed} buttonName="Settings" type="PRIMARY"/>
            <CustomButton onPress={onSignOutPressed} buttonName="Sign Out" type="PRIMARY"/>
        </View>
        </KeyboardAvoidingWrapper>
    )
}

export default ProfileScreen
