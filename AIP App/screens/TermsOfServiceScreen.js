import React, {useRef, useMemo} from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import TOSButton from '../components/TOSButton';
import BottomSheet from '@gorhom/bottom-sheet';


const TermsOfServiceScreen = ({navigation, route}) => {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%', '75%' ]);
    
    const returnToLoginPressed = () => {
        navigation.navigate("Login");
    }

    const onContinuePressed = () => {
        navigation.navigate('AccountCreation');
    }

    return (
        // <View style={{flex:1,justifyContent:'center',backgroundColor: 'white'}}>
        //     <Text style={styles.baseText}>
        //     Terms of Service
        //     </Text>
        

        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'white'}}>
        <Text style={[styles.header]}> Terms of Service </Text>
        <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ display: "none" }}
        >
            <View style={styles.sheet}>
            <ScrollView>
            <Text style={styles.terms}>
                These Client Terms of Service (the "Client Terms")describe your rights and responsibilities when using our online client portal or other platforms (the "Services"). If you are a Client or an Authorized User (defined below), these Client Terms govern your access and use of the Services. "Client" is the organization that you represent in agreeing to the Contract (e.g. your employer). These Client Terms form a binding
                "Contract" between Client and us. If you personally use our Services, you acknowledge your understanding of the Contract and agree to the Contract on behalf of Client.
            </Text>
        </ScrollView>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <TOSButton onPress={onContinuePressed} buttonName="I accept" type="PRIMARY"/>
                <TOSButton onPress={returnToLoginPressed} buttonName="I decline" type="PRIMARY"/>
            </View>
            </View>
        </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    baseText: {
      fontSize: 30,
      textAlign: 'left',
      marginLeft: 25,
      marginBottom: 20,
      marginTop: 70,
      fontWeight: 'bold'
    },
    terms: {
        textAlign: 'left',
        marginLeft: 20,
        marginRight: 20,

    },
    sheet: {
        alignItems: 'center',
    },
    header: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        paddingTop: 50,
        marginBottom: 600,
        textAlign: 'left',
    }
  });


export default TermsOfServiceScreen;