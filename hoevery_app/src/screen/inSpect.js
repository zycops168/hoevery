import React,{useState} from 'react';
import { StyleSheet, View,Text ,TouchableOpacity, } from 'react-native';
// import { Slider } from 'react-native-elements';
import {Icon} from 'react-native-vector-icons';
export default function total({navigation}) {
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.header_text}>inspect </Text>
            </View>
            {/* body */}
            <View style={styles.body}>
              
            </View>
            {/* footer */}
            <View style={styles.footer}>
                <View style={styles.footer_btn}>
                       <TouchableOpacity style={styles.textaddbtn}
                        onPress={()=> navigation.navigate('total')}>
                           <Text style={styles.textaddbtn}> Total The Bill </Text>                          
                        </TouchableOpacity>
            </View>
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
        backgroundColor:'#f5f5f5' ,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    footer : {
        flex: 0.1,
        backgroundColor:'#fff'
    },
    footer_btn : {
        flex:0.8,
        backgroundColor: '#ffd700',
        borderRadius : 10 
      },
    //another style without header/body/footer
    textaddbtn: {
        padding: 7,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf:'center',
        color:'#2f4f4f',
      },
    header_text:{
        fontSize: 24,
        alignSelf: 'center',
        padding: 10
    },
})
