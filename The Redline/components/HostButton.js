import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const HostButton = ({onPress, buttonClicked, buttonName, hasError}) => {
    
    return (
        <TouchableOpacity 
        style={[styles.container, {borderColor: hasError ? "red": "#e8e8e8"}, {backgroundColor: buttonClicked ? "black": "white"}]}
        onPress={() => { 
            {onPress()};
        }}>
            <Text style= {[styles.text, {color: buttonClicked ? "white": "black"}]} >{buttonName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: "45%",

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10

    },

    text:{
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default HostButton

