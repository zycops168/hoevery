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
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default function Profiles({navigation}) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
        </View>


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
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn5}
            onPress={() => navigation.navigate('PRIVACY')}>
            <Icon name="info" size={40} color="black" />
          </TouchableOpacity>
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
