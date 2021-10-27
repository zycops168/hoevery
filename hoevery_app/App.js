import React, {component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../style';

import SignInScreen from './src/screen/SignInScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import HomeScreen from './src/screen/HomeScreen';
import getDetailCar from './src/screen/getDetailCar';
import detailCar from './src/screen/detailCar';
import AddCar from './src/screen/addCar';
import mainPage from './src/screen/mainPage';
import findCar from './src/screen/findCar';
import inSpect from './src/screen/inSpect';
import listCar from './src/screen/listCar';
import total from './src/screen/total';
import payment from './src/screen/payment';
import notify from './src/screen/nofity';
import myRental from './src/screen/myRental';
import afterPayment from './src/screen/afterPayment';
import Profiles from './src/screen/Profiles'
import testDeploy from './src/screen/testDeploy'
import testRegister from './src/screen/testRegister'
import History from './src/screen/History';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        gestureEnabled: true,
      })}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="getDetailCar" component={getDetailCar} />
      <Stack.Screen name="detailCar" component={detailCar} />
      <Stack.Screen name="AddCar" component={AddCar} />
      <Stack.Screen name="mainPage" component={mainPage} />
      <Stack.Screen name="findCar" component={findCar} />
      <Stack.Screen name="total" component={total} />
      <Stack.Screen name="inSpect" component={inSpect} />
      <Stack.Screen name="listCar" component={listCar} />
      <Stack.Screen name="payment" component={payment} />
      <Stack.Screen name="notify" component={notify} />
      <Stack.Screen name="myRental" component={myRental} />
      <Stack.Screen name="afterPayment" component={afterPayment} />
      <Stack.Screen name="Profiles" component={Profiles} />
      <Stack.Screen name="testDeploy" component={testDeploy} />
      <Stack.Screen name="testRegister" component={testRegister} />
      <Stack.Screen name="History" component={History} />
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
