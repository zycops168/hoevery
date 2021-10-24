import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles } from '../style';
import { SpeedDial, LinearProgress } from 'react-native-elements';
import Cookie from 'react-native-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, FONTS, icons, images } from '../constants';

const Header_looking = () => {
  return (
    <View style={styles1.header}>
      <Text style={[styles.text_header1, { color: '#800080' }]}>L </Text>
      <Text style={[styles.text_header1, { color: '#00008b' }]}>O </Text>
      <Text style={[styles.text_header1, { color: '#00ced1' }]}>O </Text>
      <Text style={[styles.text_header1, { color: '#00ff7f' }]}>K </Text>
      <Text style={[styles.text_header1, { color: '#ffff00' }]}>I </Text>
      <Text style={[styles.text_header1, { color: '#ff8c00' }]}>N </Text>
      <Text style={[styles.text_header1, { color: '#DA1503' }]}>G </Text>
    </View>
  );
};
const Header_for = () => {
  return (
    <View style={styles1.header2}>
      <Text style={[styles.text_header1, { color: '#362222' }]}>FOR ? </Text>
    </View>
  );
};
const Body = () => {
  return (
    <View style={styles1.body}>
      <View style={styles1.left_body}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
          <Image
            style={styles1.pic_main}
            source={images.clawer}
            onPress={() => { }}
            borderRadius={10}
          />
          <Text style={styles1.text_exca_detail}> •- Crawler -•</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
          <Image
            style={styles1.pic_main}
            source={images.dragline}
            onPress={() => { }}
            borderRadius={10}
          />
          <Text style={styles1.text_exca_detail}> •- Drag Line -•</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
          <Image
            style={styles1.pic_main}
            source={images.suction}
            onPress={() => { }}
            borderRadius={10}
          />
          <Text style={styles1.text_exca_detail}> •- Suction -•</Text>
        </TouchableOpacity>
      </View>
      <View style={styles1.right_body}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
          <Image
            style={styles1.pic_main}
            source={images.skid_steel}
            onPress={() => { }}
            borderRadius={10}
          />
          <Text style={styles1.text_exca_detail}> •- Skid Steel -•</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
          <Image
            style={styles1.pic_main}
            source={images.long_reach}
            onPress={() => { }}
            borderRadius={10}
          />
          <Text style={styles1.text_exca_detail}> •- Long Reach -•</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => { }}>
          <Image
            style={styles1.pic_main}
            source={images.mini_crawler}
            onPress={() => { }}
            borderRadius={10}
          />
          <Text style={styles1.text_exca_detail}> •- Mini Crawler -•</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const mainPage = ({ navigation }) => {
  const [myCookie, setMyCookie] = useState();

  useEffect( () => {
    getCookie();
  }, [])
  const getCookie = async () => {

    const cookie = await Cookie.get('203.150.107.212');
    setMyCookie(cookie);
    console.log("cookie on mainPage screen ;", cookie)
    return cookie
  }
  console.log("cookie on mainPage loop screen :", myCookie)
  const setAsyncLogout = async () => {
    try {
      await AsyncStorage.clear()
      console.log("asyncStorage logout Active");
      navigation.navigate('SignInScreen');
    } catch (e) {
      console.log(e);
    }
  }
  const Footer = () => {
    return (
      <View style={styles1.footer}>
        <TouchableOpacity
          style={styles1.find_btn}
          onPress={() => {
            navigation.navigate('findCar');
            console.log('next page');
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.drakGreen }}>
            {' '}
            ค้นหารถ{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const [open, setOpen] = useState(false);
  return (
    // all of body is header/body/footer
    <View style={styles1.container}>
      {/* header */}
      <Header_looking />
      <Header_for />
      {/* body */}
      <Body />
      {/* footer */}
      <Footer />
      <SpeedDial
        color={COLORS.primary}
        isOpen={open}
        icon={{ name: 'menu', color: COLORS.secondary }}
        openIcon={{ name: 'close', color: COLORS.secondary }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          color={COLORS.primary}
          icon={{ name: 'edit', color: COLORS.secondary }}
          title="Profile"
          onPress={() => navigation.navigate('Profiles')} // for page kim
        />
        <SpeedDial.Action
          color={COLORS.primary}
          icon={{ name: 'logout', color: COLORS.secondary }}
          title="Logout"
          onPress={() => setAsyncLogout()}
        />
      </SpeedDial>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
  },
  header2: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
  },
  body: {
    flex: 0.9,
    width: '90%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-around', //y
    alignItems: 'flex-start', //x
    alignSelf: 'center',
    borderRadius: 5,
    // shadowOffset: { width: 2, height: 2 },
    // shadowColor: 'brown',
    // shadowOpacity: 5.0,
    // shadowRadius: 5.0,
    // elevation: 9 ,
  },
  footer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.gray,
    padding: 10,
  },
  left_body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  right_body: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textaddbtn: {
    padding: 15,
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    color: COLORS.drakGreen,
  },
  text_select: {
    fontSize: 18,
  },
  pic_main: {
    width: 150,
    height: 100,
  },
  text_exca_detail: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: 'normal',
    alignSelf: 'center',
  },
  find_btn: {
    flex: 0.5,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
});
export default mainPage;
