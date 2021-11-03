import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import uuid from 'uuid-random'
import { Overlay } from 'react-native-elements';
import Cookie from 'react-native-cookie';

import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import { set } from 'mobx';

export default function nofity({ navigation, route }) {

    const [myCookie, setMyCookie] = useState()
    const [userData, setUserData] = useState();
    const [visible, setVisible] = useState(true);
    const [NotiBoolean, setNotiBoolean] = useState(true);
    const [count, setCount] = useState([]);
    const toggleOverlay = () => { setVisible(!visible) };

    useEffect(() => {
        getNotiData();
        getCountNoti
        // const dataInterval = setInterval(() => getUserData(), 5 * 1000);
        // return () => clearInterval(dataInterval);
    }, []);

    const getCountNoti = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const cookie = await Cookie.get('203.150.107.212');
        console.log(cookie);
        const response = await fetch(`http://203.150.107.212/lessor/order?username=${cookie['username']}`, requestOptions)
        const result = await response.text();
        const countData = await JSON.parse(result);
        setCount(countData.data.waiting);
        console.log("count : ", countData.data.waiting);
        if(countData.data.waiting === "0"){
            setNotiBoolean(false);
            console.log('not found order')
            return ;
        }
        else{
            setNotiBoolean(true);
            console.log('Now, you have order');
            return;
        }

    }
    const getNotiData = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const cookie = await Cookie.get('203.150.107.212');
        console.log("cookie on notify screen ;", cookie)
        setMyCookie(cookie);
        const response = await fetch(`http://203.150.107.212/lessor/order?username=${cookie['username']}`, requestOptions)
        const result = await response.text();
        const userdata = await JSON.parse(result);
        setUserData(userdata.data.row);
        console.log(userdata.data.row[0]);
        console.log("id", userdata.data.row[0].id);
        setUserData(prevItems => {
            return prevItems.filter(item => item.status == "waiting")
        })

    }
    const updateStatusOrder = async (id, status) => {
        console.log("updateStatusOrdeer active!");
        var raw = "";
        var requestOptions = {
            method: 'PUT',
            body: raw,
            redirect: 'follow'
        };
        var status_s = "accept";
        console.log("id: ", id);
        const response = await fetch(`http://203.150.107.212/lessor/update-status-order?order_id=${id}&status=${status_s}`, requestOptions);
        const result = await response.json();
        console.log(result);
        navigation.navigate('AddCar');
    }
    const cancelOrder = async (id) => {
        console.log("updateStatusOrdeer active!");
        var raw = "";
        var requestOptions = {
            method: 'PUT',
            body: raw,
            redirect: 'follow'
        };
        var status_s = "cancel";
        console.log("id: ", id);
        const response = await fetch(`http://203.150.107.212/lessor/update-status-order?order_id=${id}&status=${status_s}`, requestOptions);
        const result = await response.json();
        console.log(result);
        alert("cancel success!!");
        setUserData(prevItems => {
            return prevItems.filter(item => item.status == "waiting")
        })
    }

    const check_Notify = () => {
        setNotiBoolean(true);
        alert('hi')
        return NotiBoolean;
    }
    const Header = () => {
        return (
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('mainPage')}>
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                    <Text style={styles.text}>                        การแจ้งเตือน</Text>
                    {/* <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('notify')}>
                        <Icon name="bell" size={30} />
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }

    const Footer = () => {
        return (
            <View style={styles.footer}>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* header */}
            <Header />
            {/* body */}
            <View style={styles.body}>
                <View style={styles.body_fetch}>
                    {NotiBoolean === true ?
                        <FlatList
                            data={userData}
                            updateStatusOrder={updateStatusOrder}
                            renderItem={({ item }) => (

                                <View style={
                                    {
                                        height: 200,
                                        backgroundColor: '#fff',
                                        borderRadius: 15,
                                        padding: 1,
                                    }}>
                                    <View style={
                                        {
                                            height: 150,
                                            backgroundColor: '#eee',
                                            padding: 15,
                                            borderRadius: 1,
                                            justifyContent: 'space-between',

                                        }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                            EXCA ID: {item.car_id}
                                        </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>โปรดยืนยันรายการคำขอในการส่งรถ  </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'normal' }}>สถานะ : {item.status} </Text>
                                        <Text>วัน/เวลา : {item.created_date} </Text>
                                    </View>
                                    <View style={
                                        {
                                            height: 50,
                                            backgroundColor: '#eee',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end'
                                        }}>
                                        <View style={
                                            {
                                                width: 140,
                                                height: 50,
                                                justifyContent: 'space-around',
                                                backgroundColor: '#eee',
                                                flexDirection: 'row',
                                            }
                                        }>
                                            <View style={
                                                {
                                                    backgroundColor: COLORS.primary,
                                                    height: 45,
                                                    width: 55,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 13,
                                                }
                                            }>
                                                <TouchableOpacity styles={
                                                    {
                                                        // no style
                                                    }}
                                                    onPress={() => updateStatusOrder(item.id, item.status)}
                                                >
                                                    <Icon name="check" size={20} color="#eee" />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={
                                                {
                                                    backgroundColor: COLORS.backgroundInput,
                                                    height: 45,
                                                    width: 55,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 13,
                                                }
                                            }>
                                                <TouchableOpacity styles={
                                                    {
                                                        // no style
                                                    }}
                                                    onPress={() => cancelOrder(item.id)}
                                                >
                                                    <Icon name="remove" size={20} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={
                                            {
                                                width: "100%",
                                                height: 15,
                                                backgroundColor: '#fff',
                                            }
                                        }>
                                        </View>

                                    </View>
                                </View>
                            )} /> : <View><Text> not found</Text></View>}
                </View>
            </View>
            {/* footer */}
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: COLORS.white,
        flex: 0.11,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    body: {
        flex: 0.8,
        backgroundColor: COLORS.white
    },
    footer: {
        flex: 0.1,
        backgroundColor: COLORS.white
    },
    // another style
    header_text: {
        padding: 10,
        width: "100%",
        height: 68,
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 5.0,
        shadowRadius: 5.0,
        elevation: 10,
    },
    text: {
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: COLORS.drakGreen
    },
    listtext: {
        fontSize: 16
    },
    body_fetch: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
    },
    flatlist_noti_box: {
        height: 100,
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        padding: 12,
    }
})

