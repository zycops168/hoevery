<<<<<<< HEAD

import React, { Component, Profiler, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, BackHandler,navigation,ScrollView} from 'react-native';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

const History = ({navigation}) => {

  const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
    setVisible(!visible);
  };

  return(
  
    <ScrollView>
    <View style={styles.container}>
      
      <View style={styles.header}>
        <View style={styles.header_text}>
          <TouchableOpacity styles={{}}
           onPress={() => navigation.navigate('Profiles')}>
           <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.text}>My History</Text> 
      </View>
      </View>

      <View style={styles.inside} top={70}>
      <Image style={styles.im_1}
             source={require('../../images/type_ex/1_crawler.png')}
             top={35}
             borderRadius={10}/>        
        <Text style={styles.Text1}>March Backhole</Text>     
        <Text style={styles.t1}>รถขุดไฮดรอลิกชนิดโป๊ะเหล็กปุ้งกี๋ตักเข้า</Text>  
        <Text style={styles.total} >
               <Icon name="money" size={23} color="black"/>
                  Total : </Text>              
      </View>

      <View style={styles.inside} top={250}>
      <Image style={styles.im_1}
             source={require('../../images/type_ex/2_dragline.png')}
             top={35}
             borderRadius={10}/>    
        <Text style={styles.Text} 
              right={60}>Dragline Excavator</Text>     
        <Text style={styles.t2}>รถขุดตีนตะขาบปุ้งกี๋ลาก</Text>  
        <Text style={styles.total} >
               <Icon name="money" size={23} color="black"/>
                  Total : </Text>  
      </View>

      <View style={styles.inside} top={430}>
      <Image style={styles.im_1}
             source={require('../../images/type_ex/3_suction.png')}
             top={35}
             borderRadius={10}/>           
        <Text style={styles.Text}>Hydraulic Backhoe</Text>     
        <Text style={styles.t1}>รถขุดไฮดรอลิกชนิดตีนตะขาบปุ้งกี๋ตักเข้า</Text>  
        <Text style={styles.total} >
               <Icon name="money" size={23} color="black"/>
                  Total : </Text>             
      </View>

      <View style={styles.inside} top={610}>
      <Image style={styles.im_1}
             source={require('../../images/type_ex/2_dragline.png')}
             top={35}
             borderRadius={10}/>           
        <Text style={styles.Text}>Dragline Excavator</Text>     
        <Text style={styles.t2}>รถขุดตีนตะขาบปุ้งกี๋ลาก</Text>  
        <Text style={styles.total} >
               <Icon name="money" size={23} color="black"/>
                  Total : </Text>   
      </View>

      <View style={styles.inside} top={750}>
      <Image style={styles.im_1}
             source={require('../../images/type_ex/1_crawler.png')}
             top={35}
             borderRadius={10}/>        
        <Text style={styles.Text1}>March Backhole</Text>     
        <Text style={styles.t1}>รถขุดไฮดรอลิกชนิดโป๊ะเหล็กปุ้งกี๋ตักเข้า</Text>  
        <Text style={styles.total} >
               <Icon name="money" size={23} color="black"/>
                  Total : </Text>              
      </View>

      
      

  

    
    </View>
    </ScrollView>

  );

    
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    height: 750,
=======
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native'
import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Cookie from 'react-native-cookie';

