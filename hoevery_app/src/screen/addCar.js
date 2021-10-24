import React, { useState, useEffect, Profiler } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import uuid from 'uuid-random';
import Cookie from 'react-native-cookie';

import { COLORS, SIZES, FONTS, icons, images } from '../constants';

export default function AddCar({ navigation, route }) {

  const [isLoading, setLoading] = useState(true);
  const [exData, setExData] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    getExData();
    getNotiData();
    // const dataInterval = setInterval(() => getExData(), 5 * 1000);
    // return () => clearInterval(dataInterval);
  }, []);
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
  const getNotiData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const cookie = await Cookie.get('203.150.107.212');
    console.log(cookie);
    const response = await fetch(`http://203.150.107.212/lessor/order?username=${cookie['username']}`, requestOptions)
    const result = await response.text();
    const countData = await JSON.parse(result);
    setCount(countData.data);
    console.log("count : ", countData.data.waiting);

  }

  const DeleteExcaData = async (id) => {

    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    console.log("id:, ", id);
    const response = await fetch(`http://203.150.107.212/lessor/delete-car?car_id=${id}`, requestOptions);
    const result = await response.json();
    console.log("result", result);
    setExData(prevItems => {
      return prevItems.filter(item => item.id != id)
    })
  }

  const Badge = () => { // count
    return (
      <View style={
        {
          width: 19,
          height: 19,
          borderRadius: 18,
          backgroundColor: 'red',
          position: 'absolute',
          left: 15,
          top: -5,
          justifyContent: 'center',
          alignItems: 'center',
        }
      }>
        <Text style={
          {
            color: "#fff",
            fontSize: 13,
          }
        }>
          {count.waiting}
        </Text>

      </View>
    )
  }
  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.header_text}>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('mainPage')}>
            <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.text}>รายการรถที่เพิ่ม</Text>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('notify')}>
            <Icon name="bell" size={30} />
            <FlatList
            data={count}
            renderItem={({item}) => (
              <View style={
                {
                  width: 19,
                  height: 19,
                  borderRadius: 18,
                  backgroundColor: 'red',
                  position: 'absolute',
                  left: 15,
                  top: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              }>
                <Text style={
                  {
                    color: "#fff",
                    fontSize: 13,
                  }
                }>
                  {item.waiting}
                </Text>
        
              </View>
            )}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footer_btn}
          onPress={() => navigation.navigate('detailCar')}>
          <Text style={styles.textaddbtn}>เพิ่มรถ</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.header_text}>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('mainPage')}>
            <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.text}>รายการรถที่เพิ่ม</Text>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('notify')}>
            <Icon name="bell" size={30} />
            <Badge/ >
{/*             
            <FlatList
            data={count}
            renderItem={({item}) => (
              <View style={
                {
                  width: 19,
                  height: 19,
                  borderRadius: 18,
                  backgroundColor: 'red',
                  position: 'absolute',
                  left: 15,
                  top: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              }>
                <Text style={
                  {
                    color: "#fff",
                    fontSize: 13,
                  }
                }>
                  {item.waiting}10
                </Text>
              </View>
            )}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
      {/* body */}
      {/* <Body /> */}
      <View style={styles.body}>
        <View style={
          {
            width: "90%",
            height: "100%",
            backgroundColor: '#fff',
            alignItems: 'flex-end',
            borderRadius: 15,
            shadowOffset: { width: 2, height: 2 },
            shadowColor: '#ff4500',
            shadowOpacity: 5.0,
            shadowRadius: 5.0,
            elevation: 20,
          }
        }>
          <FlatList
            data={exData}
            deleteItem={DeleteExcaData}
            renderItem={({ item }) => (
              <View style={
                {
                  flex: 1,
                  backgroundColor: '#ffff',
                  padding: 10,

                }
              }>
                <View style={
                  {
                    width: 310,
                    height: 100,
                    backgroundColor: COLORS.primary,
                    borderRadius: 10,
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: 'black',
                    shadowOpacity: 5.0,
                    shadowRadius: 5.0,
                    elevation: 10,
                    left: 10,
                    flexDirection: 'row',
                  }
                }>
                  <TouchableOpacity style={
                    {
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingRight: 15,
                    }
                  }
                  >
                    <View>
                      <Image
                        style={
                          {
                            width: 80,
                            height: 50,
                          }
                        }
                        source={require('../../assets/images/type_ex/1_crawler.png')}
                        onPress={() => { }}
                        borderRadius={10}
                      />
                    </View>
                    <TouchableOpacity style={
                      {
                        flexDirection: 'column',
                        padding: 5,
                      }
                    }>
                      <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 'bold' }}>Car ID : </Text>{item.id}</Text>
                      <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 'bold' }}>Type : </Text>{item.type} </Text>
                    </TouchableOpacity>
                    <View style={
                      {
                        width: 50,
                        height: 60,
                        backgroundColor: COLORS.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    }>
                      <TouchableOpacity style={
                        {
                          width: 50,
                          height: 20,
                          backgroundColor: COLORS.green,
                          borderRadius: 3,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }
                      }>
                        <Text style={
                          {
                            fontSize: 13,
                            fontWeight: 'bold',
                          }
                        }> alway </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          {
                            alignSelf: 'center',
                            backgroundColor: COLORS.primary,
                            padding: 10,
                          }
                        }
                        onPress={() => DeleteExcaData(item.id)}
                      >
                        <Icon name="bitbucket" size={30} color="red" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        </View>
      </View >
      {/* footer */}
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    flex: 0.11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  body: {
    flex: 0.8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  footer: {
    flex: 0.1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // another style
  body_fetch: {
    flex: 1,
    width: '90%',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  item: {
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1.22,
    shadowRadius: 1.22,
    elevation: 50,
  },
  footer_btn: {
    width: '90%',
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
  pad_bot: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
  },
  add: {
    fontSize: 30,
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
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 5.0,
    shadowRadius: 5.0,
    elevation: 10,
  },
  text: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: COLORS.drakgreen,
  },
  textaddbtn: {
    fontSize: 18,
    paddingTop: 15,
    alignSelf: 'center',
    color: COLORS.drakgreen,
  },
  listtext: {
    fontSize: 16,
  },
  text_fetch: {
    fontSize: 20,
  },
});

