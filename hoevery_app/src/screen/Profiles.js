import React, { Component, Profiler, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  navigation,
  ImageBackground,
  FlatList
} from 'react-native';
import { colors, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'uuid-random';
import Cookie from 'react-native-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';


import { COLORS, SIZES, FONTS, icons, images } from '../constants';



export default function Profiles({ navigation }) {

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
              style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => navigation.navigate('AddressPro')}>
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




  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const { colors } = useTheme();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  ),

    renderHeader = () => (
      <View style={styles.headerBot}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    )

  bs = React.createRef();
  fall = new Animated.Value(1);

  console.log("cookie on Profile loop screen :", myCookie)


  return (
    <View style={styles.container}>

      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />

      <View style={styles.header}>
        <View style={styles.header_text}>

          <Animated.View style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}>

            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                <View
                  style={{ height: 100, width: 100, borderRadius: 15, top: 50, justifyContent: 'center', alignItems: 'center', }}>
                  <ImageBackground
                    source={{ uri: image }}
                    style={{ height: 90, width: 90, bottom: 5 }}
                    imageStyle={{ borderRadius: 50 }}>
                    <View
                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="camera" size={45} color="#fff"
                        style={{
                          opacity: 0.7, alignItems: 'center', justifyContent: 'center',
                          borderWidth: 1, borderColor: '#fff', borderRadius: 10
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <Text style={{
                left: 150, bottom: 40, padding: 10, fontWeight: 'bold', fontSize: 18
              }}> ID: CHARMUAR{'\n'}</Text>
              <Text style={{
                left: 140, bottom: 70, padding: 10, fontWeight: 'bold', fontSize: 15, fontWeight: 'normal'
              }}> จำนวนรถในคลัง : </Text>

            </View>


          </Animated.View>

        </View>

      </View>
      <Body />
      <Footer />


    </View >

  );
};




const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    flex: 1
  },
  inside: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 5,
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




  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  headerBot: {
    backgroundColor: '#EAEAEA',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 10,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
    elevation: 10 
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  cancelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panelTitle: {
    fontSize: 24,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },

});

//export default Profiles;
