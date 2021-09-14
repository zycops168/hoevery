import React, {component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../style';

import SignInScreen from './src/screen/SignInScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import HomeScreen from './src/screen/HomeScreen';
import googleMap from './src/screen/googleMap';
import detialCar from './src/screen/detailCar';
// test github

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      // initialRouteName="SignInScreen"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        gestureEnabled: true,
      })}>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        // options={{title: 'SignInScreen'}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        // options={{title: 'HomeScreen'}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        // options={{title: 'HomeScreen'}}
      />
      <Stack.Screen
        name="googleMap"
        component={googleMap}
        // options={{title: 'HomeScreen'}}
      />
      <Stack.Screen
        name="detialCar"
        component={detialCar}
        // options={{title: 'HomeScreen'}}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
