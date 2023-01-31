import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native'

const PlusButton = ({onPress, buttonName, type = "PRIMARY", color= 'white'}) => {
    const [selected, setSelected] = useState(false);

   if (type === "PRIMARY") {
        return (
        <Pressable 
            style={[styles.container, styles['container_' + type], {backgroundColor: "white"}]}
            onPress={() => {onPress()}}>
                <Text style= {[styles.text, {color: '#e8e8e8'}, {fontSize: 40}]} >{buttonName}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 75

    },

    container_PRIMARY: {
        width: 55,
        height: 55

    },

    container_SECONDARY: {
        width: "45%"
    },

    text:{
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default PlusButton