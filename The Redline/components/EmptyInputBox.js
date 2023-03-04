import React from 'react'
import {View, Text, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

/* CustomInput is the stlye of each input field */
const EmptyInputBox = ({value, setValue, secureTextEntry, iconName, keyboardType = "default", inputError, isValid, textContentType="none"}) => {
    return (
        
        <View style={styles.container}>
            <View style={[styles.textField, {borderColor: isValid ? '#e8e8e8': 'red'}]}>
                <Icon name = { iconName } style={{fontSize: 22, marginRight: 5}}/>
            <TextInput 
                value={value}
                onChangeText={setValue}
                style={{flex: 1}}
                secureTextEntry = {secureTextEntry}
                keyboardType = {keyboardType}
                autoCorrect={false}
                editable={false}
                textContentType={textContentType}
                />
                
            </View>
            <Text style={styles.error}>
                {inputError} 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    /*"textField" refers to the actual box that the inputs are going to be written in*/ 
    textField:{
        width: '100%',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        borderColor: '#e8e8e8',

        alignItems: "center",
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        marginVertical: "0.15%"
        
    },
    container:{
        width: '90%',
        marginVertical: "0.5%",
        paddingVertical: "2%"
    },
    error:{
        color: "red",
        marginVertical: "1%"
    }

})
export default EmptyInputBox