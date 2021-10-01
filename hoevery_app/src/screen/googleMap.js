import React, { Component, useState,useEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';
import { LinearProgress, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
// export default class googleMap extends Component {
const googleMap = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [exData, setExData] = useState([{}]);



  const getExData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("http://203.150.107.212/tenant/get-car-with-type?typeOfWork=dig%20a%20canal", requestOptions)
      .then(response => response.text())
      .then(result => { console.log(result);
        var data = JSON.parse(result);
        setExData(data); alert((data.data.row[1].owner_id))
      })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    getExData();
    //  const dataInterval = setInterval(() => getExData(), 5 * 1000);
    //  return () => clearInterval(dataInterval);
  }, []);


  return (
    <View style={styles1.container}>
      {/* header */}
      <View style={styles1.header}>
        <Text style={styles1.header_text}> LOCATION </Text>
      </View>
      {/* body */}
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
              {/* <FlatList
                data={exData}
                renderItem={({ item }) => (
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2f4f4f' }}> EX ID : {item.data} </Text>
                )}
              /> */}            
              {/* <Text> See Job : {exData.data.row[1].price.Daily}</Text> */}
             
              {/* <Text> {exData.data.row}</Text> */}
            </View>
          </View>
          <View style={styles1.body_text}>
            <View style={styles1.body_text_inside}>
              {/* <FlatList
                data={exData}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2f4f4f' }}> Type job : {item.data} </Text>
                )}
              /> */}
            </View>
          </View>
          {/* <Text style={{fontSize:20,fontWeight:'bold', alignSelf:'flex-start'}}>   Provider : </Text>
        <Text style={{fontSize:20,fontWeight:'bold', alignSelf:'flex-start'}}>   Customer : </Text> */}
          <Text> Type job : </Text>
        </View>
      </View>
      <View style={styles1.footer}>
        <TouchableOpacity style={styles1.btn_readmore}
          onPress={() => navigation.navigate('inSpect')}>
          <Icon name="arrow-right" size={30} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#ffd700',
    flex: 0.1,
    shadowColor: 'black'
  },
  header_text: {
    fontSize: 24,
    alignSelf: 'center',
    padding: 10
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
    justifyContent: 'center',
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
    shadowOffset: { width: -10, height: -10 },
    shadowColor: '#000',
    shadowOpacity: 2.0,
    shadowRadius: 2.0,
    elevation: 50,
  },
  body_text: {
    flex: 0.6,
    flexDirection: 'row',
    backgroundColor: '#362222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body_text_inside: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
    backgroundColor: '#eee',
    padding: 10,
  }
})

export default googleMap;