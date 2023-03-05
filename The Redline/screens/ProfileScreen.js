import React, {useState, useEffect, useMemo} from 'react'
import { View, Text,  Image, TouchableOpacity} from 'react-native'
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

    return (
        <KeyboardAvoidingWrapper>
            <View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                    <Text style={{paddingTop: '10%', paddingLeft: '2%', fontWeight: 'bold', fontSize: 35, textAlign: 'left',
                        fontFamily: 'Helvetica Neue'}}> {username} </Text>
                    <TouchableOpacity
                        onPress={onSettingsPressed}
                        style={{ paddingTop: '9%', alignSelf: 'flex-start', paddingRight: '2%'}}
                    >
                        <Image source={require('../assets/settings-icon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingWrapper>
    )
}

export default ProfileScreen
