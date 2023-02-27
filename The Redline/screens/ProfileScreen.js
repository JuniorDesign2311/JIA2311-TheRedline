import React, {useState, useRef, useMemo} from 'react'
import { View, Text,  StyleSheet, TouchableOpacity} from 'react-native'
import CustomButton from '../components/CustomButton';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';

const ProfileScreen = ({navigation, route}) => {
    const onSettingsPressed = () => {
        navigation.navigate("Settings");
    }

    return (
        <KeyboardAvoidingWrapper>
        <View style={GlobalStyles.viewStyle}>
            <Text style={[GlobalStyles.header]}> Profile </Text>
            <CustomButton onPress={onSettingsPressed} buttonName="Settings" type="PRIMARY"/>
        </View>
        </KeyboardAvoidingWrapper>
    )
}

export default ProfileScreen
