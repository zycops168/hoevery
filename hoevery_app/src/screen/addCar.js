import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,FlatList} from 'react-native'
import Icon from  'react-native-vector-icons/dist/FontAwesome'
import uuid from 'uuid-random'
export default function AddCar({navigation,item}) {

    const [items, setItems] = useState([
        {id: uuid(), text: "รถเบ๊น"}
    ])

  
    return (
        <View style={styles.screen}>
               <View style={styles.viewList}>
               <TouchableOpacity  style={styles.header}>
                 <Text style={styles.text}>  MY EXCAVATOR</Text>
               </TouchableOpacity>
                  <FlatList data={items}
                    renderItem={({item}) => (    
                    <TouchableOpacity style={styles.listitem}>
                        <View style={styles.listview}>                            
                            <Text style={styles.listtext}>
                            <Icon name="edit" size={18}/>   
                                    {item.text}
                            <Icon name='remove' size={20} color='red'
                 onPress={() => deleteItem(item.id)}/>   
                            </Text>
                        </View>
                            </TouchableOpacity>)}/> 
                         </View>
                        <TouchableOpacity style={styles.footer}
                        onPress={()=> navigation.navigate('detailCar')}>
                           <Text style={styles.textaddbtn}> ADD NEW EXCAVATOR </Text>                          
                        </TouchableOpacity>
                        <View style={styles.pad_bot}>
                            <Text>-</Text>
                        </View>
           </View>
    )
}

const styles = StyleSheet.create({
    pad_bot:{      
        backgroundColor:'white',
        alignSelf:'stretch'
    },
    footer:{
        flex:0.4,
        backgroundColor: '#F1CA89',
        justifyContent: 'center',
        alignSelf:'stretch',
        borderRadius:12
    },
    roundButton1: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'stretch',
        paddingBottom: 20,
         borderRadius: 80,
        backgroundColor: 'orange',
        
        // position: 'absolute',
        // right:20,
        // bottom: 20
      },
        add: {
          fontSize:30
        },
        screen: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: Platform.OS === 'ios' ? 25 :0,
           // paddingBottom: 40
            backgroundColor:'white'
          },
          header : {
            flex :0.2,
            backgroundColor:'#fff8dc',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf:  'stretch',
            borderRadius: 13,
          },
          viewList: {
            width:"100%",
            height:20,
            flex:5,
            backgroundColor: 'white',
          
            
          },
          text: {
            padding:5,
            fontSize: 18,
            fontWeight: 'bold',
            alignSelf:'center',
            color:'#2f4f4f'
          },
          textaddbtn: {
            padding:15,
            fontSize: 16,
            justifyContent: 'center',
            alignSelf:'center',
            color:'#2f4f4f'
          },
          listitem: {
            padding:20,
            backgroundColor: 'white',
           alignSelf:'stretch',
           borderBottomWidth: 1,
           borderColor: '#eee'
          
           
        },
        listview: {
           flexDirection: 'row',
           justifyContent: 'space-between',
        },
        listtext: {
           fontSize: 16
        }  


})


// import React, { Component,useState} from 'react'
// import { Text, StyleSheet, View,TouchableOpacity,FlatList } from 'react-native'
// import Icon from  'react-native-vector-icons/dist/FontAwesome'

// export default class AddCar extends Component {
//     render() {

//         const [item, setItem] = useState([])
//         return (
//           <View style={styles.screen}>
//       <View style={styles.viewList}>
//       <TouchableOpacity style={styles.header}>
//         <Text style={styles.text}> MY EXCAVATOR</Text>
//         <Icon name="plus" size={20}/>
//       </TouchableOpacity>

//          <FlatList data={item}
//       renderItem={({item}) => (<ListItem item={item}/>)}/> 
//        <View style={{width:50, height:50, backgroundColor: 'red',alignItems:'flex-start',alignSelf:'flex-start'}}></View>
//       </View>
//            <View>
//         <Add_car/>
//       </View>
//   </View>
//         )
//     }
// }

// const styles = StyleSheet.create({roundButton1: {
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 80,
//     backgroundColor: 'orange',
//     position: 'absolute',
//     right:20,
//     bottom: 20
//   },})