const History = ({ navigation }) => {

  const [NotifyData, setNotifyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getListNotifyData();
  }, [])
  const getListNotifyData = async () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const cookie = await Cookie.get('203.150.107.212');
    console.log(cookie);
    const response = await fetch(`http://203.150.107.212/tenant/history-order?username=${cookie['username']}`, requestOptions);
    const result = await response.text();
    const listNotiData = await JSON.parse(result);
    console.log(listNotiData);
    setNotifyData(listNotiData.data);
    // console.log("2" ,listNotiData.data[2].status);
  }
  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.header_text}>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('mainPage')}>
            <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.text}>                 ประวัติการให้เช่ารถ</Text>
        </View>
      </View>
    )
  }
  const _goToPayment = () => {
    navigation.navigate('payment');
  }
  const _wait = () => {
    alert('Please wait...')
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      {/* Body */}
      <View style={styles.body}>
        <View style={
          {
            width: "87%",
            height: "100%",
            backgroundColor: '#fff',
            alignItems: 'center',
            borderRadius: 15,
            shadowOffset: { width: 2, height: 2 },
            shadowColor: COLORS.black,
            shadowOpacity: 5.0,
            shadowRadius: 5.0,
            elevation: 30,
          }
        }>
          <FlatList
            data={NotifyData}
            getListNotifyData={getListNotifyData}
            renderItem={({ item }) => (
              <View style={
                {
                  flex: 1,
                  backgroundColor: COLORS.white,
                  padding: 10,
                }
              }>
                <View style={styles.flat_container}>
                  <View style={styles.flat_grid_image}>
                    <Image
                      style={
                        {
                          width: 100,
                          height: 70,
                        }
                      }
                      source={require('../../assets/images/type_ex/1_crawler.png')}
                      onPress={() => { }}
                      borderRadius={10}
                    />
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}> {'\n'}วัน/เวลาทำการ {'\n'} <Text style={{ fontSize: 12, fontWeight: 'normal' }}>{item.created_date}</Text></Text>
                  </View>
                  <View style={styles.flat_grid_margin}>
                    <View style={styles.flat_header_text}>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4e4c4c' }}>HOEVERY{'\n'}</Text>
                      <Text style={FONTS.body4}>หมายเลขใบสั่งซื้อที่ {item.id}</Text>
                      {/* <Text style={FONTS.body5}>ประเภท : <Text style={{ fontWeight: 'bold' }}>null</Text></Text> */}
                    </View>
                    <View style={styles.flat_status}>
                    <Text style={FONTS.body5}>ผู้ให้เช่า : <Text style={{ fontWeight: 'bold' }}>{item.owner_car}</Text></Text>
                    <Text style={FONTS.body5}>ประเภทการเช่า : <Text style={{ fontWeight: 'bold' }}>{item.price_type}</Text></Text>
                      {/* <Icon name="money" size={20} color={COLORS.drakGreen} />
                      <Text style={{ color: "#000" }}>  <Text style={{ fontWeight: 'bold' }}> total :</Text> </Text>
                      <Text style={{ fontWeight: 'bold', color: "red" }}>price</Text> */}
                    </View>
                    <View style={styles.flat_total}>
                      {/* {item.status === "accept" ?
                        <TouchableOpacity style={styles.next_button}
                          onPress={() => _goToPayment()}
                        >
                          <Text>Next step </Text>
                        </TouchableOpacity> : <TouchableOpacity style={styles.wait_button}
                          onPress={() => _wait()}>
                          <Text>Waiting.. </Text>
                        </TouchableOpacity>} */}
                        <Icon name="money" size={20} color={COLORS.drakGreen} />
                      <Text style={{ color: "#000" }}>  <Text style={{ fontWeight: 'bold' }}> total :</Text> </Text>
                      <Text style={{ fontWeight: 'bold', color: "red" }}>{item.price} <Text style={{color:'black'}}>บาท</Text></Text>
                    </View>
                  </View>
                </View>
              </View>
            )} />
        </View>
      </View>
      {/* Footer */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
  },
  header: {
<<<<<<< HEAD
    backgroundColor: '#ffd700',
    alignItems: 'flex-start',
    alignItems: 'center',
    height: 60,
    width: 400,
    borderRadius: 50/ 2,
    elevation: 10
  },
  
  header_text: {
    padding: 10,
    width: '100%',
    height: 68,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },

  text: {
    padding: 5,
    fontSize: 22,
    fontWeight: 'bold',
    right: 125,
    color: COLORS.drakgreen,
  },

  inside: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 170,
    width: 350,
    borderRadius: 50/ 2,
    elevation: 10
  },

  Text1: {
    color: 'black',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    top: 30,
    right: 60,
  },

  Text: {
    color: 'black',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    top: 30,
    right: 40,
  },

  t1: {
    color: 'black',
    position: 'absolute',
    fontSize: 12,
    top: 70,
    right: 8,
  },
  t2: {
    color: 'black',
    position: 'absolute',
    fontSize: 12,
    top: 70,
    right: 90,
  },

  total: {
    color: 'black',
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 23,
    top: 120,
    right: 110,
  },

  im_1: {
    position: 'absolute',
    right: 230,
    height: 100,
    width: 100
  },

  btnInside: {
    flex:0.8,
    backgroundColor: '#ffd700',
    borderRadius : 10 
  },

  btn_Profile: {
    backgroundColor: '#ffd700',
    alignItems: 'center',
    top: 590,
    height: 50,
    width: 400,
    borderRadius: 50/ 2,
    elevation: 15
  },



});

export default History; 







=======
    backgroundColor: COLORS.white,
    flex: 0.11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  body: {
    flex: 0.9,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.1,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // anotheer style 
  header_text: {
    padding: 10,
    width: '100%',
    height: 68,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 3,
  },
  text: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: COLORS.drakgreen,
  },
  //flatlist noti 
  flat_container: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
  flat_grid_image: {
    width: 130,
    height: 220,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 9,
  },
  flat_grid_margin: {
    width: 150,
    height: 180,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  flat_header_text: {
    width: 150,
    height: 90,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  flat_status: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  flat_total: {
    width: 150,
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  next_button: {
    backgroundColor: COLORS.green,
    width: 90,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  wait_button: {
    backgroundColor: COLORS.red,
    width: 90,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
})

export default History;
>>>>>>> ee5092470b6961960cbf160f2dfa9b35d1c7eece
