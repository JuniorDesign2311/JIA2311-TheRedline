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
        textAlign: 'center'
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
    locationAutocompleteStyle: {
        container: {
          zIndex: 10,
          overflow: 'visible',
        },
        textInputContainer: {
          borderTopWidth: 0,
          borderBottomWidth: 0,
          height: 50,
          overflow: 'visible',
          backgroundColor: Colors.white,
          borderColor: Colors.white,
          borderRadius: 100,
        },
        textInput: {
          backgroundColor: 'transparent',
          fontSize: 15,
          lineHeight: 22.5,
          paddingBottom: 0,
          flex: 1
        },
        listView: {
          position: 'absolute',
          top: 60,
          left: 10,
          right: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          flex: 1,
          elevation: 3,
          zIndex: 10
        },
        description: {
          color: '#1faadb'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      },
});

export default GlobalStyles;