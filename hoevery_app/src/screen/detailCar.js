import React, {useState} from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Icon from  'react-native-vector-icons/dist/FontAwesome'
import {styles} from '../style';
import {Picker} from '@react-native-picker/picker';
const  detailCar = ({addItem}) => { 
    const [text_excavator_name, setText_excavator_name] = useState();
    const onChange = textValue => setText_excavator_name(textValue);
    return (
        <View style={styles.container}>
          {/* header */}
            <View style={styles1.header}>
                <View style={styles1.btnboxtext}>
                  <Text style={styles1.text_header}> Add a new  information </Text>                          
                </View>
            </View>
          {/* body  */}
            <View style={{backgroundColor: 'white',flex:0.1}}></View>
               <View styles={styles1.body}> 
               <View styles={styles1.box_view}>
                        <View style={styles1.infobox1}>          
                                <Text style={styles1.inputtext}>Excavator name (type of excavator) </Text>
                                <TextInput style={styles1.inputtext} placeholder="Enter Car Name"
                                 onChangeText={onChange}/>
                                <Text style={styles1.inputtext}>Version of excavator</Text>
                                <TextInput style={styles1.inputtext} placeholder="Enter version.."
                                 onChangeText={onChange}/>
                                <Text style={styles1.inputtext}>Car brand </Text>
                                <TextInput style={styles1.inputtext} placeholder="Enter Car brand"
                                 onChangeText={onChange}/>
                                <Text style={styles1.inputtext}>Head drill  </Text>
                                <TextInput style={styles1.inputtext} placeholder="Enter Head drill"
                                 onChangeText={onChange}/>  
                        </View>                    
                </View>                     
             </View> 
         {/* footer */}
          <View style={{backgroundColor: 'white',flex:0.1}}></View>
            <View style={styles1.footer}> 
            <TouchableOpacity style={styles1.marginbtn}
             onPress={() => ({})}
                        // onPress={()=> navigation.navigate('detailCar')}
                        >
                  <Text style={styles.textsavebtn}> SAVE </Text>                          
                </TouchableOpacity>
            </View>

            {/* <TextInput 
                style={styles.input} onChangeText={onChange}
                placeholder='Please enter 0-9'
                placeholderTextColor='skyblue'
                maxLength={10}
                underlineColorAndroid='gold'
                textAlign='center'
                autoCorrect={false}
                allowFontScaling={false} 
                />
                <TextInput 
                placeholder="Version"
                ></TextInput> */}
                    {/* <TouchableOpacity style={styles.btn}
                onPress={() => addItem(text)}>
                    <Text style={styles.btnText}>
                         Additem...
                    <Icon name="plus" size={20}/>
                        </Text>                
            </TouchableOpacity> */}
        </View>
    )
}

const styles1 = StyleSheet.create({
    header : {
        backgroundColor:'white',
        flex:0.2
    },
    body :{
        flex: 1,
        backgroundColor: 'green', 

    },
    footer :{
        flex:0.2,
        backgroundColor:'white',

    },
    view_box :{
        flex:1
    },
    box_view : {
        flex:1,
        backgroundColor: 'red'
    },
    inputtext:{
        padding:15,
        fontSize:18,
        backgroundColor:'white'
    },
    infobox1:{
        width: "100%",
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius:10
    },
    scroll_view :{
        width: '90%',
        backgroundColor: '#ffff',
        marginHorizontal: 20,
    },
    textaddbtn: {
        padding:15,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        color:'#2f4f4f'
      },
      textsavebtn:{
        padding:15,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'center',
        color:'#2f4f4f'
      },
      btnboxtext:{
          padding:10,
          flex:1,
          backgroundColor:'white',
      },
      text_header:{
        fontSize: 18,
        fontWeight: 'bold',
        color:'#2f4f4f',
        padding: 10
      },
      inputtext:{
        padding: 10,
        fontWeight:'bold',
        fontSize: 16
      },
      marginbtn:{
        flex:  0.7,
        padding:5,
        backgroundColor: '#F1CA89',
        justifyContent: 'center',
        alignSelf:'stretch',
        alignItems:'center',
        borderRadius:12
    },
    
})

export default detailCar;
