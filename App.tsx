import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import RequestDetailsScreen from './screens/RequestDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddRequestScreen from './screens/AddRequestScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token'); 
      setIsLoggedIn(!!token); 
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
<Stack.Navigator>
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Dashboard" component={DashboardScreen} />
  <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} options={{ headerShown: false }} />
  <Stack.Screen name="AddRequest" component={AddRequestScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
</Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;