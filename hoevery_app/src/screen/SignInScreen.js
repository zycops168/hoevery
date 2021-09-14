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
    password: '',
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
      password: data.password,
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
      })
      // .catch(error => alert('error', error));
    navigation.navigate('googleMap');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5F9595" barStyle="light-content" />
      <View style={styles.backgound}>
        <View style={styles.textHeader}>
          <Text style={styles.text_header1}>WELCOME</Text>
          <Text style={styles.text_header1}>TO</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.text_header1, {color: '#DA1503'}]}>HOE</Text>
            <Text style={[styles.text_header1, {color: 'white'}]}>VERY</Text>
          </View>
          <Text style={styles.text_header2}>
            Registering to this website,
            {'\n'} you accept our {'\n'}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => {}} style={{}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    color: '#fff',
                  }}>
                  Terms of use
                </Text>
              </TouchableOpacity>
              <Text style={{paddingRight: 5, paddingLeft: 5, color: '#fff'}}>
                and our
              </Text>
              <TouchableOpacity onPress={() => {}} style={{}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    color: '#fff',
                  }}>
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </View>
          </Text>
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.body}>
          <View style={styles.box}>
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
                  <Feather
                    style={{marginLeft: 5}}
                    name="user"
                    color="#5F9595"
                    size={20}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Username"
                    autoCapitalize="none"
                    onChangeText={val => textInputChange(val)}
                    value={data.username}
                  />
                  {data.check_textInputChange ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null}
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
                  <Feather
                    style={{marginLeft: 5}}
                    name="lock"
                    color="#5F9595"
                    size={20}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Password"
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={val => handlePasswordChange(val)}
                    value={data.password}
                  />
                  <TouchableOpacity style={{}} onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ? (
                      <Feather name="eye-off" color="grey" size={20} />
                    ) : (
                      <Feather name="eye" color="grey" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{paddingTop: 5}}>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>Remember me</Text>
                  </View>
                  {isSelected ? true : false}
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.label}>
                  <Text style={{fontWeight: 'bold', color: '#828282'}}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => login()} style={{}}>
                  <View>
                    <LinearGradient
                      colors={['#5F9595', '#375F5F']}
                      style={styles.signIn}>
                      <Text style={[styles.textSignIn, {color: '#ffff'}]}>
                        Sign In
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', paddingLeft: 5}}>
                  <Text style={{fontSize: 14, margin: 5, color: '#828282'}}>
                    Not a member ?
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{}}>
                    <Text
                      style={{
                        fontSize: 14,
                        margin: 5,
                        color: '#3E76DF',
                        fontWeight: 'bold',
                      }}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
      <View style={styles.footer}>
        <View style={{}}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 15,
              paddingTop: 5,
            }}>
            FIND US ON
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}>
            <Image
              style={styles.icon}
              source={require('../../images/icon-png-facebook.png')}
            />
            <Image
              style={styles.icon}
              source={require('../../images/icon-png-line.png')}
            />
            <Image
              style={styles.icon}
              source={require('../../images/icon-png-youtube.png')}
            />
            <Image
              style={styles.icon}
              source={require('../../images/icon-png-twitter.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
