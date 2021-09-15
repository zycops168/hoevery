import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,FlatList} from 'react-native'
import Icon from  'react-native-vector-icons/dist/FontAwesome'
import uuid from 'uuid-random'
export default function AddCar({navigation}) {

    const [item, setItem] = useState([
        {id: uuid(), text: "รถเบ๊น"},
        {id: uuid(), text: "รถเก๋ง"},
        {id: uuid(), text: "จักรยาน"},
        {id: uuid(), text: "มอไซด์"},
        {id: uuid(), text: "สามล้อ"},
        {id: uuid(), text: "สิบล้อ"}
    ])
    const [text, setText] = useState('');
    const onChange = textValue => setText(textValue);

    return (
        <View style={styles.screen}>
               <View style={styles.viewList}>
               <TouchableOpacity style={styles.header}>
                 <Text style={styles.text}> MY EXCAVATOR</Text>
                 <Icon name="plus" size={20}/>
               </TouchableOpacity>
        
                  <FlatList data={item}
                    renderItem={({item}) => (    
                    <TouchableOpacity style={styles.listitem}>
                        <View style={styles.listview}>
                         <Text style={styles.listtext}>{item.text}</Text>
                        </View>
                            </TouchableOpacity>)}/> 
                         </View>
                        <View>
                        <TouchableOpacity style={styles.roundButton1} 
                        onPress={()=> navigation.navigate('detail')}>
                            <Icon name="plus" size={30}/>
                        </TouchableOpacity>
                    </View>
           </View>
    )
}

const styles = StyleSheet.create({
    roundButton1: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 80,
        backgroundColor: 'orange',
        position: 'absolute',
        right:20,
        bottom: 20
      },
        add: {
          fontSize:30
        },
        screen: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: Platform.OS === 'ios' ? 25 :15,
           // paddingBottom: 40
            backgroundColor:'black'
          },
          header : {
            width:"80%",
            height:50,
            flex :1,
            backgroundColor:'#CC9B6D',
            alignItems: 'center',
            alignSelf:  'center',
            borderRadius: 30
            
        
          },
          viewList: {
            width:"100%",
            height:50,
            flex:5,
            backgroundColor: '#ffffe0',
            borderRadius:20
            
          },
          text: {
            padding:20,
            fontSize: 30,
            justifyContent: 'center',
            alignSelf:'center'
          },
          listitem: {
            padding:20,
            backgroundColor: '#ffffe0',
            //borderBottomWidth: 1
           alignSelf:'center',
           
        },
        listview: {
           flexDirection: 'column',
           justifyContent: "space-between",
        },
        listtext: {
           fontSize: 20
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
