import React, {useRef, useMemo} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import CustomButton from '../components/CustomButton';


const AccountCreatedScreen = ({navigation, route}) => {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    const returnToLoginPressed = () => {
        navigation.navigate("Login", {
            email: route.params.email1,
            password: route.params.password1,
            username: route.params.username1
        });
    }

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
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
  });


export default AccountCreatedScreen;