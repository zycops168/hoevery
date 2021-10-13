import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {styles} from '../style';

export class ContectYouSender extends Component {
  render() {
    return (
      <View style={local_styles.box_contact}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={icons.phone}
            resizeMode="contain"
            style={{
              marginLeft: 10,
              marginTop: 5,
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingLeft: 10,
            }}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>
              ติดต่อผู้ให้เช่า
            </Text>
            <View style={{flex: 1, flexDirectory: 'row'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{}}>โทร: </Text>
                <Text style={{}}>084-1234567</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export class OrderDetail extends Component {
  render() {
    return (
      <View style={local_styles.box_order_detail}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={icons.bill}
            resizeMode="contain"
            style={{
              marginLeft: 10,
              marginTop: 5,
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingLeft: 10,
            }}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>รายละเอียด</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{}}>your order :</Text>
                <Text style={{}}>your order form :</Text>
                <Text style={{}}>Delivery address :</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{}}>Long Reach</Text>
                <Text style={{}}>Ramintra Bangkok</Text>
                <Text style={{}}>Nong Bon Prawet Bangkok 10250</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export class TotalPrice extends Component {
  render() {
    return (
      <View style={local_styles.box_payment}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            top: -5,
          }}>
          <Image
            source={icons.wallet}
            resizeMode="contain"
            style={{
              marginLeft: 10,
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />

          <Text style={{color: COLORS.black, ...FONTS.h3, paddingLeft: 5}}>
            ชำระ
          </Text>
          <Text style={{color: COLORS.black, ...FONTS.h3, paddingLeft: 100}}>
            ${this.props.msg_price}
          </Text>
        </View>
      </View>
    );
  }
}

export default class afterPayment extends Component {
  render() {
    const {price} = this.props.route.params;

    return (
      <View style={{flex: 1}}>
        <LinearGradient colors={[COLORS.white, COLORS.white]} style={{flex: 1}}>
          <StatusBar
            backgroundColor={COLORS.primary}
            barStyle="light-content"
          />
          <View style={{flexDirection: 'row', backgroundColor: COLORS.primary}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.padding * 0,
                marginBottom: SIZES.padding * 1,
                paddingHorizontal: SIZES.padding * 2,
              }}
              onPress={() =>
                this.props.navigation.navigate('payment', {price:price})
              }>
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
                right: -45,
                top: 5,
              }}>
              รายละเอียดการเช่า
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.padding * 0,
                marginBottom: SIZES.padding * 1,
                paddingHorizontal: SIZES.padding * 2,
              }}
              onPress={() =>
                console.log('press filter button')
              }></TouchableOpacity>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={local_styles.map}
            region={{
              latitude: 13.9411105,
              longitude: 100.6403282,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}></MapView>
          <View style={{flex: 1, margin: 10, alignItems: 'center'}}>
            <ContectYouSender />
            <OrderDetail />
            <TotalPrice msg_price={price} />
            <TouchableOpacity
              style={{
                borderRadius: 15,
                // position: 'absolute',
                // bottom: 30,
                backgroundColor: COLORS.yellow,
                width: '90%',
                height: 60,
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
                marginTop: 10,
              }}
              onPress={() => this.props.navigation.navigate('mainPage')}>
              <Text style={{color: COLORS.white, ...FONTS.h1}}>Home</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const local_styles = StyleSheet.create({
  map: {
    height: '35%',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 2,
  },
  body: {
    flex: 0.85,
    backgroundColor: COLORS.white,
  },
  body_shadow: {
    flex: 1,
  },
  box_contact: {
    width: '90%',
    height: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
    paddingTop: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 2,
  },
  box_order_detail: {
    width: '90%',
    height: 140,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
    paddingTop: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 2,
  },
  box_payment: {
    width: '90%',
    height: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
    paddingTop: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 2,
  },
});
