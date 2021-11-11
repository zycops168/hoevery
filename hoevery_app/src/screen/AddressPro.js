import React, {Component} from 'react';
import {Text, Platform, View, Button, StyleSheet, TouchableOpacity, Dimensions, 
  TextInput, ActivityIndicator, StatusBar, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from '../style';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

import UserModel from '../models/UserModel';
import UserController from '../controller/UserController';

const AddressPro = ({navigation}) => {
    const [data, setData] = React.useState({
        address: '',
        streetaddress: '',
        city: '',
        state: '',
        zip: '',
        tel: '',
        check_textInputChange: false,
        secureTextEntry: true,
      });
    
      const textInputChange = val => {
        if (val.length != 0) {
          setData({
            ...data,
            address: val,
            check_textInputChange: true,
          });
        } else {
          setData({
            ...data,
            address: val,
            check_textInputChange: false,
          });
        }
      };

      const handleStreetChange = val => {
        setData({
          ...data,
          streetaddress: val,
        });
      };
      const handleCityChange = val => {
        setData({
          ...data,
          city: val,
        });
      };
    
      const handleStateChange = val => {
        setData({
          ...data,
          state: val,
        });
      };
      const handleZipChange = val => {
        setData({
          ...data,
          zip: val,
        });
      };
      const handleTelChange = val => {
        setData({
          ...data,
          tel: val,
        });
      };
    
      const [isSelected, setSelection] = React.useState(false);
    
      const Address = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
    
        var raw = JSON.stringify({
          address: data.address,
          streetaddress: data.streetaddress,
          city: data.city,
          state: data.state,
          zip: data.zip,
          tel: data.tel,
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
        fetch('http://203.150.107.212/user/register', requestOptions)
          .then(response => response.text())
          .then(result => {
            try {
              const responseJson = JSON.parse(result);
    
              if (responseJson._uuid != null) {
                var add = new UserModel();
                add.uuid = responseJson._uuid;
                add.address = responseJson.address;
                add.role = responseJson.role;
                add.access_token = responseJson.access_token;
    
                UserController.setListUser(add);
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
          <StatusBar backgroundColor={COLORS.gray} barStyle="light-content" />
          
          <ScrollView style={styles.backgound}>
            <View style={styles1.header}>
              <View style={styles1.header_text}>
                  <TouchableOpacity styles={{}}
                  onPress={() => navigation.navigate('Profiles')}>
                      <Icon name="arrow-left" size={30} />
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 21,
                    fontWeight: 'bold',
                    right: 120,
                    color: 'black',
                  }}>My Address</Text>
              </View>
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
                      Address
                    </Text>
                    <View style={styles.action}>
                      <TextInput
                        style={styles.textInput}
                        placeholder=" *Address"
                        autoCapitalize="none"
                        onChangeText={val => textInputChange(val)}
                        value={data.address}
                        autoCompleteType="off"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#362222',
                      }}>
                      Street Address
                    </Text>
                    <View style={styles.action}>
                      <TextInput
                        style={styles.textInput}
                        placeholder=" *Street Address"
                        autoCapitalize="none"
                        onChangeText={val => handleStreetChange(val)}
                        value={data.streetaddress}
                        autoCompleteType="off"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#362222',
                      }}>
                      City
                    </Text>
                    <View style={styles.action}>
                      <TextInput
                        style={styles.textInput}
                        placeholder=" *City"
                        autoCapitalize="none"
                        onChangeText={val => handleCityChange(val)}
                        value={data.city}
                        autoCompleteType="off"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#362222',
                        marginTop: 5,
                      }}>
                      State/Province/Region
                    </Text>
                    <View style={styles.action}>
                      <TextInput
                        style={styles.textInput}
                        placeholder=" *State/Province/Region"
                        autoCapitalize="none"
                        onChangeText={val => handleStateChange(val)}
                        value={data.state}
                        autoCompleteType="off"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#362222',
                        marginTop: 5,
                      }}>
                      Zip/Postal Code
                    </Text>
                    <View style={styles.action}>
                      <TextInput
                        style={styles.textInput}
                        placeholder=" *Zip/Postal Code"
                        autoCapitalize="none"
                        onChangeText={val => handleZipChange(val)}
                        value={data.zip}
                        keyboardType="numeric"
                        autoCompleteType="off"
                      />
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
                        //autoCapitalize="none"
                        onChangeText={val => handleTelChange(val)}
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
                      onPress={() => navigation.navigate('Profiles')}
                      style={{marginTop: 10}}>
                      <View>
                        <LinearGradient
                          colors={[COLORS.primary, COLORS.primary]}
                          style={styles.signIn}>
                          <Text style={[styles.textSignIn, {color: COLORS.secondary}]}>
                            SAVE
                          </Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
    
                    <View style={{flexDirection: 'row', paddingLeft: 5}}>


                    </View>
                  </View>
                </View>
              </View>
            </Animatable.View>
          </ScrollView>
        </View>
  );

    
}




const styles1 = StyleSheet.create({

  header: {
    backgroundColor: COLORS.white,
    flex: 0.11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    padding: 10,
    width: '100%',
    height: 68,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },



});

export default AddressPro; 