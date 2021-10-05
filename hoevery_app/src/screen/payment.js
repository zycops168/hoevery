import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Button, Overlay } from 'react-native-elements';

export default function payment({ navigation }) {

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>

            </View>
            {/* body */}
            <View style={styles.body}>
                <Text>hi</Text>
            </View>
            {/* footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.btn_readmore}
                    onPress={toggleOverlay}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Back</Text>
                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <View style={styles.overlay_container}>
                                <Text style={styles.overlay_header_text}> Cancel order?</Text>
                            <Button
                                title="yes"
                                type="clear"
                            />
                            <Button
                                title="no"
                                type="clear"
                            />
                            {/* <TouchableOpacity  styles={styles.btn_popup} 
                                onPress={() => { navigation.navigate('findCar') }}>
                                    <Text style={styles.overlay_header_text}>yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity styles={styles.btn_popup}>
                                    <Text>no</Text>
                                </TouchableOpacity>
                           */}
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
    overlay_container: {
        width: 320,
        height: 150,
        backgroundColor: '#ffd700',
        borderRadius: 4,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-start',
    },
    overlay_popup_btn: {
        width: "100%",
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 15,
        backgroundColor: '#eee',
        borderRadius: 3,
    },
    overlay_header_text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    btn_popup: {
        backgroundColor: "#ffd700",
        flex: 1,
    },
    header_pop : {
        backgroundColor: 'red',
    }
})
