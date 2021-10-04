import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Button, Overlay } from 'react-native-elements';

export default function comfirm({ navigation }) {

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onChangepage = () => {
        navigation.navigate('payment');
    }
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}></View>
            {/* body */}
            <View style={styles.body}>
                <TouchableOpacity onPress={onChangepage}>
                <ActivityIndicator size="large" color="#362222" />
                <Text style={styles.text_loading}>Loading...</Text>
                </TouchableOpacity>
            </View>
            {/* footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.btn_readmore}
                    onPress={toggleOverlay}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Back</Text>
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <View style={styles.overlay_container}> 
                        <Text>Cancel Order.... </Text>
                        <TouchableOpacity>
                            <Text>yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>no</Text>
                        </TouchableOpacity>
                        </View>
                    </Overlay>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    header: {
        flex: 0.1,
        backgroundColor: '#fff',
    },
    body: {
        flex: 0.8,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 0.08,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    //another style 
    text_loading: {
        fontSize: 22,
        color: "#a9a9a9",
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
    overlay_container :{
        width:  320,
        height:"25%",
        backgroundColor:'red',
    },
})
