import React, {useState, useRef, useMemo} from 'react'
import { View, Text,  Image, StyleSheet, TouchableOpacity} from 'react-native'
import CustomButton from '../components/CustomButton';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import GlobalStyles from '../components/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';

const IconSelectionScreen = ({navigation, route}) => {    
    const iconMonopolyPressed = () => {

        navigation.navigate("BottomTabs", {
            screen: 'Profile',
            params: {
                iconPath: 'monopoly',
            }
        });
    } 

    const iconSpongeBobPressed = () => {
        navigation.navigate("BottomTabs", {
            screen: 'Profile'
        });
    } 

    const iconBatmanPressed = () => {
        navigation.navigate("BottomTabs", {
            screen: 'Profile'
        });
    } 

    const iconDefaultPressed = () => {
        navigation.navigate("BottomTabs", {
            screen: 'Profile'
        });
    } 

    const onBackPressed = () => {
        navigation.navigate("Settings");
    }

    return (
        <View style={GlobalStyles.viewStyle}>
            <ScrollView>
                <Text style={{paddingTop: '20%', fontWeight: 'bold', fontSize: 35, textAlign: 'center',
                                fontFamily: 'Helvetica Neue'}}>Icons</Text>

                <View>
                    <TouchableOpacity 
                        onPress={iconMonopolyPressed}>
                        <Image source={require('../assets/monopoly_car.png')} />   
                    </TouchableOpacity>    

                    <TouchableOpacity
                        onPress={iconSpongeBobPressed}>
                        <Image source={require('../assets/spongebob_car.png')} />  
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={iconBatmanPressed}>
                        <Image source={require('../assets/batmobile_car.png')} />  
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={iconDefaultPressed}>
                        <Image source={require('../assets/account-icon.png')} />  
                    </TouchableOpacity>
                </View>

                <CustomButton onPress={onBackPressed} buttonName="Back" type="PRIMARY"/>

            </ScrollView>
        </View>
    )
}

export default IconSelectionScreen
