import React, { useState, createRef } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { styles } from '../style';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'react-native-elements';

const detailCar = ({ navigation }) => {
    const [text_excavator_name, setText_excavator_name] = useState("");
    const [create, setCreate] = useState('charmuar');
    const [size, setSize] = useState("");
    const [pickerTypeValue, setPickerTypeValue] = useState('click..');
    const [Price_daily, setPrice_daily] = useState("");
    const [Price_weekly, setPrice_weekly] = useState("");
    const [Price_monthly, setPrice_monthly] = useState("");
    const [func, setFunc] = useState("");
    const onChangeName = textValue => setText_excavator_name(textValue);
    const onChangeSize = textValue => setSize(textValue);
    const onChangeDaily = textValue => setPrice_daily(textValue);
    const onChangeWeekly = textValue => setPrice_weekly(textValue);
    const onChangeMonthly = textValue => setPrice_monthly(textValue);
    const onChangeFunc = textvalue => setFunc(textvalue);

    // console.log(text_excavator_name);
    // console.log(size);
    // console.log(pickerTypeValue);
    // console.log(Price_daily);
    // console.log(Price_weekly);
    // console.log(Price_monthly);
    // console.log(func);


    // Insert Excavatorr data and detail 
    const InsertExData = () => {  // not active 
        // var raw = JSON.stringify({
        //     "carname": text_excavator_name,
        //     "create_by": create,
        //     "type": pickerTypeValue,
        //     "size": size,
        //     "price": {
        //         "Daily": Price_daily,
        //         "Weekly": Price_weekly,
        //         "Monthly": Price_monthly
        //     },
        //     "function": {
        //         "detail": func
        //     }
        //})
        var raw = JSON.stringify({
            "carname": "text_excavator_name",
            "create_by": "charmuar",
            "type": "pickerTypeValue",
            "size": "size",
            "price": {
                "Daily": "Price_daily",
                "Weekly": "Price_weekly",
                "Monthly": "Price_monthly"
            },
            "function": {
                "detail": "func"
            }
        });

        console.log(raw);
        var requestOptions = {
            method: 'POST',
            body: raw,
            redirect: 'follow'
        };
        fetch("http://203.150.107.212/lessor/insert-car", requestOptions)

            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const fedex2 = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
            "carname": text_excavator_name,
            "create_by": create,
            "type": pickerTypeValue,
            "size": size,
            "price": {
                "Daily": Price_daily,
                "Weekly": Price_weekly,
                "Monthly": Price_monthly
            },
            "function": {
                "detail": func
            }
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

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
                        onChangeText={onChangeName}>
                    </Input>
                    <Input
                        placeholder="example : pc-30"
                        label="Size :"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'expand' }}
                        onChangeText={onChangeSize}>
                    </Input>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#a9a9a9' }}>  Type of excavator : </Text>
                    <Picker style={styles1.picker}
                        selectedValue={pickerTypeValue}
                        onValueChange={(itemValue) => setPickerTypeValue(itemValue)}>
                        <Picker.Item label="Crawler" value="Crawler" />
                        <Picker.Item label="Drag Line" value="Drag Line" />
                        <Picker.Item label="Suction" value="Suction" />
                        <Picker.Item label="Skid Steel" value="Skid Steel" />
                        <Picker.Item label="Long Reach" value="Long Reach" />
                        <Picker.Item label="Mini Crawler" value="Mini Crawler" />
                    </Picker>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>  Price : </Text>
                    <Input
                        placeholder=" xxxxxx $"
                        label="Daily"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'money' }}
                        keyboardType='decimal-pad'
                        onChangeText={onChangeDaily}
                    ></Input>
                    <Input
                        placeholder=" xxxxxx $"
                        label="Weekly"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'money' }}
                        keyboardType='decimal-pad'
                        onChangeText={onChangeWeekly}
                    ></Input>
                    <Input
                        placeholder=" xxxxxx $"
                        label="Monthly"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'money' }}
                        keyboardType='decimal-pad'
                        onChangeText={onChangeMonthly}
                    ></Input>

                    <Input
                        placeholder="Example:  
                                 OPERATING WEIGHT: 8,340LBS /
                                 MAXIMUM CUTTING HEIGHT: 16.3 FT /
                                 MAXIMUM DUMPING HEIGHT: 11.9FT /
                                 MAXIMUM DIGGING DEPTH: 11.4FT /
                                 MAXIMUM DIGGING REACH: 18.1FT /
                                 "
                        label="Function"
                        renderErrorMessage={true}
                        leftIcon={{ type: 'font-awesome', name: 'gear' }}
                        fontSize={15}
                        onChangeText={onChangeFunc}
                        multiline={true}
                        numberOfLines={20}
                    ></Input>
                </ScrollView>
            </View>
            <View style={styles1.footer}>
                <TouchableOpacity style={styles1.next_button}
                    onPress={() => fedex2()}
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
        backgroundColor: '#ffd700',
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


