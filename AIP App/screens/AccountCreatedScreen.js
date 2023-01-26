import React, {useState, useRef, useMemo} from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomButton';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';
import BottomSheet from '@gorhom/bottom-sheet';


const AccountCreatedScreen = ({navigation}) => {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    const returnToLoginPressed = () => {
        navigation.navigate("Login");
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