import React, {useState, useRef, useMemo} from 'react'
import { View, Text,  StyleSheet, TouchableOpacity} from 'react-native'
import CustomButton from '../components/CustomButton';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';

const SettingsScreen = ({navigation, route}) => {
    const onBackPressed = () => {
        navigation.navigate("BottomTabs", {
            screen: 'Profile'
        });
    }

    const onSignOutPressed = () => {
        navigation.navigate("Login");
    }

    const onIconChangePressed = () => {
        navigation.navigate("IconSelection");  
    }

    return (
        <View style={GlobalStyles.viewStyle}>
            <Text style={{fontWeight: 'bold', fontSize: 35, textAlign: 'center',
                            fontFamily: 'Helvetica Neue'}}>Settings</Text>
            <CustomButton onPress={onIconChangePressed} buttonName="Change Icon" type="PRIMARY"/>
            <CustomButton onPress={onBackPressed} buttonName="Back" type="PRIMARY"/>
            <CustomButton onPress={onSignOutPressed} buttonName="Sign Out" type="PRIMARY"/>
        </View>
    )
}

export default SettingsScreen
