
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
  },

  header: {
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







