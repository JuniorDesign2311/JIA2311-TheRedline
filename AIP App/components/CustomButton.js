import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native'

const CustomButton = ({onPress, buttonName, type = "PRIMARY", color= 'white'}) => {
    const [selected, setSelected] = useState(false);

   if (type === "PRIMARY") {
        return (
        <Pressable 
            style={[styles.container, styles['container_' + type], {backgroundColor: "white"}]}
            onPress={() => {onPress()}}>
                <Text style= {[styles.text, {color: "black"}]} >{buttonName}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10

    },

    container_PRIMARY: {
        width: "90%",

    },

    container_SECONDARY: {
        width: "45%"
    },

    text:{
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default CustomButton