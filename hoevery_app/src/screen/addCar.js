import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,FlatList, TouchableOpacityBase} from 'react-native'
import Icon from  'react-native-vector-icons/dist/FontAwesome'
import uuid from 'uuid-random'
export default function AddCar({navigation,item}) {

    const [items, setItems] = useState([
        {id: uuid(), text: "รถเบ๊น"}
    ])


    return (
              //  {/* <View style={styles.viewList}>
              //  <TouchableOpacity  style={styles.header}>
              //    <Text style={styles.text}>  MY EXCAVATOR</Text>
              //  </TouchableOpacity>
              //     <FlatList data={items}
              //       renderItem={({item}) => (    
              //       <TouchableOpacity style={styles.listitem}>
              //           <View style={styles.listview}>                            
              //               <Text style={styles.listtext}>
              //               <Icon name="edit" size={18}/>   
              //                       {item.text}
              //               <Icon name='remove' size={20} color='red'
              //    onPress={() => deleteItem(item.id)}/>   
              //               </Text>
              //           </View>
              //               </TouchableOpacity>)}/> 
              //            </View>
              //           <TouchableOpacity style={styles.footer}
              //           onPress={()=> navigation.navigate('detailCar')}>
              //              <Text style={styles.textaddbtn}> ADD NEW EXCAVATOR </Text>                          
              //           </TouchableOpacity>
              //           <View style={styles.pad_bot}>
              //               <Text>-</Text>
              //           </View>
              //           <View style={styles.container}> */}
        <View style={styles.container}>                                  
            {/* header */}
            <View style={styles.header}>
            <View  style={styles.header_text}>
            <TouchableOpacity styles={{}} 
              onPress={() => navigation.navigate('mainPage')}>
            <Icon name="arrow-left" size={30}/>  
            </TouchableOpacity>
                 <Text style={styles.text}>MY EXCAVATOR</Text>
               </View>           
            </View>
            {/* body */}
            <View style={styles.body}>       
          <View style={styles.viewList}>
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
            </View>
          {/* footer */}
          <View style={styles.footer}>
             <TouchableOpacity style={styles.footer_btn}
                      onPress={()=> navigation.navigate('detailCar')}>
                  <Text style={styles.textaddbtn}> ADD NEW EXCAVATOR </Text>                          
            </TouchableOpacity>                            
          </View>
            </View>
    )
}

const styles = StyleSheet.create({
  container : {
        flex:1 ,
        backgroundColor: '#fff'
    },
    header : {
      backgroundColor:'#fff',
      flex: 0.11,
      flexDirection:'row',
      shadowColor: 'black',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 1.22,
      elevation: 70,   
      borderColor: '#787A91',
      borderRadius:10,
      borderTopWidth: 0.4,
  },
    body : {
        flex: 0.8,
        backgroundColor:'#fffaf0' ,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    footer : {
        flex: 0.1,
        backgroundColor:'#fff'
    },
    footer_btn : {
      flex:0.8,
      backgroundColor: 'gold',
      borderRadius : 10 
    },
    pad_bot:{      
        backgroundColor:'white',
        alignSelf:'stretch'
    },
    add: {
       fontSize:30
    },
    header_text:{
      padding:10,
      flex:1,
      flexDirection: 'row',
      backgroundColor:'#EEEEEE',
      borderRadius:10,
      justifyContent: 'flex-start',
      alignItems:'center',
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
       fontSize: 18,
       paddingTop: 15,
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
