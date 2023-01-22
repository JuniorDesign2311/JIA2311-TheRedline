import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native'

const RequestLinkButton = ({onPress, buttonName, type = "PRIMARY", color= 'gray'}) => {
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
        backgroundColor: 'gray',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 25,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10

    },


    container_PRIMARY: {
        width: "85%",
        height: "7%",
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },

    container_SECONDARY: {
        width: "45%"
    },

    text:{
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default RequestLinkButton