import React, { component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from '../style';

import SignInScreen from './src/screen/SignInScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import HomeScreen from './src/screen/HomeScreen';
import getDetail from './src/screen/getDetail';
import detailCar from './src/screen/detailCar';
import AddCar from './src/screen/addCar';
import mainPage from './src/screen/mainPage';
import findCar from './src/screen/findCar';
import total from './src/screen/total';
import inSpect from './src/screen/inSpect';
import payment from './src/screen/payment';
import notify from './src/screen/nofity';
import myRental from './src/screen/myRental';
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
        name="getDetail"
        component={getDetail}
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
        name="payment"
        component={payment}
      />
      <Stack.Screen
        name="notify"
        component={notify}
      />
      <Stack.Screen
        name="myRental"
        component={myRental}
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
