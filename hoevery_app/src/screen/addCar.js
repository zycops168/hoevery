import React, { useState, useEffect, Profiler } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import uuid from 'uuid-random'
export default function AddCar({ navigation, item }) {

  const [items, setItems] = useState([
    { id: uuid(), text: "รถเบ๊น" }
  ])
  const [Id_user, setId_user] = useState();
  const [isLoading, setLoading] = useState(true);
  const [exData, setExData] = useState({});


  // wait  parse parameter on line 19
  const getExData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://203.150.107.212/lessor/my-product?username=charmuar", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        var data = JSON.parse(result);
        setExData(data); // alert((data.data.row[1].price.Daily))
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
          <Text style={styles.text}>MY EXCAVATOR</Text>
          <TouchableOpacity styles={{}}
            onPress={() => navigation.navigate('notify')}>
            <Icon name="bell" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {/* body */}
      <View style={styles.body}>
        <View style={styles.body_fetch}>
        <FlatList data={items}
                    renderItem={({item}) => (    
                    <TouchableOpacity style={styles.listitem}>
                        <View style={styles.listview}>                            
                            <Text style={styles.listtext}>
                                    {item.text}                          
                            </Text>
                        </View>
                            </TouchableOpacity>)}/> 
             {/* <Text style={styles.text_fetch}> ID :{exData.data.row[1].id}</Text> 
             <Text style={styles.text_fetch}> Type :{exData.data.row[1].type}</Text>
              <Text style={styles.text_fetch}> Function : {exData.data.row[1].function.Type}, {exData.data.row[1].function.WeightAll} kg</Text> 
              <Text style={styles.text_fetch}> {exData.data.row[1].function.WeightAll} kg</Text> 
              <Text style={styles.text_fetch}> {exData.data.row[1].function.Engine}</Text> 
              <Text style={styles.text_fetch}> {exData.data.row[1].function.HorsePower}</Text>  */}
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
    backgroundColor: '#eee',
    padding: 20,

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
    backgroundColor: '#ffd700',
    borderRadius: 10,
    justifyContent: 'space-between',
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
  },
  text_fetch :{
    fontSize: 20,
    
  }


})

