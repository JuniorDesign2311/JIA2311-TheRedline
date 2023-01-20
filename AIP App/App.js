import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import MapScreen from "./screens/MapScreen";
import AccountCreationScreen from "./screens/AccountCreationScreen";
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator
        screenOptions={{
            headerStyle: {
              backgroundColor: "Yellow",
            }
        }}>
      <Stack.Screen
=======
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: "Login"}}
        />
        
        <Stack.Screen
>>>>>>> josh
          name="AccountCreation"
          component={AccountCreationScreen}
          options={{title: "Account Creation",
          headerShown: false}}
        />
        
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{title: "Map",
          headerShown: true}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

 
