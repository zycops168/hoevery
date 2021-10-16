import React, {useState, useEffect, Profiler} from 'react';
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

import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default function AddCar({ navigation, route }) {

  const [items, setItems] = useState([
    { id: uuid(), text: "รถเบ๊น" },
    { id: uuid(), text: "รถเบ๊น" },
    //   { id: uuid(), text: "รถเบ๊น" },
  ])
  const [Id_user, setId_user] = useState();
  const [isLoading, setLoading] = useState(true);
  const [exData, setExData] = useState([]);

  const getExData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch(`http://203.150.107.212/lessor/my-product?username=charmuar`, requestOptions,);
    console.log(response);
    const result = await response.json();
    console.log(result);
    try{
      if (result.ret == 0){
        setExData(result.data.row);
      }
      else {
        alert(result.msg);
      }
    }catch(err){
      alert(err)
    }
  }
  useEffect(() => {
    getExData();
    //  const dataInterval = setInterval(() => getExData(), 5 * 1000);
    //  return () => clearInterval(dataInterval);

  }, []);

  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.header_text}>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('Profiles')}>
            <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.text}>MY EXCAVATOR</Text>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate(
              'notify', { paramKey: items }
            )}>
            <Icon name="bell" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const Body = () => {
    return (
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
                    backgroundColor: '#ffd700',
                    borderRadius: 10,
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: 'black',
                    shadowOpacity: 5.0,
                    shadowRadius: 5.0,
                    elevation: 10,
                    left: 10,
                  }
                }>
                  <TouchableOpacity style={
                    {
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }
                  }
                    //   onPress  : wait  function 
                    onPress={() => { }}>
                    <Image
                      style={
                        {
                          width: 80,
                          height: 50,
                        }
                      }
                      source={require('../../images/type_ex/1_crawler.png')}
                      onPress={() => { }}
                      borderRadius={10}
                    />
                    <Text style={
                      {
                        fontSize: 20,
                      }
                    }>    {item.type}
                    </Text>
                    <View style={
                      {
                        width: 50,
                        height: 50,
                        backgroundColor: '#ffd700',
                        left: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }
                    }>
                      <Text style={
                        {
                          fontSize: 15,
                          fontWeight: 'bold',
                        }
                      }> test </Text>
                      <TouchableOpacity style={
                        {
                          width: 20,
                          height: 20,
                          backgroundColor: route.params.paramKey[1].text,
                          borderRadius: 100,
                          bottom: -10,
                        }
                      }>

                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )} />
        </View>
      </View >
    )
  }
  const Footer = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footer_btn}
          onPress={() => navigation.navigate('detailCar')}>
          <Text style={styles.textaddbtn}> ADD NEW EXCAVATOR </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Header />
      {/* body */}
      <Body />
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
    backgroundColor: 'gold',
    borderRadius: 10,
    shadowOffset: {width: 2, height: 2},
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
    shadowOffset: {width: 2, height: 2},
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

