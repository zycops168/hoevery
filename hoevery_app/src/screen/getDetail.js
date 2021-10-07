import React, { Component, useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle, } from 'react-native-maps';
import { LinearProgress, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import PushNotification from 'react-native-push-notification';
import uuid from 'uuid-random';

const getDetail = ({ navigation }) => {

  const [items, setItems] = useState([
    { id: uuid(), text: "busy" },
    { id: uuid(), text: "red" },
  ])
  
  const [isLoading, setLoading] = useState(true);
  const [exData, setExData] = useState([{}]);
  const [userData, setUserData] = useState([{}]);
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => { setVisible(!visible) };
  
  const getUserData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch("http://203.150.107.212/user/all", requestOptions)
    const result = await response.text();
    const userdata = await JSON.parse(result); setUserData(userdata);
    console.log(result);
  }
  useEffect(() => {
    //getExData();
    getUserData();
    //  const dataInterval = setInterval(() => getExData(), 5 * 1000);
    //  return () => clearInterval(dataInterval);
  }, []);
  const handleNotification = () => {
    {
      // PushNotification.cancelAllLocalNotifications()

      PushNotification.localNotification(
        {
          channelId: 'test-channel',
          title: 'Your'  + 'order No.999',
          message: 'READ MORE...',
          bigText: 'There is a list of products you need to make a decision on.',
          color: 'orange',
          playSound: false, // (optional) default: true
        }
      )
      PushNotification.localNotificationSchedule({
        channelId: 'test-channel',
        title: 'Your' + 'order No.999',
        message: "My Notification Message", // (required)
        date: new Date(Date.now() + (20 * 1000)), // in 60 secs
        actions: ["ReplyInput"],
        reply_placeholder_text: "Write your response...", // (required)
        reply_button_text: "Reply", // (required)
        allowWhileIdle: true,
        playSound: false, // (optional) default: true
      });
      PushNotification.getChannels(function (channel_ids) {
        console.log(channel_ids); // ['channel_id_1']
      });

      
     //  navigation.navigate('myRental', { paramKey: items })
    }
  }
  handleNotification();
  const Header = () => {
    return (
      <View style={styles1.header}>
        <View style={styles1.header_text}>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('mainPage')}>
            <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles1.text}>                           Location</Text>
          {/* <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('notify')}>
            <Icon name="bell" size={30} />
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }
  const Body = () => {
    return (
      <View style={styles1.body}>
        <View styles={styles1.body_shadow}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 13.9411105,
              longitude: 100.6403282,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>

            <Marker
              coordinate={{ latitude: 13.943206, longitude: 100.6516846 }}
              image={require('../../images/banner/user_onMap.png')}
              title="Excavator01"
              description="tel: 082-1234567"></Marker>
            <Circle
              center={{ latitude: 13.943206, longitude: 100.6516846 }}
              radius={1500}
              fillColor={'rgba(200, 300, 200, 0.5)'}
              strokeWidth={0}
            />

            <Marker
              coordinate={{ latitude: 13.9411105, longitude: 100.6403282 }}
              image={require('../../images/banner/map_mark.png')}
              title="Excavator01"
              description="tel: 082-1234567"
              onCalloutPress={() => navigation.navigate('inSpect')}>

            </Marker>

            <Marker
              coordinate={{ latitude: 13.9364533, longitude: 100.641779 }}
              image={require('../../images/banner/map_mark.png')}
              title="Excavator02"
              description="tel: 082-1234567">

              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>Excavator02</Text>
                    {/* <Text>A short description</Text> */}
                    <Image
                      style={styles.image}
                      source={require('../../images/excavators/excavator2.jpg')}
                    />
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          </MapView>
          {/*  under googleMap */}
          <View style={styles1.body_text}>
            <View style={styles1.body_text_inside}>
              <Text style={styles1.text_inside}>Name :
                {/* <Text style={styles1.text_2inside}> {userData[1].username}</Text> */}
              </Text>
              {/* <Text style={styles1.text_2inside}> {userData[1].username}</Text> */}
            </View>
          </View>
          <View style={styles1.body_text}>
            <View style={styles1.body_text_inside}>
              <Text style={styles1.text_inside}>Telephone :
                {/* <Text style={styles1.text_2inside}> {userData[1].tel}</Text> */}
              </Text>
              {/* <FlatList data={exData}
                    renderItem={({item}) => (    
                    <TouchableOpacity style={styles.listitem}>
                        <View style={styles.listview}>                            
                            <Text style={styles1.text_inside}>
                                 hi
                            </Text>
                        </View>
                            </TouchableOpacity>)}/>  */}
            </View>
          </View>
        </View>
        <View style={styles1.body_text}>
          <View style={styles1.body_text_inside}>
            <Text style={styles1.text_inside}> Detail :</Text>
            {/* <Text>{exData.data.row[2].price.Daily}</Text> */}
            {/* <Text style={styles1.text_2inside}> Daily :
              <Text>  {exData.data.row[2].price.Daily}</Text>
            </Text>
            <Text style={styles1.text_2inside} > Weekly :
              <Text>  {exData.data.row[2].price.Weekly}</Text>
            </Text>
            <Text style={styles1.text_2inside}> Monthly :
              <Text>  {exData.data.row[2].price.Monthly}</Text>
            </Text> */}
            {/* <Text> detail: {exData.data.row[2].function.detail}</Text> */}
            {/* <Text>{userData[1].tel}</Text> */}
          </View>
        </View>
      </View>
    )
  }
  const Footer = () => {
    return (
      <View style={styles1.footer}>
        <TouchableOpacity style={styles1.btn_readmore}
          onPress={() => navigation.navigate('mainPage')}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles1.btn_readmore}
          onPress={toggleOverlay}>
          {/* <Icon name="arrow-right" size={30} /> */}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Accept</Text>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
            overlayStyle={{
              backgroundColor: '#eee',
              borderRadius: 20,
            }}>
            <View style={styles1.overlay_container}>
              <TouchableOpacity onPress={() => navigation.navigate('mainPage', { paramKey1: items })}>
                <ActivityIndicator size="large" color="#362222" />
                <Text style={styles1.text_loading}>กำลังดำเนินการ</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles1.container}>
      {/* header */}
      <Header />
      {/* body */}
      <Body />
      {/* footer */}
      <Footer />
      <LinearProgress color="#ff69b4" />
    </View>
  );
}


const styles = StyleSheet.create({
  map: {
    height: '65%'
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
    borderTopColor: '#007a87',
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
});

const styles1 = StyleSheet.create({
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
    width: "100%",
    height: 68,
    flexDirection: 'row',
    backgroundColor: '#ffd700',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10 ,
  },
  body: {
    flex: 0.85,
    backgroundColor: '#eeeeee',
  },
  body_shadow: {
    flex: 1,
  },
  footer: {
    flex: 0.08,
    backgroundColor: '#eeee',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  footer_btn: {
    flex: 0.8,
    backgroundColor: '#eeee',
    borderRadius: 7,
  },
  //another style without header/body/footer
  scroll_view: {
    width: '90%',
    backgroundColor: '#ffff',
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
    borderRadius: 10
  },
  textaddbtn: {
    padding: 7,
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#2f4f4f',
  },
  btn_readmore: {
    backgroundColor: '#ffd700',
    width: "25%",
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10 ,
  },
  body_text: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  body_text_inside: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
    backgroundColor: '#eee',
    padding: 10,
    shadowOffset: { width: 2, height: 2 },
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
  text: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#2f4f4f'
  },
  overlay_container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  text_loading: {
    fontSize: 22,
    color: "#a9a9a9",
  },
})

export default getDetail;