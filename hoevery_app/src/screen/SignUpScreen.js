import React, {Component} from 'react';
import {
  Text,
  Platform,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';

import {styles} from '../style';

import UserModel from '../models/UserModel';
import UserController from '../controller/UserController';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    comfirmPassword: '',
    tel: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const [isSelected, setSelection] = React.useState(false);

  const login = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      username: data.username,
      firstname: data.firstname,
      firstname: data.lastname,
      password: data.password,
      comfirmPassword: data.comfirmPassword,
      tel: data.tel,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('', requestOptions)
      .then(response => response.text())
      .then(result => {
        try {
          const responseJson = JSON.parse(result);

          if (responseJson._uuid != null) {
            var user = new UserModel();
            user.uuid = responseJson._uuid;
            user.username = responseJson.username;
            user.role = responseJson.role;
            user.access_token = responseJson.access_token;

            UserController.setListUser(user);
            navigation.navigate('HomeScreen');
          }
        } catch (err) {
          alert(result);
        }
      });
    // .catch(error => alert('error', error));
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5F9595" barStyle="light-content" />
      <ScrollView style={styles.backgound}>
        <View style={styles.textHeader}>
          <Text style={[styles.text_header1, {marginBottom: 10}]}>
            Registation
          </Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.body}>
          <View style={[styles.box, {height: 650}]}>
            <View style={styles.form}>
              <View style={{flex: 1, paddingRight: 10, paddingLeft: 10}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#5F9595',
                  }}>
                  Username
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Username"
                    autoCapitalize="none"
                    onChangeText={val => textInputChange(val)}
                    value={data.username}
                    autoCompleteType="username"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#5F9595',
                  }}>
                  Firstname
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Firstname"
                    autoCapitalize="none"
                    onChangeText={val => textInputChange(val)}
                    value={data.firstname}
                    autoCapitalize="word"
                    autoCompleteType="name"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#5F9595',
                  }}>
                  Lastname
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Lastname"
                    autoCapitalize="none"
                    onChangeText={val => textInputChange(val)}
                    value={data.lastname}
                    autoCapitalize="word"
                    autoCompleteType="name"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#5F9595',
                    marginTop: 5,
                  }}>
                  Password
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Password"
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={val => handlePasswordChange(val)}
                    value={data.password}
                    autoCompleteType="password"
                  />
                  <TouchableOpacity style={{}} onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ? (
                      <Feather name="eye-off" color="grey" size={20} />
                    ) : (
                      <Feather name="eye" color="grey" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#5F9595',
                    marginTop: 5,
                  }}>
                  Confirm Password
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={val => handlePasswordChange(val)}
                    value={data.confirmPassword}
                    autoCompleteType="password"
                  />
                  <TouchableOpacity style={{}} onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ? (
                      <Feather name="eye-off" color="grey" size={20} />
                    ) : (
                      <Feather name="eye" color="grey" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#5F9595',
                    marginTop: 5,
                  }}>
                  Tel
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Number Phone"
                    autoCapitalize="none"
                    onChangeText={val => textInputChange(val)}
                    value={data.tel}
                    keyboardType="numeric"
                    autoCompleteType="tel"
                  />
                  {data.check_textInputChange ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null}
                </View>

                <TouchableOpacity
                  onPress={() => login()}
                  style={{marginTop: 10}}>
                  <View>
                    <LinearGradient
                      colors={['#5F9595', '#375F5F']}
                      style={styles.signIn}>
                      <Text style={[styles.textSignIn, {color: '#ffff'}]}>
                        Sign Up
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', paddingLeft: 5}}>
                  <Text style={{fontSize: 14, margin: 5, color: '#828282'}}>
                    Already got an account ?
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignInScreen');
                    }}
                    style={{}}>
                    <Text
                      style={{
                        fontSize: 14,
                        margin: 5,
                        color: '#3E76DF',
                        fontWeight: 'bold',
                      }}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;
