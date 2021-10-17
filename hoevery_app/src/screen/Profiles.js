import React, {Component, Profiler, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  navigation,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import uuid from 'uuid-random';
import Cookie from 'react-native-cookie';


import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default function App({navigation}) {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {setVisible(!visible)};
  const [myCookie, setMyCookie] = useState();
  const getCookie = async () => {
    const cookie = await Cookie.get('203.150.107.212');
    setMyCookie(cookie);
    console.log("cookie on Profile screen ;", cookie)
    return cookie
  }
  console.log("cookie on Profile loop screen :" ,myCookie)
 //getCookie();

  const close = () => {
    BackHandler.exitApp();
    return true;
  };

  const [items, setItems] = useState([
    { id: uuid(), text: "always" },
    { id: uuid(), text: "green" },
  ])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>MochiMochi</Text>
        <Text style={styles.mail}>kim_mo27@hotmail.com</Text>
        <Image
          style={styles.Images1}
          source={require('../../assets/images/photo/kim.png')}
        />
      </View>

      <View style={styles.inside}>
        <TouchableOpacity
          style={[styles.btn_main, styles.center]}
          onPress={() => navigation.navigate('AddCar',  { paramKey: items })}>
          <Text style={[styles.text]}>ให้เช่า</Text>
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity style={styles.btn1} onPress={toggleOverlay}>
            <Icon name="history" size={40} color="black" />
          </TouchableOpacity>

          {/* <Overlay onBackdropPress={toggleOverlay}>  
            <View style={styles.inbutton}>
              <Text style={styles.text}>HISTORY</Text>  
              <TouchableOpacity style={[styles.btnModel,styles.center]} 
              onPress={close} >
                <Text style={[styles.text]}>
                  CLOSE
                </Text>
              </TouchableOpacity>   
            </View> 
          </Overlay>     */}

          <Text
            style={{
              bottom: 10,
              left: 35,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            HISTORY
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => navigation.navigate('ADDRESS')}>
            <Icon name="building" size={40} color="black" />
          </TouchableOpacity>

          {/* <Overlay onBackdropPress={toggleOverlay}>  
            <View style={styles.inbutton}>
              <Text style={styles.text}>ADDRESS</Text>  
              <TouchableOpacity style={[styles.btnModel,styles.center]} onClose={() => setOpen(!open)}>
                <Text style={[styles.text]}>
                  CLOSE
                </Text>
              </TouchableOpacity>                  
            </View> 
        </Overlay>   */}

          <Text
            style={{
              bottom: 73,
              left: 148,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            ADDRESS
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn3}
            onPress={() => navigation.navigate('PRIVACY')}>
            <Icon name="eye-slash" size={40} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              bottom: 137,
              left: 255,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            PRIVACY
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn4}
            onPress={() => navigation.navigate('PRIVACY')}>
            <Icon name="heart" size={35} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              bottom: 90,
              left: 90,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            LIKE
          </Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn5}
            onPress={() => navigation.navigate('PRIVACY')}>
            <Icon name="info" size={40} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              bottom: 155,
              left: 227,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            HELP
          </Text>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.btn6}
          onPress={() => navigation.navigate('PRIVACY')}>
          <Icon name="lock" size={40} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            top: 240,
            left: 135,
            fontSize: 15,
            color: 'black',
            fontWeight: 'bold',
          }}>
          LOGOUT
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    height: 750,
  },

  modelButton: {
    flex: 0.1,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    borderWidth: 1,
    width: 140,
    height: 30,
    top: 350,
    left: 100,
    elevation: 10,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 23,
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Avenir',
  },

  btnModel: {
    flex: 1,
    alignSelf: 'center',
    margin: 240,
    top: 200,
    width: 150,
    borderRadius: 100 / 2,
    shadowColor: COLORS.drakGreen,
    shadowOpacity: 0.5,
    backgroundColor: COLORS.primary,
    elevation: 10,
  },

  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'flex-start',
    alignItems: 'center',
    height: 115,
    width: 400,
  },

  Images1: {
    alignSelf: 'center',
    borderRadius: 100 / 2,
    width: 90,
    height: 90,
    top: -40,
    right: 95,
  },

  name: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    top: 25,
    left: 60,
  },
  mail: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
    top: 30,
    left: 77,
  },

  inside: {
    backgroundColor: 'white',
    borderRadius: 100 / 2,
    position: 'absolute',
    top: 133,
    height: 500,
    width: 350,
  },

  btn_main: {
    flex: 1,
    margin: 60,
    left: 30,
    width: 170,
    borderRadius: 100 / 2,
    shadowColor: COLORS.drakGreen,
    shadowOpacity: 0.5,
    backgroundColor: COLORS.primary,
    elevation: 10,
  },

  inbutton: {
    // paddingTop:20,
    // margin: 20,
    //position: 'absolute',
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    width: 340,
    height: 550,
    alignSelf: 'center',
  },

  btn1: {
    bottom: 20,
    left: 48,
  },
  btn2: {
    bottom: 85,
    left: 165,
  },
  btn3: {
    bottom: 150,
    left: 264,
  },
  btn4: {
    bottom: 100,
    left: 88,
  },
  btn5: {
    bottom: 160,
    left: 235,
  },
  btn6: {
    top: 240,
    left: 150,
  },

  box1: {
    borderRadius: 100 / 2,
    position: 'absolute',
    top: 133,
    height: 500,
    width: 350,
    top: 0,
    backgroundColor: COLORS.pink,
    elevation: 10,
  },
});

//export default Profiles;
