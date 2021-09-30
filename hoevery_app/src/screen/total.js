import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearProgress, Button, Overlay } from 'react-native-elements';

export default function total({ navigation }) {

    const [CarId, setCarId] = useState([{}])

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    // fetch  Get Price with Car
   
    const getTotal = () => { //  not active 
        fetch(`http://203.150.107.212/tenant/get-price?car_id={car_id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                var data = JSON.parse(result);
                setCarId(data); alert(data)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('mainPage')}>
                        <Icon name="arrow-left" size={27} />
                    </TouchableOpacity>
                    <Text style={styles.text}>   Split bill</Text>
                </View>
            </View>
            {/* body */}
            <View style={styles.body}>
                <View style={styles.body_box}>
                    <View style={styles.body_shadow}>
                        <Text style={styles.text_total}> total bill </Text>
                        <FlatList
                            data={CarId}
                            keyExtractor={({ id }, index) => id}
                            renderItem={({ item }) => (
                                <Text>DaiLy: {item.Daily}   
                                </Text>
                            )}
                        />
                        <TouchableOpacity onPress={() => { navigator.navigate('googleMap') }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>      see more products.. </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('mainPage') }}>
                            <Text style={{ fontSize: 16, fontWeight: 'normal' }}>     Back to homepage.. </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* footer */}
            <View style={styles.footer}>
                {/* <View style={styles.footer_btn}>
                       <TouchableOpacity style={styles.textaddbtn}
                        onPress={()=> navigation.navigate('detailCar')}>
                           <Text style={styles.textaddbtn}>BACK</Text>                          
                        </TouchableOpacity>
                </View>
                <View style={styles.footer_btn2}>
                       <TouchableOpacity style={styles.textaddbtn}
                        onPress={()=> navigation.navigate('mainPage')}>
                           <Text style={styles.textaddbtn}>CANCEL</Text>                          
                        </TouchableOpacity>
                </View>
                <View style={styles.footer_btn3}>
                       <TouchableOpacity style={styles.textaddbtn}
                        onPress={()=> navigation.navigate('mainPage')}>
                           <Text style={styles.textaddbtn}>FINISH</Text>                          
                        </TouchableOpacity>
                </View> */}
            </View>
            <LinearProgress color="#ff69b4" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#fff',
        flex: 0.10,
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
        flex: 0.8,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    footer: {
        flex: 0.09,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
    },
    footer_btn: {
        flex: 0.23,
        flexDirection: 'row',
        backgroundColor: '#ffd700',
        borderRadius: 10
    },
    footer_btn2: {
        flex: 0.23,
        flexDirection: 'row',
        backgroundColor: '#ff0000',
        borderRadius: 10
    },
    footer_btn3: {
        flex: 0.23,
        flexDirection: 'row',
        backgroundColor: '#FFB319',
        borderRadius: 10
    },
    // another container
    header_text: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    body_box: {
        width: "90%",
        height: 400,
        backgroundColor: '#eee',
        borderRadius: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: -5,
            height: -10,
        },
        shadowOpacity: 1.22,
        shadowRadius: 1.22,
        elevation: 70,
    },
    body_shadow: {
        width: "100%",
        height: 400,
        backgroundColor: '#fff',
        position: 'relative',
        bottom: 50,
        left: 50,
        borderRadius: 60,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 30,
        paddingTop: 50
    },
    textaddbtn: {
        padding: 5,
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: '#2f4f4f',
    },
    text_total: {
        fontSize: 20,
        color: '#2f4f4f',
    },
    text_bill: {
        fontSize: 60,
        color: '#2f4f4f',
    },
    text: {
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#2f4f4f'
    },
})
