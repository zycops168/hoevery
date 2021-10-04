import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../style';
import { LinearProgress, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

const findCar = ({ navigation }) => {

    const [pickerValue, setPickerItemValue] = useState('click..')
    console.log((pickerValue));
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    }

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const getExData = () => {
        fetch(`http://203.150.107.212/tenant/get-car-with-type?typeOfWork=${pickerValue}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        // wait write condition for check when change page
        navigation.navigate('getDetail')

    }
    const Check_getExData = (pickerValue) => {
        if (pickerValue == "none") {
            alert("Select Type Work")
        }
        else {
            getExData()
        }
    }
    return (
        // all of body 3 section header/body/footer
        <View style={styles1.container}>
            {/* header */}
            <View style={styles1.header}>
                <View style={styles1.header_easy_find}>
                    <Text style={[styles.text_header1, { color: '#362222' }]}>EASY</Text>
                    <Text style={[styles.text_header1, { color: '#ffd700' }]}>FIND</Text>
                </View>
            </View>
            {/* body */}
            <View style={styles1.body}>
                <Picker style={styles1.picker}
                    selectedValue={pickerValue}
                    onValueChange={(itemValue) => setPickerItemValue(itemValue)}
                >
                    <Picker.Item label="Select Type Job.." value="none" />
                    <Picker.Item label="Natural canal dredging" value="Natural canal dredging" />
                    <Picker.Item label="Dig a drainage hole" value="dig a drainage hole" />
                    <Picker.Item label="Dig soil/Soft soil" value="Dig soilSoft soil" />
                    <Picker.Item label="Dig a canal" value="digACanal" />
                    <Picker.Item label="Dig a drainage hole" value="dig a drainage hole" />
                    <Picker.Item label="Min soil pebble limestone mineral rock" value="Min soil pebble limestone mineral rock" />
                    <Picker.Item label="Move dispose material in a place where space is limited" value="Move dispose material in a place where space is limited" />
                    <Picker.Item label="Crowded" value="Crowded" />
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
                <TouchableOpacity style={styles1.btn_readmore}
                    onPress={() => navigation.navigate('mainPage')}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles1.btn_readmore}
                    onPress={() => Check_getExData(pickerValue)}>
                    {/* <Icon name="arrow-right" size={30} /> */}
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Next</Text>
                </TouchableOpacity>
            </View>
            <LinearProgress color="#ff69b4" />
        </View>
    )
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    header: {
        flex: 0.3,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    header_btn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header_easy_find: {
        flex: 1,
        justifyContent: 'flex-start',


    },
    body: {
        flex: 0.65,
        backgroundColor: '#ffff',
    },
    body2: {
        flex: 0.1,
        backgroundColor: '#fff',
        padding: 10,

    },
    footer: {
        flex: 0.1,
        backgroundColor: '#eeee',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    picker: {
        alignSelf: 'center',
        width: "90%",
        height: 50,
        borderColor: 'red',
        borderWidth: 10,
        backgroundColor: 'white',
        borderWidth: 10,
        borderColor: '#000',
    },
    text_header: {
        fontSize: 20,

    },
    next_button: {
        flex: 0.7,
        padding: 5,
        backgroundColor: '#ffd700',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 12
    },
    btn_readmore: {
        backgroundColor: '#ffd700',
        width: "25%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
        shadowOffset: { width: -10, height: -10 },
        shadowColor: '#000',
        shadowOpacity: 2.0,
        shadowRadius: 2.0,
        elevation: 50,
    },

})


export default findCar;

// import React, { useEffect, useState } from 'react';
// import { FlatList, Text, View } from 'react-native';

// export default findCar = ({navigation}) => {
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   console.log(data);

//   useEffect(() => {
//     fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
//       .then((response) => response.json())
//       .then((json) => setData(json))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }, []);

//   return (

//     <View style={{ flex: 1, padding: 24 }}>
//       {isLoading ? <Text>Loading...</Text> : 
//       ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
//           <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.title}</Text>
//           <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Articles:</Text>
//           <FlatList
//             data={data.articles}
//             keyExtractor={({ id }, index) => id}
//             renderItem={({ item }) => (
//               <Text>{item.id + '. ' + item.title}</Text>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// };