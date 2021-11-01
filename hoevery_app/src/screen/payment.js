import React, {Component, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export class RenderPrice extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.largeTitle1,
            fontWeight: 'bold',
            marginTop: 40,
            marginBottom: 20,
          }}>
          Total
        </Text>
        <Text style={{color: COLORS.green, ...FONTS.h1}}>
          ${this.props.price}
        </Text>
      </View>
    );
  }
}
export class RenderPayment extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  

  postDataAPI = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      rental_by_id: this.props.params.rental_by_id,
      car_id: this.props.params.car_id,
      price: this.props.params.price,
      rental_agreement: this.props.params.type,
      address: 'bkk',
      address_detail: 'abc village',
      order_id: this.props.params.order_id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    response = await fetch('http://203.150.107.212/tenant/payment', requestOptions)
    responeText = response.text()

  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 50,
          position: 'absolute',
          top: -35,
          backgroundColor: COLORS.white,
          width: '90%',
          height: 70,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          left: 'auto',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 1.22,
          elevation: 2,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: COLORS.yellow,
            width: '50%',
            height: '75%',
            right: 80,
            bottom: -15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              position: 'absolute',
              ...FONTS.h1,
              fontWeight: 'bold',
              color: COLORS.white,
            }}>
            เงินสด
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 50,
            width: '45%',
            height: '45%',
            right: 75,
            bottom: 25,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              left: 165,
              ...FONTS.h3,
              color: COLORS.gray,
            }}>
            ชำระผ่านธนาคาร
          </Text>
        </View>
      </View>
    );
  }
}

export class RenderForm extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 6,
          marginRight: SIZES.padding * 2,
          marginLeft: SIZES.padding * 2,
        }}>
        <Text style={{color: COLORS.lightgreen, ...FONTS.body3}}>ที่อยู่</Text>
        {/* Addres */}

        <TextInput
          style={{
            marginVertical: SIZES.padding,
            borderBottomColor: COLORS.black,
            borderBottomWidth: 1,
            height: 40,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholder="จังหวัด, อำเภอ/เขต, รหัสไปรษณีย์"
          placeholderTextColor={COLORS.darkGray}
          selectionColor={COLORS.black}
        />
        <TextInput
          style={{
            marginVertical: SIZES.padding,
            borderBottomColor: COLORS.black,
            borderBottomWidth: 1,
            height: 40,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholder="รายละเอียดที่อยู่"
          placeholderTextColor={COLORS.darkGray}
          selectionColor={COLORS.black}
        />
      </View>
    );
  }
}

export default class payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnable: true,
    };
  }

  render() {
    const {rental_by_id, order_id, car_id} = this.props.route.params;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <LinearGradient
          colors={[COLORS.primary, COLORS.lightYellow]}
          style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              {/* <RenderHeader /> */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: SIZES.padding * 0,
                  paddingHorizontal: SIZES.padding * 2,
                }}
                onPress={() => this.props.navigation.goBack()}>
                {/* onPress={() => this.props.navigation.navigate('')}> */}
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{width: 20, height: 20, tintColor: COLORS.white}}
                />
                <Text
                  style={{
                    marginLeft: SIZES.padding * 1.5,
                    color: COLORS.white,
                    ...FONTS.h4,
                  }}>
                  {/* Back */}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  flexDirection: 'row',
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontWeight: 'bold',
                  right: -85,
                }}>
                ชำระเงิน
              </Text>
            </View>

            <View style={{flex: 0.8}}>
              <RenderPrice price={price} />
            </View>
            <View style={{flex: 1.5, backgroundColor: COLORS.white}}>
              <RenderPayment />
              <RenderForm />
              {/* <RenderComfirm /> */}
              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  // position: 'absolute',
                  // bottom: 30,
                  backgroundColor: COLORS.yellow,
                  width: '90%',
                  height: 70,
                  bottom: 20,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 1.22,
                  elevation: 2,
                }}
                onPress={() =>
                  this.props.navigation.navigate('afterPayment', {
                    username: username,
                    price: price,
                  })
                }>
                <Text style={{color: COLORS.white, ...FONTS.h1}}>ยืนยัน</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
      // <View>

      // </View>
    );
  }
}
