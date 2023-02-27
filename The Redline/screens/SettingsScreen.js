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

    return (
        <KeyboardAvoidingWrapper>
            <View style={GlobalStyles.viewStyle}>
                <Text>Settings</Text>
                <CustomButton onPress={onBackPressed} buttonName="Back" type="PRIMARY"/>
            </View>
        </KeyboardAvoidingWrapper>
    )
}

export default SettingsScreen
