import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import CustomButton from '../components/CustomButton';


const AccountCreatedScreen = ({navigation, route}) => {
    const returnToLoginPressed = () => {
        navigation.navigate("Login", {
            email: route.params.email1,
            password: route.params.password1,
            username: route.params.username1
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.baseText}>
            Account Successfully Created!
            </Text>
            <CustomButton onPress={returnToLoginPressed} buttonName="Return to login" type="PRIMARY"/>
        </View>
    );
}

const styles = StyleSheet.create({
    baseText: {
      fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });


export default AccountCreatedScreen;