import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import uuid from 'uuid-random'
import { Overlay } from 'react-native-elements';

import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default function nofity({ navigation, route }) {
    const [items, setItems] = useState([
        { id: uuid(), text: "busy" },
        { id: uuid(), text: "red" },
      ])
      
    const [userData, setUserData] = useState([{}]);
    const getUserData = async () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const response = await fetch("http://203.150.107.212/user/all", requestOptions)
        const result = await response.text();
        const userdata = await JSON.parse(result); setUserData(userdata);
        console.log(result);
    }
    //getExData();
    useEffect(() => {
        //   getExData();
        getUserData();
        //  const dataInterval = setInterval(() => getExData(), 5 * 1000);
        //  return () => clearInterval(dataInterval);
    }, []);

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => { setVisible(!visible) };

    const Header = () => {
        return (
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('mainPage')}>
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                    <Text style={styles.text}>                          Notifications</Text>
                    {/* <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('notify')}>
                        <Icon name="bell" size={30} />
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
    const Body = () => {
        return (
            <View style={styles.body}>
                <View style={styles.body_fetch}>
                    <FlatList
                        data={items}
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
                                        padding: 10,
                                        borderRadius: 1,
                                        justifyContent: 'space-between',
                                    }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        ORDER NO.999 , ID: {route.params.paramKey[1].text}
                                    </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Please accept or deny your order  </Text>
                                    <Text>Excavator name: {item.text}</Text>
                                    <TouchableOpacity style={
                                        {

                                        }
                                    }
                                        onPress={() => { toggleOverlay }}
                                    >
                                        <Text style={{ fontWeight: 'bold' }}>See more..</Text>
                                        <Overlay isVisible={visible}
                                            onBackdropPress={toggleOverlay}
                                            overlayStyle={{
                                                backgroundColor: '#eee',
                                                borderRadius: 20,
                                            }}>
                                            <View style={
                                                {
                                                    width: 200,
                                                    height: 200,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#fff',
                                                    borderRadius: 20,
                                                }
                                            }>
                                                <TouchableOpacity onPress={() => {
                                                }}>
                                                    <Text style={{}}>Loading...</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Overlay>
                                    </TouchableOpacity>
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
                                            justifyContent: 'flex-end',
                                            backgroundColor: '#eee',
                                            flexDirection: 'row',
                                        }
                                    }>
                                        <View style={
                                            {
                                                backgroundColor: '#adff2f',
                                                height: 50,
                                                width: 60,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 15,
                                            }
                                        }>
                                            <TouchableOpacity styles={
                                                {
                                                    // no style
                                                }}
                                                onPress={() => navigation.navigate('AddCar',{ paramKey: items })}
                                            >
                                                <Icon name="check" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={
                                            {
                                                backgroundColor: '#dc143c',
                                                height: 50,
                                                width: 60,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 15,
                                            }
                                        }>
                                            <TouchableOpacity styles={
                                                {
                                                    // no style
                                                }}
                                                onPress={() => { }}
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
                        )} />
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
            <Body />
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
        elevation: 10 ,
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

