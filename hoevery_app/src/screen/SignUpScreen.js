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
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

import UserModel from '../models/UserModel';
import UserController from '../controller/UserController';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    tel: '',
    check_textInputChange: false,
    secureTextEntry1: true,
    secureTextEntry2: true,
  });
  const [isLoading, setLoading] = React.useState(false);
  const [isSelected, setSelection] = React.useState(false);

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
  const handlePasswordConfirmChange = val => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };
  const handleFirstnameChange = val => {
    setData({
      ...data,
      firstname: val,
    });
  };
  const handleLastnameChange = val => {
    setData({
      ...data,
      lastname: val,
    });
  };

  const handleTelChange = val => {
    setData({
      ...data,
      tel: val,
    });
  };

  const updateSecureTextEntry1 = () => {
    setData({
      ...data,
      secureTextEntry1: !data.secureTextEntry1,
    });
  };

  const updateSecureTextEntry2 = () => {
    setData({
      ...data,
      secureTextEntry2: !data.secureTextEntry2,
    });
  };

  const register = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      username: data.username,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      tel: data.tel,
      image: '',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    if (data.password != data.confirmPassword) {
      alert('your password not match');
      return -1;
    }
    setLoading(true);

    const response = await fetch(`http://203.150.107.212/user/register`, requestOptions);

    const result = await response.json();
    console.log(result)
    try {
      if (result.ret == 0) {
        setLoading(false);
        navigation.navigate('mainPage');
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} barStyle="light-content" />
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
                    color: '#362222',
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
                    color: '#362222',
                  }}>
                  Firstname
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Firstname"
                    onChangeText={val => handleFirstnameChange(val)}
                    value={data.firstname}
                    autoCapitalize="words"
                    autoCompleteType="name"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#362222',
                  }}>
                  Lastname
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Lastname"
                    onChangeText={val => handleLastnameChange(val)}
                    value={data.lastname}
                    autoCapitalize="words"
                    autoCompleteType="name"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#362222',
                    marginTop: 5,
                  }}>
                  Password
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Password"
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry1 ? true : false}
                    onChangeText={val => handlePasswordChange(val)}
                    value={data.password}
                    autoCompleteType="password"
                  />
                  <TouchableOpacity style={{}} onPress={updateSecureTextEntry1}>
                    {data.secureTextEntry1 ? (
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
                    color: '#362222',
                    marginTop: 5,
                  }}>
                  Confirm Password
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry2 ? true : false}
                    onChangeText={val => handlePasswordConfirmChange(val)}
                    value={data.confirmPassword}
                    autoCompleteType="password"
                  />
                  <TouchableOpacity style={{}} onPress={updateSecureTextEntry2}>
                    {data.secureTextEntry2 ? (
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
                    color: '#362222',
                    marginTop: 5,
                  }}>
                  Tel
                </Text>
                <View style={styles.action}>
                  <TextInput
                    style={styles.textInput}
                    placeholder=" *Number Phone"
                    autoCapitalize="none"
                    onChangeText={val => handleTelChange(val)}
                    value={data.tel}
                    keyboardType="numeric"
                    autoCompleteType="tel"
                  />
                  {/* {data.check_textInputChange ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null} */}
                </View>

                <TouchableOpacity
                  onPress={() => register()}
                  style={{marginTop: 10}}>
                  <View>
                    <LinearGradient
                      colors={[COLORS.primary, COLORS.primary]}
                      style={styles.signIn}>
                      <Text
                        style={[styles.textSignIn, {color: COLORS.secondary}]}>
                        Sign Up
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', paddingLeft: 5}}>
                  <Text
                    style={{fontSize: 14, margin: 5, color: COLORS.darkGray}}>
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
                        color: COLORS.blue,
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
