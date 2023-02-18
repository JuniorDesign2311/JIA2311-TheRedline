import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
    // used in AccountCreationScreen, AccountCreationScreen2, LoginScreen 
    header: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        paddingTop: '30%',
        marginBottom: '175%',
        textAlign: 'left',
    },
    // used in ResetPasswordScreen, TermsOfServiceScreen
    header2: {
        fontSize: 45,
        fontFamily: 'Helvetica Neue',
        fontWeight: 'bold',
        paddingTop: 50,
        marginBottom: 600,
    },
    // bottom sheet that has content right below the header
    sheet: {
        alignItems: 'center',
    },
    // ResetPasswordScreen, LoginScreen
    bottomSheet: {
        borderRadius: 50
    },
    error: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        align: 'center'
    },
    blueText: {
        fontSize: 13,
        marginTop: 0,
        color: '#039be5'
    },
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});

export default GlobalStyles;