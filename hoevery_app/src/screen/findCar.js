import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {LinearProgress, Button, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Cookie from 'react-native-cookie';
import Geolocation from '@react-native-community/geolocation';

import TypeWorkModel from '../models/TypeWorkModel';
import WorkController from '../controller/WorkController';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {styles} from '../style';

const findCar = ({navigation}) => {
  const [myCookie, setMyCookie] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [error, setError] = useState();
  const getCookie = async () => {
    const cookie = await Cookie.get('203.150.107.212');
    setMyCookie(cookie);
    console.log('cookie on findCar screen ;', cookie);
    return cookie;
  };
  console.log('cookie on findCar loop screen :', myCookie);

  const [pickerValue, setPickerItemValue] = useState('click..');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => setError(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
      );
    }, 1000);
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const getExData = () => {
    var work = new TypeWorkModel();
    console.log('latidude ' + latitude);
    console.log('longitude ' + longitude);
    if (pickerValue != 'none') {
      work.workname = pickerValue;
      WorkController.setWork(work);
      navigation.navigate('listCar', {
        lat: latitude,
        long: longitude,
      });
    }
  };
  const unused = () => {
    fetch(
      `http://203.150.107.212/tenant/get-car-with-type?typeOfWork=${pickerValue}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        try {
          const responseJson = JSON.parse(result);
          console.log(responseJson.data.row[0].id);
          count = responseJson.data.count;
          if (responseJson.ret == 0) {
            var count = responseJson.data.count;
            var car = new TypeCarModel();
            for (let i = 0; i < count; i++) {
              (car.id = responseJson.data.row[i].id),
                (car.owner_id = responseJson.data.row[i].owner_id),
                (car.carname = responseJson.data.row[i].carname),
                (car.type = responseJson.data.row[i].type),
                (car.size = responseJson.data.row[i].size),
                (car.price_daily = responseJson.data.row[i].price.Daily),
                (car.price_weekly = responseJson.data.row[i].price.Weekly),
                (car.price_monthly = responseJson.data.row[i].price.Monthly),
                (car._function = responseJson.data.row[i].function),
                (car.image = responseJson.data.row[i].image),
                (car.longitude = responseJson.data.row[i].longitude),
                (car.latitude = responseJson.data.row[i].latitude);
              CarController.setListCar(car);
            }

            navigation.navigate('listCar');
          }
        } catch (err) {
          alert(err);
        }
      })
      .catch(error => console.log('error', error));
    // wait write condition for check when change page
    // navigation.navigate('listCar');
  };

  const Check_getExData = pickerValue => {
    if (pickerValue != 'none') {
      getExData();
      getCookie();
    } else {
      alert('Select Type Work');
    }
  };

  const Header = () => {
    {
      return (
        <View style={styles1.header}>
          <View style={styles1.header_easy_find}>
            <TouchableOpacity
              styles={{}}
              onPress={() => navigation.navigate('mainPage')}>
              <Icon name="arrow-left" size={30} />
            </TouchableOpacity>
            <Text style={[styles.text_header1, {color: COLORS.secondary}]}>
              EASY
            </Text>
            <Text style={[styles.text_header1, {color: COLORS.primary}]}>
              FIND
            </Text>
          </View>
        </View>
      );
    }
  };
  const Body = () => {
    return (
      <View style={styles1.body}>
        <Picker
          style={styles1.picker}
          selectedValue={pickerValue}
          onValueChange={itemValue => setPickerItemValue(itemValue)}>
          <Picker.Item label="Select Type Job.." value="none" />
          <Picker.Item
            label="Natural canal dredging"
            value="Natural canal dredging"
          />
          <Picker.Item
            label="Dig a drainage hole"
            value="dig a drainage hole"
          />
          <Picker.Item label="Dig soil/Soft soil" value="Dig soilSoft soil" />
          <Picker.Item label="Dig a canal" value="dig a canal" />
          <Picker.Item
            label="Dig a drainage hole"
            value="dig a drainage hole"
          />
          <Picker.Item
            label="Min soil pebble limestone mineral rock"
            value="Min soil pebble limestone mineral rock"
          />
          <Picker.Item
            label="Move dispose material in a place where space is limited"
            value="Move dispose material in a place where space is limited"
          />
          <Picker.Item label="Crowded" value="Crowded" />
        </Picker>
      </View>
    );
  };
  const Body_find_btn = () => {
    return (
      <View styles={styles1.body2}>
        <TouchableOpacity
          style={styles1.find_btn}
          onPress={() => Check_getExData()}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Find</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Footer = () => {
    return <View style={styles1.footer}></View>;
  };
  return (
    // all of body 3 section header/body/footer
    <View style={styles1.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {/* header */}
      <Header />
      {/* body */}
      <Body />
      <Body_find_btn />
      {/* footer */}
      <Footer />
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flex: 0.3,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
  },
  header_btn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header_easy_find: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  body: {
    flex: 0.6,
    backgroundColor: COLORS.white,
  },
  body2: {
    flex: 0.1,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  footer: {
    flex: 0.08,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  picker: {
    alignSelf: 'center',
    width: '90%',
    height: 50,
    borderColor: 'red',
    borderWidth: 10,
    backgroundColor: COLORS.white,
    borderWidth: 10,
    borderColor: '#000',
  },
  text_header: {
    fontSize: 20,
  },
  next_button: {
    flex: 0.7,
    padding: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 12,
  },
  find_btn: {
    backgroundColor: COLORS.primary,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
});

export default findCar;

//example fetchdata api
// import React, { useEffect, useState } from 'react';
// import { FlatList, Text, View } from 'react-native';

// export default findCar = ({navigation}) => {
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   console.log(data);

//   useEffect(() => {
//     fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
//       .then((response) => response.json())
//       .then((json) => setData(json))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }, []);

//   return (

//     <View style={{ flex: 1, padding: 24 }}>
//       {isLoading ? <Text>Loading...</Text> :
//       ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
//           <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.title}</Text>
//           <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
//           <FlatList
//             data={data.articles}
//             keyExtractor={({ id }, index) => id}
//             renderItem={({ item }) => (
//               <Text>{item.id + '. ' + item.title}</Text>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// };