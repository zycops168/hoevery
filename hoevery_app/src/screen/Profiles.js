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

<<<<<<< HEAD
export default function Profiles({navigation}) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
=======
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece

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

<<<<<<< HEAD
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
          <Text style={styles.text}>ให้เช่า</Text>
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity style={styles.btn1}
          onPress={() => navigation.navigate('History')}>
            <Icon name="history" size={40}/>  
          </TouchableOpacity>
          <Text
            style={{
              bottom: 10,
              left: 65,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            HISTORY
          </Text>
        </View>


        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => navigation.navigate('AddressPro')}>
            <Icon name="building" size={40} color="black" />
          </TouchableOpacity>

          <Text
            style={{
              bottom: 85,
              left: 213,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            ADDRESS
          </Text>
=======
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
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
        </View>
      </View>

<<<<<<< HEAD

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn4}
            onPress={toggleOverlay}>  
            <Icon name="heart" size={35} color="black" />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={styles.inbutton}>

              <View style={styles.insideHis} top={5}>
              <Image style={styles.imHis}
              source={require('../../images/type_ex/1_crawler.png')}
              top={10}
              borderRadius={100/2}/>        
              <Text style={styles.t1} >Lonh Reach</Text>     
              <Text style={styles.totalHis} >
               <Icon name="money" size={25} color="black"/>
                  Total :
              </Text> 
              </View> 

              <View style={styles.insideHis} top={115}>
              <Image style={styles.imHis}
              source={require('../../images/type_ex/1_crawler.png')}
              top={10}
              borderRadius={100/2}/>        
              <Text style={styles.t1} >Lonh Reach</Text>     
              <Text style={styles.totalHis} >
               <Icon name="money" size={25} color="black"/>
                  Total : </Text> 
              </View> 

              <View style={styles.insideHis} top={225}>
              <Image style={styles.imHis}
              source={require('../../images/type_ex/1_crawler.png')}
              top={10}
              borderRadius={100/2}/>        
              <Text style={styles.t1} >Lonh Reach</Text>     
              <Text style={styles.totalHis} >
               <Icon name="money" size={25} color="black"/>
                  Total :</Text> 
              </View>                


              <View style={styles.insideHis} top={335}>
              <Image style={styles.imHis}
              source={require('../../images/type_ex/1_crawler.png')}
              top={10}
              borderRadius={100/2}/>        
              <Text style={styles.t1} >Lonh Reach</Text>     
              <Text style={styles.totalHis} >
               <Icon name="money" size={25} color="black"/>
                  Total : </Text> 
              </View>     

              <View style={styles.insideHis} top={445}>
              <Image style={styles.imHis}
              source={require('../../images/type_ex/1_crawler.png')}
              top={10}
              borderRadius={100/2}/>        
              <Text style={styles.t1} >Lonh Reach</Text>     
              <Text style={styles.totalHis} >
               <Icon name="money" size={25} color="black"/>
                  Total : </Text> 
              </View> 
                 

              {/* <TouchableOpacity style={[styles.btnModel_Save,styles.center]} 
              onPress={() => navigation.navigate('Profiles')}>
                <Text style={{ color: 'black', fontWeight: 'bold'}}>SAVE</Text> 
              </TouchableOpacity>   */}

             </View>
          </Overlay>             
          </TouchableOpacity>

          <Text
            style={{
              bottom: 40,
              left: 80,
              color: COLORS.drakGreen,
              fontWeight: 'bold',
            }}>
            LIKE
          </Text>
=======
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

>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
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
<<<<<<< HEAD
          <Text
            style={{
              bottom: 118,
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
          onPress={() => navigation.navigate('SignInScreen')}>
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
=======
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
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
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
<<<<<<< HEAD
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

  insideHis: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 5,
    top: 20,
    height: 100,
    width: 330,
    borderRadius: 50/ 2,
    elevation: 10
  },

  imHis:{
    position: 'absolute',
    left: 25,
    height: 80,
    width: 80
  },

  t1: {
    color: 'black',
    position: 'absolute',
    fontWeight: 'bold',
    top: 20,
    fontSize: 20,
    left: 150
  },

  totalHis: {
    color: 'black',
    position: 'absolute',
    fontWeight: 'bold',
    top: 50,
    fontSize: 18,
    left: 150
  },

  btn_main: {
=======
  margin_body: {
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
<<<<<<< HEAD
    backgroundColor: COLORS.gray,
    width: 340,
    height: 550,
    alignSelf: 'center',
  },

  btn1: {
    bottom: 20,
    left: 80,
  },
  btn2: {
    bottom: 95,
    left: 230,
  },
  btn4: {
    bottom: 50,
    left: 78,
  },
  btn5: {
    bottom: 125,
    left: 235,
=======
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
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
  },
  header_name: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },

<<<<<<< HEAD
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

=======
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
});

//export default Profiles;
