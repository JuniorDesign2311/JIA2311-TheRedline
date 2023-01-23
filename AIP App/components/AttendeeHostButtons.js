import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

var attendeeClicked = false;
var hostClicked = false;
const AttendeeHostButtons = ({onPress, buttonName}) => {
    const [selected, setSelected] = useState(false);
    
    return (
        <TouchableOpacity 
        style={[styles.container, {backgroundColor: selected && (hostClicked ^ attendeeClicked) ? "black": "white"}]}
        onPress={() => {
            if (!hostClicked && !attendeeClicked) {
                setSelected(!selected);
                if (buttonName === "Host") {
                    hostClicked = !hostClicked;
                } else if (buttonName === "Attendee") {
                    attendeeClicked = !attendeeClicked;
                }
                {onPress()};
            }
            
            //{!selected && onPress()};
        }}>
            <Text style= {[styles.text, {color: selected ? "white": "black"}]} >{buttonName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: "45%",

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10

    },

    text:{
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default AttendeeHostButtons
export {attendeeClicked}
export {hostClicked}
