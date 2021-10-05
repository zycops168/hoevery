import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

export default function nofity({ navigation }) {
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const Header = () => {
        return (
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('mainPage')}>
                        <Icon name="arrow-left" size={30} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Notifications</Text>
                    <TouchableOpacity styles={{}}
                        onPress={() => navigation.navigate('notify')}>
                        <Icon name="bell" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const Body = () => {
        return (
            <View style={styles.body}>

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
            {/* footere */}
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.1,
        backgroundColor: '#eeee',
    },
    body: {
        flex: 0.8,
        backgroundColor: '#fff'
    },
    footer: {
        flex: 0.1,
        backgroundColor: '#eee'
    },
    // another style
    header_text: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffd700',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        padding: 5,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#2f4f4f'
    },

})
