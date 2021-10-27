import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native'
import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Cookie from 'react-native-cookie';

const myRental = ({ navigation,route }) => {

    const [NotifyData, setNotifyData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getListNotifyData();
    }, [])
    const getListNotifyData = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const cookie = await Cookie.get('203.150.107.212');
        console.log(cookie);
        const response = await fetch(`http://203.150.107.212/tenant/history-order?username=${cookie['username']}`, requestOptions);
        const result = await response.text();
        const listNotiData = await JSON.parse(result);
        console.log(listNotiData);
        setNotifyData(listNotiData.data);
        // console.log("2" ,listNotiData.data[2].status);
    }
    const Header = () => {
        return (
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('mainPage')}>
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                    <Text style={styles.text}>                 สถานะรายการเช่ารถ</Text>
                </View>
            </View>
        )
    }
    const _goToPayment = () => {
        navigation.navigate('payment');
    }
    const _wait = () => {
        alert('Please wait...')
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <Header />
            {/* Body */}
            <View style={styles.body}>
                <View style={
                    {
                        width: "87%",
                        height: "100%",
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        borderRadius: 15,
                        shadowOffset: { width: 2, height: 2 },
                        shadowColor: COLORS.black,
                        shadowOpacity: 5.0,
                        shadowRadius: 5.0,
                        elevation: 30,
                    }
                }>
                    <FlatList
                        data={NotifyData}
                        getListNotifyData={getListNotifyData}
                        renderItem={({ item }) => (
                            <View style={
                                {
                                    flex: 1,
                                    backgroundColor: COLORS.white,
                                    padding: 10,
                                }
                            }>
                                <View style={styles.flat_container}>
                                    <View style={styles.flat_grid_image}>
                                        <Image
                                            style={
                                                {
                                                    width: 100,
                                                    height: 70,
                                                }
                                            }
                                            source={require('../../assets/images/type_ex/1_crawler.png')}
                                            onPress={() => { }}
                                            borderRadius={10}
                                        />
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{'\n'}วัน/เวลาทำการ {'\n'} <Text style={{ fontSize: 12, fontWeight: 'normal' }}>{item.created_date}</Text></Text>
                                    </View>
                                    <View style={styles.flat_grid_margin}>
                                        <View style={styles.flat_header_text}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4e4c4c' }}>HOEVERY{'\n'}</Text>
                                            <Text style={FONTS.body4}>หมายเลขใบสั่งซื้อที่ {item.id}</Text>
                                            <Text style={FONTS.body5}>เจ้าของ: <Text style={{ fontWeight: 'bold' }}>{item.owner_car}</Text></Text>
                                        </View>
                                        <View style={styles.flat_status}>
                                            <Icon name="truck" size={20} color="#2BC978" />
                                            <Text style={{ color: "#000" }}>  สถานะ : </Text>
                                            <Text style={{ fontWeight: 'bold', color: "red" }}> {item.status}</Text>
                                        </View>
                                        <View style={styles.flat_total}>
                                            {item.status === "accept" ?
                                                <TouchableOpacity style={styles.next_button}
                                               onPress={() => _goToPayment()}
                                                >
                                                    <Text>Next step </Text>
                                                </TouchableOpacity> : <TouchableOpacity style={styles.wait_button}
                                                onPress={() => _wait()}>
                                                    <Text>Waiting.. </Text>
                                                </TouchableOpacity>}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )} />
                </View>
            </View>
            {/* Footer */}
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
        flex: 0.9,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 0.1,
        backgroundColor: COLORS.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // anotheer style 
    header_text: {
        padding: 10,
        width: '100%',
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
        elevation: 3,
    },
    text: {
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: COLORS.drakgreen,
    },
    //flatlist noti 
    flat_container: {
        backgroundColor: COLORS.white,
        width: "100%",
        height: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 5.0,
        shadowRadius: 5.0,
        elevation: 10,
    },
    flat_grid_image: {
        width: 130,
        height: 220,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 9,
    },
    flat_grid_margin: {
        width: 150,
        height: 180,
        borderRadius: 10,
        backgroundColor: COLORS.white,
    },
    flat_header_text: {
        width: 150,
        height: 90,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    flat_status: {
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        padding: 10,
    },
    flat_total: {
        width: 150,
        height: 60,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
    },
    next_button: {
        backgroundColor: COLORS.green,
        width: 90,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    wait_button: {
        backgroundColor: COLORS.red,
        width: 90,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})

export default myRental;
