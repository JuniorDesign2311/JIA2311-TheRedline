import React from 'react'
import {View, Text, TextInput, StyleSheet } from 'react-native'

/* CustomInput is the stlye of each input field */
const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                style={styles.input} placeholder={placeholder}
                placeholderTextColor= "#D3D3D3"
                secureTextEntry = {secureTextEntry} />
        </View>
    )
}

const styles = StyleSheet.create({
    /*"container" refers to the actual box that the inputs are going to be written in*/ 
    container:{
        backgroundColor: 'white',
        width: '90%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
        
    },
    input:{
    }
})
export default CustomInput