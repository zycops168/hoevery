import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../style';
import { LinearProgress,Button,Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
const findCar = ({navigation}) => {

    const [ pickerValue, setPickerItemValue] = useState('click..')


  
        const [visible, setVisible] = useState(false);
        const toggleOverlay = () => {
            setVisible(!visible);
        }

    return (
        // all of body 3 section header/body/footer
        <View style={styles1.container}>   
        {/* header */}      
            <View style={styles1.header}> 
                    <Text style={[styles.text_header1, {color: '#362222'}]}>EASY</Text>
                    <Text style={[styles.text_header1, {color: '#ffd700'}]}>FIND</Text>
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
            <View styles={styles1.body2}>
            {/* <TouchableOpacity style={styles1.btn_readmore}
                    onPress={() => navigation.navigate('googleMap')}>
                        <Icon name="arrow-right" size={30}/>  
                    </TouchableOpacity>
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <View style={{width:50,height:50, backgroundColor:'red'}}></View>
                    </Overlay> */}
            </View>
        {/* footer */}        
            <View style={styles1.footer}>
                {/* <TouchableOpacity style={styles1.next_button}
                  onPress={()=> navigation.navigate('googleMap')}
                >
                    <Text style={{fontSize:18, alignSelf:'center'}}> Next </Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles1.btn_readmore}
                    onPress={() => navigation.navigate('googleMap')}>
                        <Text>Next</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles1.btn_readmore}
                    onPress={() => navigation.navigate('mainPage')}>
                        <Icon name="arrow-left" size={30}/>  
                    </TouchableOpacity>
                      <TouchableOpacity style={styles1.btn_readmore}
                    onPress={() => navigation.navigate('googleMap')}>
                        <Icon name="arrow-right" size={30}/>  
                    </TouchableOpacity>
            </View>
            <LinearProgress color="#ff69b4" />
        </View>
    )
}

const styles1 = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#ffff'
    },
    header : {
        flex:0.4,
        padding: 10
    },
    body : {
        flex: 0.5,
        backgroundColor:'#ffff',
    },
    body2 : {
        flex: 0.1,
        backgroundColor:'#fff',   
        padding: 10,

    },
    footer : {
        flex: 0.08,
        backgroundColor:'#eeee',
        flexDirection:'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    picker : {
        alignSelf:'center',
        width:"90%",
        height:50,
        borderColor: 'red',
        borderWidth: 10,
        backgroundColor:'white',
        borderWidth: 10,
        borderColor:'#000'
    },
    text_header : {
        fontSize:20,
        
    },
    next_button : {
        flex:  0.7,
        padding:5,
        backgroundColor: '#ffd700',
        justifyContent: 'center',
        alignSelf:'stretch',
        alignItems:'center',
        borderRadius:12
    },
    btn_readmore : {
        backgroundColor: '#ffd700',
        width:"25%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf:'flex-end',
        padding:10,
        borderRadius: 10,
        shadowOffset: { width: -10, height: -10 },
        shadowColor: '#000',
        shadowOpacity: 2.0,
        shadowRadius: 2.0,
        elevation: 50,
    },

})


export default findCar;
