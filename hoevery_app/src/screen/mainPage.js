import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableOpacityBase } from 'react-native'
import { styles } from '../style';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { SpeedDial, LinearProgress } from 'react-native-elements';
import uuid from 'uuid-random';

const Header_looking = () => {
    return (
        <View style={styles1.header}>
            <Text style={[styles.text_header1, { color: '#800080' }]}>L </Text>
            <Text style={[styles.text_header1, { color: '#00008b' }]}>O </Text>
            <Text style={[styles.text_header1, { color: '#00ced1' }]}>O </Text>
            <Text style={[styles.text_header1, { color: '#00ff7f' }]}>K </Text>
            <Text style={[styles.text_header1, { color: '#ffff00' }]}>I </Text>
            <Text style={[styles.text_header1, { color: '#ff8c00' }]}>N </Text>
            <Text style={[styles.text_header1, { color: '#DA1503' }]}>G </Text>
        </View>
    )
}
const Header_for = () => {
    return (
        <View style={styles1.header2}>
            <Text style={[styles.text_header1, { color: '#362222' }]}>FOR ? </Text>
        </View>
    )
}
const Body = () => {
    return (
        <View style={styles1.body}>
            <View style={styles1.left_body}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { }}>
                    <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/1_crawler.png')}
                        onPress={() => { }}
                        borderRadius={10}
                    />
                    <Text style={styles1.text_exca_detail}> •- Crawler -•</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { }}>
                    <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/2_dragline.png')}
                        onPress={() => { }}
                        borderRadius={10}
                    />
                    <Text style={styles1.text_exca_detail}> •- Drag Line -•</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { }}>
                    <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/3_suction.png')}
                        onPress={() => { }}
                        borderRadius={10}
                    />
                    <Text style={styles1.text_exca_detail}> •- Suction -•</Text>
                </TouchableOpacity>
            </View>
            <View style={styles1.right_body}>

                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { }}>
                    <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/4_skid_steel.png')}
                        onPress={() => { }}
                        borderRadius={10}
                    />
                    <Text style={styles1.text_exca_detail}> •- Skid Steel -•</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { }}>
                    <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/5_long_reach.png')}
                        onPress={() => { }}
                        borderRadius={10}
                    />
                    <Text style={styles1.text_exca_detail}> •- Long Reach -•</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { }}>
                    <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/6_mini_crawler.png')}
                        onPress={() => { }}
                        borderRadius={10}
                    />
                    <Text style={styles1.text_exca_detail}> •- Mini Crawler -•</Text>
                </TouchableOpacity>
            </View>
<<<<<<< HEAD
            {/* body */}
            <View style={styles1.body}>
                <View style={styles1.left_body}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {}}>
                        <Image
                            style={styles1.pic_main}
                            source={require('../../assets/images/type_ex/1_crawler.png')}
                            onPress={() => { }}
                            borderRadius={10}
                        />
                        <Text style={styles1.text_exca_detail}> •- Crawler -•</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => { }}>
                        <Image
                            style={styles1.pic_main}
                            source={require('../../assets/images/type_ex/2_dragline.png')}
                            onPress={() => { }}
                            borderRadius={10}
                        />
                        <Text style={styles1.text_exca_detail}> •- Drag Line -•</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => { }}>
                        <Image
                            style={styles1.pic_main}
                            source={require('../../assets/images/type_ex/3_suction.png')}
                            onPress={() => { }}
                            borderRadius={10}
                        />
                        <Text style={styles1.text_exca_detail}> •- Suction -•</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles1.right_body}>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => { }}>
                        <Image
                            style={styles1.pic_main}
                            source={require('../../assets/images/type_ex/4_skid_steel.png')}
                            onPress={() => { }}
                            borderRadius={10}
                        />
                        <Text style={styles1.text_exca_detail}> •- Skid Steel -•</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => { }}>
                        <Image
                            style={styles1.pic_main}
                            source={require('../../assets/images/type_ex/5_long_reach.png')}
                            onPress={() => { }}
                            borderRadius={10}
                        />
                        <Text style={styles1.text_exca_detail}> •- Long Reach -•</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => { }}>
                        <Image
                            style={styles1.pic_main}
                            source={require('../../assets/images/type_ex/6_mini_crawler.png')}
                            onPress={() => { }}
                            borderRadius={10}
                        />
                        <Text style={styles1.text_exca_detail}> •- Mini Crawler -•</Text>
                    </TouchableOpacity>
                </View>
            </View>
=======
        </View>
    )
}

const mainPage = ({ navigation }) => {
>>>>>>> 18a00c4743f7f8b455d0ce75a3019a7e957aba0d

    const [items, setItems] = useState([
        { id: uuid(), text: "always" },
        { id: uuid(), text: "green" },
      ])
      
    const Footer = () => {
        return (
            <View style={styles1.footer}>
                <TouchableOpacity style={styles1.find_btn}
                    onPress={() => { navigation.navigate('findCar'); console.log('next page'); }}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2f4f4f' }}> Find Car </Text>
                </TouchableOpacity>
            </View>
        )
    }
    const [open, setOpen] = useState(false)
    return (
        // all of body is header/body/footer
        <View style={styles1.container}>
            {/* header */}
            <Header_looking />
            <Header_for />
            {/* body */}
            <Body />
            {/* footer */}
            <Footer />
            <SpeedDial
                color={'#ffd700'}
                isOpen={open}
                icon={{ name: 'menu', color: '#362222' }}
                openIcon={{ name: 'close', color: '#362222' }}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}
            >
                <SpeedDial.Action
                    color={'#ffd700'}
                    icon={{ name: 'edit', color: '#362222' }}
                    title="Profile"
                    onPress={() => navigation.navigate('AddCar', { paramKey: items })} // for page kim
                />
                <SpeedDial.Action
                    color={'#ffd700'}
                    icon={{ name: 'logout', color: '#362222' }}
                    title="Logout"
                    onPress={() => console.log('Delete Something')}
                />
            </SpeedDial>
        </View>
    )
}

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    header: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    header2: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    body: {
        flex: 0.9,
        width: "90%",
        paddingHorizontal: 5,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-around', //y
        alignItems: 'flex-start',  //x
        alignSelf: 'center',
        borderRadius: 5,
        // shadowOffset: { width: 2, height: 2 },
        // shadowColor: 'brown',
        // shadowOpacity: 5.0,
        // shadowRadius: 5.0,
        // elevation: 9 ,
    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#eee',
        padding: 10
    },
    left_body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    right_body: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textaddbtn: {
        padding: 15,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#2f4f4f'
    },
    text_select: {
        fontSize: 18,
    },
    pic_main: {
        width: 150,
        height: 100,
    },
    text_exca_detail: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: 'normal',
        alignSelf: 'center'
    },
    find_btn: {
        flex: 0.5,
        borderRadius: 10,
        backgroundColor: 'gold',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 5.0,
        shadowRadius: 5.0,
        elevation: 10,
    },
})
export default mainPage;




//  {/* body */}
//  <View style={styles1.body}>
//  {/* <View style={styles1.rent_btn}>
//  <TouchableOpacity style={styles1.footer}
//           onPress={()=> navigation.navigate('AddCar')}>
//      <Icon name="user" size={50} color="#900" /> 
//      {/* <Text styles={styles1.text_select}>Provider</Text>   
//      </TouchableOpacity>     
//  </View>   */}
//  {/* <View style={styles1.customer_btn}> */}

//      />
//      {/* <Icon name="car" size={50} color="#900" />    */}
//      {/* <Text style={styles1.text_select}> Customers</Text> */}
//      </TouchableOpacity>   
//     </View> 
//  </View>