import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../style';


const findCar = ({navigation}) => {

    const [ pickerValue, setPickerItemValue] = useState('click..')
    return (
        // all of body 3 section header/body/footer
        <View style={styles1.container}>   
        {/* header */}      
            <View style={styles1.header}> 
                    <Text style={[styles.text_header1, {color: '#DA1503'}]}>EASY</Text>
                    <Text style={[styles.text_header1, {color: '#F1CA89'}]}>FIND</Text>
            </View>
        {/* body */}   
            <View style={styles1.body}>
                    <Picker style={styles1.picker}
                        selectedValue={pickerValue}
                        onValueChange={(itemValue) => setPickerItemValue(itemValue)}
                    >
                        <Picker.Item label="Select Type Job.." value="..."/>
                        <Picker.Item label="Natural canal dredging" value="1"/>
                        <Picker.Item label="Dig a common hole/to make a base" value="2"/>
                        <Picker.Item label="Dig a canal" value="3"/>
                        <Picker.Item label="Dig a drainage hole" value="5"/>
                        <Picker.Item label="Dig soil/Soft soil" value="6"/>
                        <Picker.Item label="Min soil/pebble/limestone/mineral rock" value="7"/>       
                    </Picker>
                </View>
        {/* footer */}        
            <View style={styles1.footer}>
                <TouchableOpacity style={styles1.next_button}
                  onPress={()=> navigation.navigate('googleMap')}
                >
                    <Text style={{fontSize:18, alignSelf:'center'}}> Next </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles1 = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#ffff'
    },
    header : {
        flex:0.5,
        padding: 10
    },
    body : {
        flex: 1,
        backgroundColor:'#ffff'
    },
    picker : {
        alignSelf:'center',
        width:"90%",
        height:50,
        borderColor: 'red',
        borderWidth: 10,
        backgroundColor:'white'
    },
    text_header : {
        fontSize:20,
        
    },
    next_button : {
        flex:  0.7,
        padding:5,
        backgroundColor: '#F1CA89',
        justifyContent: 'center',
        alignSelf:'stretch',
        alignItems:'center',
        borderRadius:12
    },
    footer : {
        flex: 0.15,
        backgroundColor:'#ffff'
    }
})


export default findCar;
