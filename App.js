import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/splashScreen';
import HomeScreen from './screens/homeScreen';
import SelectRole from './screens/selectRole';
import RegisterScreen from './screens/owner/signIn';
import BookingForm from './screens/bookingForm';
import login from './screens/owner/login';
import GoogleLoginScreen from './screens/owner/googleAuthentication';
import { AppProvider } from './screens/appContext';
import * as Font from 'expo-font';
import RentedProperties from './screens/tenant/rentedProperties';
// owner components
import AddProperty from './screens/owner/addProperty';
import AddedPropery from './screens/owner/addedPropery';
import Profile from './screens/owner/profile';
import Notification from './screens/notification';
import PropertyDetails from './screens/propertyDetails';
import OnboardingScreen from './screens/onBoardingScreen';
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'JosefinSans-Regular': require('./assets/Fonts/Josefin_Sans/static/JosefinSans-Regular.ttf'),
        'JosefinSans-Bold': require('./assets/Fonts/Josefin_Sans/static/JosefinSans-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, return a loading component or splash screen here
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="selectRole" component={SelectRole} options={{ headerShown: false }} />
          <Stack.Screen options={{ headerShown: false }} name="login" component={login} />
          <Stack.Screen name="googleLogin" component={GoogleLoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="register" component={RegisterScreen} />
          <Stack.Screen name="Properties" component={AddedPropery} />
          <Stack.Screen name="AddProperty" component={AddProperty} />
          <Stack.Screen options={{ headerShown: false }} name="Notifications" component={Notification} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
          <Stack.Screen options={{ headerShown: false }} name="PropertyDetails" component={PropertyDetails} />
          <Stack.Screen options={{ headerShown: false }} name="bookingForm" component={BookingForm} />
          <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen options={{ headerShown: false }} name="rentedProperties" component={RentedProperties} />



        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
