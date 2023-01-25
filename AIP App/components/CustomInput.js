import React from 'react'
import {View, Text, TextInput, StyleSheet } from 'react-native'

/* CustomInput is the stlye of each input field */
const CustomInput = ({value, setValue, placeholder, secureTextEntry, keyboardType = "default"}) => {
    return (
        <View style={styles.container}>
            <Text> {placeholder} </Text>
            <View style={styles.textField}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                style={styles.input} placeholder={placeholder}
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

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
        
    },
    container:{
        width: '90%',
        marginVertical: 5,
    }
})
export default CustomInput