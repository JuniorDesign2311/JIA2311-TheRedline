import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native'

const TOSButton = ({onPress, buttonName, type = "PRIMARY", color= 'white'}) => {
    const [selected, setSelected] = useState(false);

   if (type === "PRIMARY") {
        return (
        <Pressable 
            style={[styles.container, styles['container_' + type], {backgroundColor: "white"}]}
            onPress={() => {onPress()}}>
                <Text style= {[styles.text, {color: "black"}, {fontSize: 16}]} >{buttonName}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 15,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        marginLeft: 5,
        marginRight: 5,

    },

    container_PRIMARY: {
        width: "40%",

    },

    container_SECONDARY: {
        width: "45%"
    },

    text:{
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default TOSButton