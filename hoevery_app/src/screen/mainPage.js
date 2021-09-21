import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import {styles} from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';

const  mainPage= ({navigation}) => {
    return (
        // all of body is header/body/footer
        <View style={styles.container}>
      {/* header */}
            <View style={styles1.header}>
            <Text style={[styles.text_header1, {color: '#DA1503'}]}>HOE</Text>
            <Text style={[styles.text_header1, {color: '#F1CA89'}]}>VERY</Text>
            </View>
       {/* body */}
            <View style={styles1.body}>
                <View style={styles1.rent_btn}>
                <TouchableOpacity style={styles1.footer}
                      onPress={()=> navigation.navigate('AddCar')}>
                    <Icon name="user" size={50} color="#900" /> 
                    {/* <Text styles={styles1.text_select}>Provider</Text>   */}
                    </TouchableOpacity>     
                </View>       
                <View style={styles1.customer_btn}>
                    <TouchableOpacity style={styles1.footer}
                      onPress={()=> navigation.navigate('findCar')}>
                    <Icon name="car" size={50} color="#900" />   
                    {/* <Text style={styles1.text_select}> Customers</Text> */}
                    </TouchableOpacity>   
                </View>
                </View>
        {/* footer */}
            <View style={styles1.footer}></View>
        </View>
    )
}

const styles1 = StyleSheet.create({
    header : {
        flex:0.2,
        backgroundColor: 'white'
    },
    body : {
        flex:1,
        flexDirection:'row',
        backgroundColor:'#ffff',
        justifyContent: 'space-around', //y
        alignItems: 'center',  //x
        borderRadius:5
    },
    bodyInside : {
        width: 350,
        height: 540,
        backgroundColor: 'red',
        borderRadius:10
    },  
    footer : {
        flex:0.1,
        backgroundColor: '#ffff',

    },
    rent_btn : {
    
    },
    customer_btn : {

    },
    textaddbtn: {
        padding:15,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf:'center',
        color:'#2f4f4f'
      },
    text_select : {
        fontSize: 18,
        
    }
})
export default mainPage;


