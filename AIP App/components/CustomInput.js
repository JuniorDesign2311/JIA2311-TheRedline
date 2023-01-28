import React from 'react'
import {View, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

/* CustomInput is the stlye of each input field */
const CustomInput = ({value, setValue, placeholder, secureTextEntry, iconName, keyboardType = "default"}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textField}>
                <Icon name = { iconName } style={{fontSize: 22, marginRight: 5}}/>
            <TextInput 
                value={value}
                autoCorrect={false}
                onChangeText={setValue}
                style={{flex: 1}}
                placeholder={placeholder}
                placeholderTextColor= "#D3D3D3"
                secureTextEntry = {secureTextEntry}
                keyboardType = {keyboardType} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    /*"textField" refers to the actual box that the inputs are going to be written in*/ 
    textField:{
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
        
    },
    container:{
        width: '90%'
    }
})
export default CustomInput