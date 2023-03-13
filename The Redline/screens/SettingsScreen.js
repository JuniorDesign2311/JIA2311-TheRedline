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

    return (
        <KeyboardAvoidingWrapper>
            <View style={GlobalStyles.viewStyle}>
                <Text>Settings</Text>
                <CustomButton onPress={onBackPressed} buttonName="Account Settings" type="PRIMARY"/>
                <CustomButton onPress={onBackPressed} buttonName="Back" type="PRIMARY"/>
                <CustomButton onPress={onSignOutPressed} buttonName="Sign Out" type="PRIMARY"/>
            </View>
        </KeyboardAvoidingWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SettingsScreen
