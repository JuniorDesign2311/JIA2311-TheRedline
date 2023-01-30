import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import MapScreen from "./screens/MapScreen";
import AccountCreationScreen from "./screens/AccountCreationScreen";
import AccountCreationScreen2 from "./screens/AccountCreationScreen2";
import LoginScreen from './screens/LoginScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AccountCreatedScreen from "./screens/AccountCreatedScreen";
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
        <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1}}
    >
      <Stack.Navigator
        screenOptions={{
            headerStyle: {
              backgroundColor: "Yellow",
            }
        }}>
          
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: "Login",
          headerShown: false}}
        />
        
        <Stack.Screen
          name="AccountCreation"
          component={AccountCreationScreen}
          options={{title: "Account Creation",
          headerShown: false}}
        />

        <Stack.Screen
          name="TermsOfService"
          component={TermsOfServiceScreen}
          options={{title: "Terms Of Service",
          headerShown: false}}
        />

        <Stack.Screen
          name="AccountCreation2"
          component={AccountCreationScreen2}
          options={{title: "Account Creation Screen 2",
          headerShown: false}}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{title: "Reset Password",
          headerShown: false}}
        />
        
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{title: "Map",
          headerShown: true}}
        />

        <Stack.Screen
          name="AccountCreated"
          component={AccountCreatedScreen}
          options={{title: "AccountCreated",
          headerShown: false}}
        />
        
      </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
    
  );
};

 
