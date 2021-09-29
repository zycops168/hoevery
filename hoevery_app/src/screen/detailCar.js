import React, { useState, createRef } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { styles } from '../style';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'react-native-elements';

const detailCar = ({ addItem, navigation }) => {
    const [text_excavator_name, setText_excavator_name] = useState("");
    const [pickerValue, setPickerItemValue] = useState('click..')
    const onChange = textValue => setText_excavator_name(textValue);

 var raw = JSON.stringify({
        "carname": "Excavator",
        "create_by" : "charmuar",
        "type": "Suction",
        "size": "-" ,
        "price": {
          "Daily": "$278.00",
          "Weekly": " $874.00",
          "Monthly": "1,858.00"
        },
        "function": {
        "DimensionL×W×H" : "8310*2500*3200", 
        "wheelBase" : "4700" ,                   
        "Approach/DepartureCorner" : "19/20",      
        "WeightAll" : "16000",                      
        "Engine" : "wd615.62",
        "Type" : "6CylindersInLineWithCoolingWater",
        "HorsePower" : "196Kw/266HP",
        "emissionStandard" : "Euro II",
        "gearbox" : "HW_5710_10_ApeedForwardWith2ReverseGears",
        "Front/rearAxleLoad(kg)": "6000/10000",
        "Brake" : "AirBrake",
        "rubber" : "12.00R20,6",
        "TankVolume" : "12000Liter",
        "bucketShape" : "cylindrical",
        "bucketMaterial" : "Carbon steel, thickness 6mm",
        "vacuumPump" : "Yifeng brand uses a double vacuum pump",
        "rotationSpeed" : "500RPM",
        "vacuum degree":  "400Pa 99.6%",
        "Pumping speed" :  "68L/Sx2",
        "SuctionDepth(m)" : "MoreThan6MetersWithA25MeterHose",
        "back door" : "openedAndClosedByHydraulicCylinder"
        }
 })
    var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
    };
    // Insert Excavatorr data and detail 
    const InsertExData = () => {  // not active 
    fetch("http://203.150.107.212/lessor/insert-car", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    return (
        <View style={styles.container}>
            <View style={styles1.header}>
                <View style={styles1.header_text}>
                    <Text style={styles1.text_header}> Add a new  information </Text>
                </View>
            </View>
            <View style={styles1.body}>
                <ScrollView style={styles1.scroll_view}>
                    <Input
                        placeholder=""
                        label="Excacator name :"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'bus' }}
                        onChangeText={onChange}>
                    </Input>
                    <Input
                        placeholder=""
                        label="Company name :"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'building-o' }}
                        onChangeText={onChange}>
                    </Input>
                    <Input
                        placeholder="example : pc-30"
                        label="Size :"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'expand' }}
                        onChangeText={onChange}>
                    </Input>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#a9a9a9' }}>  Type of excavator : </Text>
                    <Picker style={styles1.picker}
                        selectedValue={pickerValue}
                        onValueChange={(itemValue) => setPickerItemValue(itemValue)}>
                        <Picker.Item label="Crawler" value="..." />
                        <Picker.Item label="Drag Line" value="1" />
                        <Picker.Item label="Suction" value="2" />
                        <Picker.Item label="Skid Steel" value="3" />
                        <Picker.Item label="Long Reach" value="5" />
                        <Picker.Item label="Mini Crawler" value="6" />
                    </Picker>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>  Price : </Text>
                    <Input
                        placeholder=" xxxxxx $"
                        label="Daily"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'money' }}
                        onChangeText={onChange}
                    ></Input>
                    <Input
                        placeholder=" xxxxxx $"
                        label="Weekly"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'money' }}
                        onChangeText={onChange}
                    ></Input>
                    <Input
                        placeholder=" xxxxxx $"
                        label="Monthly"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'money' }}
                        keyboardType='decimal-pad'
                        onChangeText={onChange}
                    ></Input>

                    <Input
                        placeholder="Example:  
                                 OPERATING WEIGHT: 8,340LBS /
                                 MAXIMUM CUTTING HEIGHT: 16.3 FT /
                                 MAXIMUM DUMPING HEIGHT: 11.9FT /
                                 MAXIMUM DIGGING DEPTH: 11.4FT /
                                 MAXIMUM DIGGING REACH: 18.1FT / 
                                 MINIMUM FRONT SWING RADIUS 7.2FT /
                                 TRANSPORT LENGTH: 15.7FT /
                                 UPPER STRUCTURE WIDTH: 5.1FT /
                                 CANOPY: 8.2FT /
                                 CAB: 8.2FT
                                 "
                        label="Function"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'gear' }}
                        fontSize={15}
                        onChangeText={onChange}
                        multiline={true}
                        numberOfLines={10}
                    ></Input>
                </ScrollView>
            </View>
            <View style={styles1.footer}>
                <TouchableOpacity style={styles1.next_button}
                     onPress={() => InsertExData(text_excavator_name)}
                     
                    onPressOut={() => { navigation.navigate('AddCar') }}
                >
                    <Text style={{ fontSize: 18 }}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#fff',
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
        borderRadius: 10,
        borderTopWidth: 0.4,
    },
    body: {
        flex: 1,
        backgroundColor: '#EEEEEE',

    },
    footer: {
        flex: 0.12,
        backgroundColor: '#fff',
    },
    box_view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputtext: {
        padding: 15,
        fontSize: 18,
        backgroundColor: 'white'
    },
    header_text: {
        padding: 10,
        flex: 1,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,

    },
    scroll_view: {
        width: '90%',
        backgroundColor: '#ffff',
        marginHorizontal: 20,
        paddingTop: 30,
        shadowColor: '#eeeeee',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 1.22,
        elevation: 40,

    },
    text_header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2f4f4f',
        padding: 10
    },
    inputtext: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    picker: {
        alignSelf: 'center',
        width: "100%",
        height: 50,
        borderColor: 'black',
        borderWidth: 10,
        backgroundColor: 'white'
    },
    next_button: {
        flex: 0.7,
        padding: 5,
        backgroundColor: 'gold',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 12
    },
})

export default detailCar;


