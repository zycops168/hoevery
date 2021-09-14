import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

import UserController from '../controller/UserController';
import {styles} from '../style';


export default class HomeScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.homeScreen}>
        <Text> uuid: {UserController.listUser.uuid} </Text>
        <Text> username: {UserController.listUser.username} </Text>
        <Text> email: {UserController.listUser.email} </Text>
        <Text> role: {UserController.listUser.role} </Text>
        <Text> access_token: {UserController.listUser.access_token} </Text>
      </View>
    );
  }
}


