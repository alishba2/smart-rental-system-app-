// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/splashScreen';
import HomeScreen from './screens/homeScreen';
import SelectRole from './screens/selectRole';
import RegisterScreen from './screens/owner/signIn';

import login from './screens/owner/login';
import GoogleLoginScreen from './screens/owner/googleAuthentication';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="selectRole" component={SelectRole} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="googleLogin" component={GoogleLoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
