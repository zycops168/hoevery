import React, { Component, Profiler, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  navigation,
  FlatList
} from 'react-native';
import { colors, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'uuid-random';
import Cookie from 'react-native-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { COLORS, SIZES, FONTS, icons, images } from '../constants';

export default function App({ navigation }) {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => { setVisible(!visible) };
  const [exData, setExData] = useState([]);
  const [myCookie, setMyCookie] = useState();
  const [items, setItems] = useState([
    { id: uuid(), text: "always" },
    { id: uuid(), text: "green" },
  ])

  useEffect(() => {
    getCookie();
    getExData();
  }, [])

  const getCookie = async () => {
    const cookie = await Cookie.get('203.150.107.212');
    setMyCookie(cookie);
    console.log("cookie on Profile screen ;", cookie)
  }
  const getExData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const cookie = await Cookie.get('203.150.107.212');
    // console.log("cookie on addCar screen ;", cookie)
    const response = await fetch(`http://203.150.107.212/lessor/my-product?username=${cookie['username']}`, requestOptions);
    // console.log(response);
    const result = await response.json();
    console.log("result : ", result.data.row);
    try {
      if (result.ret == 0) {
        setExData(result.data.row);
      }
      else {
        alert(result.msg);
      }
    } catch (err) {
      alert(err)
    }
  }
  const setAsyncLogout = async () => {
    try {
      await AsyncStorage.clear()
      console.log("asyncStorage logout Active");
      navigation.navigate('SignInScreen');
    } catch (e) {
      console.log(e);
    }
  }
  const Body = () => {
    return (
      <View style={styles.body}>
        <View style={styles.margin_body}>
          <View style={styles.body_btn}>
            <TouchableOpacity
              style={styles.rent_btn}
              onPress={() => navigation.navigate('AddCar')}>
              <Text style={{ color: COLORS.drakGreen, fontWeight: 'bold', fontSize: 18 }}>
                ลงทะเบียนรถใหม่
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body_btn_2}>
            {/* <View style={styles.layer_left}> */}
            <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => navigation.navigate('History')}>
              <Icon name="history" size={33} color="black" />
              <Text style={{ color: COLORS.drakGreen, fontWeight: 'bold' }}>
                ประวัติการให้เช่ารถ{'\n'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
              style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }} >
              <Icon name="building" size={33} color="black" />
              <Text style={{ color: COLORS.drakGreen, fontWeight: 'bold' }}>
                ที่อยู่{'\n'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('myRental')}
              style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="heart" size={33} color="black" />
              <Text style={{ color: COLORS.drakGreen, fontWeight: 'bold', }}>
                ประวัติการเช่า
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }
  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.footer_btn}>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setAsyncLogout()}>
            <Icon name="lock" size={40} color="black" />
            <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', }}>
              LOGOUT
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
  console.log("cookie on Profile loop screen :", myCookie)
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.header_text}>
          <TouchableOpacity style={{ width: 110, height: "100%" }}
            onPress={() => { }} >
            <Image
              style={
                {
                  width: 85,
                  height: 85,
                  borderRadius: 50,
                }
              }
              source={require('../../assets/images/photo/kim.png')}
            />
          </TouchableOpacity>
          <View style={styles.header_name}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>ID: CHARMUAR{'\n'}</Text>
            <Text style={{ fontWeight: 'normal' }}>จำนวนรถในคลัง : </Text>
          </View>
        </View>
      </View>
      {/* Body */}
      <Body />
      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    flex: 1
  },
  header: {
    backgroundColor: COLORS.white,
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  body: {
    backgroundColor: 'white',
    flex: 0.8
  },
  footer: {
    flex: 0.15,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  // another style 
  header_text: {
    padding: 10,
    width: '100%',
    height: 110,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 4,
  },
  margin_body: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'orange',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
  body_btn: {
    flex: 0.4,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body_btn_2: {
    flex: 0.7,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  footer_btn: {
    width: 90,
    height: 90,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
  rent_btn: {
    width: 200,
    height: 80,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 12,
  },
  header_name: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },

});

//export default Profiles;
