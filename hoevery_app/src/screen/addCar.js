import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import uuid from 'uuid-random'
export default function AddCar({ navigation, item }) {

  const [items, setItems] = useState([
    { id: uuid(), text: "รถเบ๊น" }
  ])
  const [isLoading, setLoading] = useState(true);
  const [exData, setExData] = useState([{}]);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  // wait  parse parameter on line 19
  const getExData = () => {
    fetch(`http://203.150.107.212/lessor/my-product?username==${Id_user}`, requestOptions) // not defined Id_user
      .then(response => response.text())
      .then(result => {
        console.log(result);
        var data = JSON.parse(result)
        setExData(data); alert((data.username))
      })
      .catch(error => console.log('error', error));
    setLoading(false);
  }
  useEffect(() => {
    getExData();
    //  const dataInterval = setInterval(() => getExData(), 5 * 1000);
    //  return () => clearInterval(dataInterval);

  }, []);

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.header_text}>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('mainPage')}>
            <Icon name="arrow-left" size={30} />
          </TouchableOpacity>
          <Text style={styles.text}>                   MY EXCAVATOR</Text>
        </View>
      </View>
      {/* body */}
      <View style={styles.body}>
        <View style={styles.body_fetch}>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={exData}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>{item.username + '. ' + item.lastname} {item.tel} </Text>
              )}
            />

          )}
        </View>
      </View>
      {/* footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footer_btn}
          onPress={() => navigation.navigate('detailCar')}>
          <Text style={styles.textaddbtn}> ADD NEW EXCAVATOR </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#fff',
    flex: 0.11,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,
    elevation: 70,
    borderColor: '#787A91',
    borderRadius: 10,
    borderTopWidth: 0.4,
  },
  body: {
    flex: 0.8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  footer: {
    flex: 0.1,
    backgroundColor: '#fff'
  },
  // another style 
  body_fetch: {
    flex: 1,
    backgroundColor: '#fff',

  },
  item: {
    width: "100%",
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#362222',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1.22,
    shadowRadius: 1.22,
    elevation: 50,

  },
  footer_btn: {
    flex: 0.8,
    backgroundColor: 'gold',
    borderRadius: 10
  },
  pad_bot: {
    backgroundColor: 'white',
    alignSelf: 'stretch'
  },
  add: {
    fontSize: 30
  },
  header_text: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#2f4f4f'
  },
  textaddbtn: {
    fontSize: 18,
    paddingTop: 15,
    alignSelf: 'center',
    color: '#2f4f4f'
  },
  listtext: {
    fontSize: 16
  }


})
