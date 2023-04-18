import React from 'react'
import { View, Text,  Image, TouchableOpacity} from 'react-native'
import CustomButton from '../components/CustomButton';
import GlobalStyles from '../components/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import {setGlobalState, useGlobalState } from "../global_variables/GlobalVariables"

const IconSelectionScreen = ({navigation, route}) => {   
     
    const iconPath = useGlobalState("iconPath")[0];
    
    const iconMonopolyPressed = () => {
        setGlobalState("iconPath", "monopoly");
        navigation.navigate("BottomTabs", {
            screen: 'Profile',
            params: {
                iconPath: iconPath,
            }
        });
    } 

    const iconSpongeBobPressed = () => {
        setGlobalState("iconPath", "spongebob");
        navigation.navigate("BottomTabs", {
            screen: 'Profile',
            params: {
                iconPath: iconPath,
            }
        });
    } 

    const iconBatmanPressed = () => {
        setGlobalState("iconPath", "batman");
        navigation.navigate("BottomTabs", {
            screen: 'Profile',
            params: {
                iconPath: iconPath,
            }
        });
    } 

    const iconDefaultPressed = () => {
        setGlobalState("iconPath", "default");
        navigation.navigate("BottomTabs", {
            screen: 'Profile',
            params: {
                iconPath: iconPath,
            }
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
