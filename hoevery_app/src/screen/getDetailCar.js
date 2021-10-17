import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from 'react-native-maps';
import {LinearProgress, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PushNotification from 'react-native-push-notification';
import {Picker} from '@react-native-picker/picker';
import Cookie from 'react-native-cookie';
import Geolocation from '@react-native-community/geolocation';

import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default class getDetailCar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailCar: '',
      userData: '',
      car_id: '',
      visible: false,
      loading: true,
      pickerPrice: '',
      priceDaily: '',
      priceWeekly: '',
      priceMonthly: '',
      _function: '',
      isLoading: false,
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }

  componentDidMount() {
    this.getDetailCar();
    this.getUserData();

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
    );
  }
  getDetailCar = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    this.setState({loading: true});
    const response = await fetch(
      `http://203.150.107.212/tenant/get-detail?car_id=${this.props.route.params.car_id}`,
      requestOptions,
    );
    const result = await response.json();
    try {
      if (result.ret == 0) {
        this.setState({
          loading: false,
          detailCar: result.data,
          pickerPrice: result.data.price.Daily,
          priceDaily: result.data.price.Daily,
          priceWeekly: result.data.price.Weekly,
          priceMonthly: result.data.price.Monthly,
          _function: result.data.function,
        });
        console.log(result.data);
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert(err);
    }
  };

  getUserData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    this.setState({loading: true});
    const cookie = await Cookie.get('203.150.107.212');
    console.log('cookie on getDetail screen ;', cookie);
    const response = await fetch(
      `http://203.150.107.212/user/info/${cookie['username']}`,
      requestOptions,
    );
    const result = await response.json();
    try {
      if (result.ret == 0) {
        this.setState({loading: false, userData: result.data});
        console.log(result.data);
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert(err);
    }
  };
  postOrder = () => {
    console.log('postOrder Active');
    this.toggleOverlay;
    var id = 0;
    if (id !== 9999) {
      id += 1;
      return;
    }
    console.log(id);
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // var raw = JSON.stringify({
    //   orderID: id,
    // },
    // );
    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // };
    // const response = await fetch('', requestOptions)
    // const json = await response.json();
    // console.log(json);
    this.setState({isLoading: true});
    this.props.navigator.navigate('mainPage');
  };

  toggleOverlay = () => {
    this.setState({visible: !this.state.visible});
  };

  render() {
    const handleNotification = () => {
      {
        // PushNotification.cancelAllLocalNotifications()
        PushNotification.localNotification({
          channelId: 'test-channel',
          title: 'Your' + 'order No.999',
          message: 'READ MORE...',
          bigText:
            'There is a list of products you need to make a decision on.',
          color: 'orange',
          playSound: false, // (optional) default: true
        });
        PushNotification.localNotificationSchedule({
          channelId: 'test-channel',
          title: 'Your' + 'order No.999',
          message: 'My Notification Message', // (required)
          date: new Date(Date.now() + 20 * 1000), // in 60 secs
          actions: ['ReplyInput'],
          reply_placeholder_text: 'Write your response...', // (required)
          reply_button_text: 'Reply', // (required)
          allowWhileIdle: true,
          playSound: false, // (optional) default: true
        });
        PushNotification.getChannels(function (channel_ids) {
          console.log(channel_ids); // ['channel_id_1']
        });
        //  navigation.navigate('myRental', { paramKey: items })
      }
    };

    const {username} = {};

    return (
      <View style={styles.body}>
        {/* header */}
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
              this.props.navigation.navigate('listCar', {username: username})
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
              right: -55,
              top: 5,
            }}>
            รายละเอียดรถ
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
        <View style={styles.body_shadow}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              // image={require('../../assets/images/banner/user_onMap.png')}
              title="Excavator01"
              description="tel: 082-1234567">
              <Image
                source={images.user_marker}
                style={{width: 50, height: 50}}
                resizeMode="contain"
              />
            </Marker>
            <Circle
              center={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              radius={1500}
              fillColor={'rgba(200, 300, 200, 0.5)'}
              strokeWidth={0}
            />

            <Marker
              coordinate={{latitude: 13.9411105, longitude: 100.6403282}}
              image={require('../../assets/images/banner/map_mark.png')}
              title="Excavator01"
              description="tel: 082-1234567"
              onCalloutPress={() =>
                this.props.navigation.navigate('inSpect')
              }></Marker>

            <Marker
              coordinate={{latitude: 13.9364533, longitude: 100.641779}}
              image={require('../../assets/images/banner/map_mark.png')}
              title="Excavator02"
              description="tel: 082-1234567">
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>Excavator02</Text>
                    {/* <Text>A short description</Text> */}
                    <Image
                      style={styles.image}
                      source={require('../../assets/images/excavators/excavator2.jpg')}
                    />
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          </MapView>
          {/*  under googleMap */}
          <View style={styles.body_text}>
            <View style={styles.body_text_inside}>
              <Text style={styles.text_inside}>
                ผู้ให้เช่า :
                <Text style={styles.text_2inside}>
                  {' '}
                  {this.state.detailCar.provider}
                  {/* {detailCar.provider} */}
                </Text>
              </Text>
              {/* <Text style={styles.text_2inside}> {userData[1].username}</Text> */}
            </View>
          </View>
          <View style={styles.body_text}>
            <View style={styles.body_text_inside}>
              <Text style={styles.text_inside}>
                เบอร์โทรศัพท์ :
                <Text style={styles.text_2inside}>
                  {' '}
                  {this.state.userData.tel}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.body_text}>
          <View style={styles.body_text_inside_detail}>
            <Text style={styles.text_inside}> รายละเอียด :</Text>
            <View style={styles.body_detail}>
              {/* <View style={styles.body_text_inside}> */}
              <Text style={styles.text_inside_detail}>
                Function :<Text> {this.state._function}</Text>
              </Text>

              <Picker
                style={styles.picker}
                selectedValue={this.state.pickerPrice}
                // onValueChange={itemValue => setPickerItemValue(itemValue)}>
                onValueChange={itemValue =>
                  this.setState({pickerPrice: itemValue})
                }>
                <Picker.Item label="รายวัน" value={this.state.priceDaily} />
                <Picker.Item
                  label="รายสัปดาห์"
                  value={this.state.priceWeekly}
                />
                <Picker.Item label="รายเดือน" value={this.state.priceMonthly} />
              </Picker>
            </View>
          </View>
        </View>
        {/* Render */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btn_readmore}
            onPress={() =>
              this.props.navigation.navigate('mainPage', {username: username})
            }>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>หน้าหลัก</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_readmore}
            onPress={this.toggleOverlay}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>ยืนยัน</Text>
            <Overlay
              isVisible={this.state.visible}
              onBackdropPress={this.toggleOverlay}
              onPress={() => postOrder}
              overlayStyle={{
                backgroundColor: COLORS.white,
                borderRadius: 20,
              }}>
              <View style={styles.overlay_container}>
                <TouchableOpacity
                  onPress={() => this.postOrder}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="check" size={40} color={COLORS.primary} />
                  <Text> กำลังดำเนินการ...</Text>
                </TouchableOpacity>
              </View>
            </Overlay>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: '65%',
    flex: 1,
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: COLORS.lime,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: 140,
    height: 80,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  body_shadow: {
    flex: 2,
  },
  footer: {
    flex: 0.3,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  footer_btn: {
    flex: 0.8,
    backgroundColor: COLORS.white,
    borderRadius: 7,
  },
  //another style without header/body/footer
  scroll_view: {
    width: '90%',
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    paddingTop: 12,
    paddingLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 50,
    borderRadius: 10,
  },
  textaddbtn: {
    padding: 7,
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    color: COLORS.drakGreen,
  },
  btn_readmore: {
    backgroundColor: COLORS.primary,
    width: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
  body_text: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 10,
  },
  body_detail: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  body_text_inside: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 5,
  },
  body_text_inside_detail: {
    width: '90%',
    height: 250,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 5,
  },
  // text fetch
  text_inside: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text_2inside: {
    fontSize: 18,
  },
  text_inside_detail: {
    fontSize: 12,
    padding: 10,
  },
  text: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: COLORS.drakGreen,
  },
  overlay_container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  text_loading: {
    fontSize: 22,
    color: COLORS.darkGray,
  },
  picker: {
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderColor: 'red',
    borderWidth: 10,
    backgroundColor: COLORS.white,
    borderWidth: 10,
    borderColor: '#000',
  },
});