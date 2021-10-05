import React, { component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from '../style';

import SignInScreen from './src/screen/SignInScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import HomeScreen from './src/screen/HomeScreen';
import googleMap from './src/screen/googleMap';
import detailCar from './src/screen/detailCar';
import AddCar from './src/screen/addCar';
import mainPage from './src/screen/mainPage';
import findCar from './src/screen/findCar';
import total from './src/screen/total'
import inSpect from './src/screen/inSpect'
import listCar from './src/screen/listCar'
import payment from './src/screen/payment'
import afterPayment from './src/screen/afterPayment'
// test github

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      // initialRouteName="SignInScreen"
      screenOptions={({ route, navigation }) => ({
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
        name="detailCar"
        component={detailCar}
      // options={{title: 'HomeScreen'}}
      />
      <Stack.Screen
        name="AddCar"
        component={AddCar}
      />
      <Stack.Screen
        name="mainPage"
        component={mainPage}
      />
      <Stack.Screen
        name="findCar"
        component={findCar}
      />
      <Stack.Screen
        name="total"
        component={total}
      />
      <Stack.Screen
        name="inSpect"
        component={inSpect}
      />
      <Stack.Screen
        name="listCar"
        component={listCar}
      />
      <Stack.Screen
        name="payment"
        component={payment}
      />
      <Stack.Screen
        name="afterPayment"
        component={afterPayment}
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
