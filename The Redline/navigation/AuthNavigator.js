//This file has the navigation to all the initial login/create account screens

import {React} from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './tabs';

//screens
import MapScreen from '../screens/MapScreen';
import AccountCreatedScreen from '../screens/AccountCreatedScreen';
import AccountCreationScreen from '../screens/AccountCreationScreen';
import AccountCreationScreen2 from "../screens/AccountCreationScreen2";
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import EventCreationScreen from '../screens/EventCreationScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator(); //object that includes the Navigator, Screen, and Group

function AuthNavigator() {
  return (
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1}}
        >
            <Stack.Navigator
                screenOptions={{}}>
          
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{title: "Login",
                    headerShown: false, gestureEnabled: false}}
                />
        
                <Stack.Screen
                    name="AccountCreation"
                    component={AccountCreationScreen}
                    options={{title: "Account Creation",
                    headerShown: false, gestureEnabled: false}}
                />

                <Stack.Screen
                    name="TermsOfService"
                    component={TermsOfServiceScreen}
                    options={{title: "Terms Of Service",
                    headerShown: false, gestureEnabled: false}}
                />

                <Stack.Screen
                    name="AccountCreation2"
                    component={AccountCreationScreen2}
                    options={{title: "Account Creation Screen 2",
                    headerShown: false, gestureEnabled: false}}
                />

                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                    options={{title: "Reset Password",
                    headerShown: false, gestureEnabled: false}}
                />
               
                <Stack.Screen
                    name="AccountCreated"
                    component={AccountCreatedScreen}
                    options={{title: "AccountCreated",
                    headerShown: false, gestureEnabled: false}}
                />

                <Stack.Screen name="BottomTabs" component={Tabs} options={{headerShown: false}}/>

                <Stack.Screen
                    name="EventCreation"
                    component={EventCreationScreen}
                    options={{title: "Event Creation",
                    headerShown: false, gestureEnabled: false}}
                />

                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{title: "Settings",
                    headerShown: false, gestureEnabled: false}}
                />
                
        
            </Stack.Navigator>
        </KeyboardAvoidingView>
  );
}

export default AuthNavigator;