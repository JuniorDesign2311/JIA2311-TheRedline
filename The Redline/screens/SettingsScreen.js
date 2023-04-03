import React from 'react'
import { View, Text } from 'react-native'
import CustomButton from '../components/CustomButton';
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
        <View style={GlobalStyles.viewStyle}>
            <Text>Settings</Text>
            <CustomButton onPress={onBackPressed} buttonName="Back" type="PRIMARY"/>
            <CustomButton onPress={onSignOutPressed} buttonName="Sign Out" type="PRIMARY"/>
        </View>
    )
}

export default SettingsScreen
