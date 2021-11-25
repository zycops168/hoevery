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
  ActivityIndicator,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_KEY} from '../constants/API_KEY';
import Geolocation from '@react-native-community/geolocation';

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
                <Text style={{}}>{this.props.tel}</Text>
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
      <ScrollView style={local_styles.box_order_detail}>
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
                <Text style={{}}>Rental By :</Text>
                <Text style={{}}>Price :</Text>
                <Text style={{}}>Delivery address :</Text>
                <Text style={{}}>created date :</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{}}>{this.props.data.rental_by}</Text>
                <Text style={{}}>{this.props.data.rental_agreement}</Text>
                <Text style={{}}>
                  {this.props.data.address} {this.props.data.address_detail}
                </Text>
                <Text style={{}}>{this.props.data.created_date}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: '',
      latitude: 0,
      longitude: 0,
      error: null,
      CarLatitude: '',
      CarLongitude: '',
      distance: '',
      time: '',
    };
    this.mapRef = React.createRef();
    this.makerRef = React.createRef();
  }

  getDetailCar = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    this.setState({loading: true});
    console.log('this.state.data.car_id ' + this.state.data.car_id);
    const response = await fetch(
      `http://203.150.107.212/tenant/get-detail?car_id=${this.state.data.car_id}`,
      requestOptions,
    );
    const result = await response.json();
    try {
      if (result.ret == 0) {
        this.setState({
          loading: false,
          CarLatitude: result.data.latitude,
          CarLongitude: result.data.longitude,
        });
        console.log(result.data);
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert(err);
    }
  };

  getDataAPI = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response1 = await fetch(
      `http://203.150.107.212/tenant/payment?order_id=${this.props.route.params.order_id}`,
      requestOptions,
    );

    const result1 = await response1.json();
    try {
      if (result1.ret == 0) {
        this.setState({data: result1.data});
        console.log(this.state.data);

        const response2 = await fetch(
          `http://203.150.107.212/tenant/get-detail?car_id=${this.state.data.car_id}`,
          requestOptions,
        );

        const result2 = await response2.json();
        try {
          if (result2.ret == 0) {
            this.setState({
              loading: false,
              CarLatitude: result2.data.latitude,
              CarLongitude: result2.data.longitude,
            });
            console.log('result2.data.latitude ' + result2.data.latitude);
          } else {
            alert(result2.msg);
          }
        } catch (err) {
          alert(err);
        }
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert(err);
    }
  };

  fetchTime = (d, t) => {
    this.setState(state => ({distance: d, time: t.toFixed(2)}));
  };

  componentDidMount() {
    this.getDataAPI();
    // this.getDetailCar();

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

  render() {
    const getCookie = async () => {
      const cookie = await Cookie.get('203.150.107.212');
      // console.log("cookie on listCar screen ;", cookie)
      this.setState({username: cookie});
    };
    const {order_id} = this.props.route.params;

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
              onPress={() => this.props.navigation.navigate('mainPage')}>
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
          {/* google Map */}
          {this.state.loading ? (
            <View
              style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: COLORS.darkGray,
              }}>
              <ActivityIndicator animating size="large" />
            </View>
          ) : (
            <MapView
              ref={this.mapRef}
              provider={PROVIDER_GOOGLE}
              style={local_styles.map}
              showsTraffic={true}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0321,
              }}>
              <Marker
                coordinate={{
                  latitude: this.state.CarLatitude,
                  longitude: this.state.CarLongitude,
                }}
                image={require('../../assets/images/banner/map_mark.png')}
                title="Excavator01"
                description="tel: 082-1234567"
                onCalloutPress={() => this.props.navigation.navigate('inSpect')}
              />

              <MapViewDirections
                origin={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
                destination={{
                  latitude: this.state.CarLatitude,
                  longitude: this.state.CarLongitude,
                }}
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={6}
                strokeColor="dodgerblue"
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${this.state.latitude}, ${this.state.longitude} " and "${this.state.CarLatitude}, ${this.state.CarLongitude}"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  this.fetchTime(result.distance, result.duration),
                    this.mapRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        // right: 30,
                        // bottom: 300,
                        // left: 30,
                        // top: 100,
                      },
                    });
                }}
                onError={errorMessage => {
                  // console.log('GOT AN ERROR');
                }}
              />

              <Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                }}
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
                radius={10000}
                fillColor={'rgba(200, 300, 200, 0.5)'}
                strokeWidth={0}
              />
              {/* </MapView> */}
            </MapView>
          )}

          {/*  End googleMap */}
          <View style={{flex: 1, margin: 10, alignItems: 'center'}}>
            <ContectYouSender tel={this.props.route.params.tel} />
            <OrderDetail data={this.state.data} />
            <TotalPrice msg_price={this.state.data.price} />
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
    height: '55%',
    flex: 1,
  },
  body: {
    flex: 0.85,
    backgroundColor: COLORS.white,
  },
  body_shadow: {
    flex: 2,
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
