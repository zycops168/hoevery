<<<<<<< HEAD
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
=======
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export class RenderPrice extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.largeTitle1,
            fontWeight: 'bold',
            marginTop: 40,
            marginBottom: 20,
          }}>
          Total
        </Text>
        <Text style={{color: COLORS.green, ...FONTS.h1}}>
          {this.props.price_total}
        </Text>
      </View>
    );
  }
}
export class RenderPayment extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 50,
          position: 'absolute',
          top: -35,
          backgroundColor: COLORS.white,
          width: '90%',
          height: 70,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          left: 'auto',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 1.22,
          elevation: 2,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 50,
            backgroundColor: COLORS.yellow,
            width: '50%',
            height: '75%',
            right: 80,
            bottom: -15,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{position: 'absolute', ...FONTS.h1, fontWeight: 'bold', color: COLORS.white}}>
            เงินสด
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 50,
            width: '45%',
            height: '45%',
            right: 75,
            bottom: 25,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              left: 165,
              ...FONTS.h3,
              color: COLORS.gray,
            }}>
            ชำระผ่านธนาคาร
          </Text>
        </View>
      </View>
    );
  }
}

export class RenderForm extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 6,
          marginRight: SIZES.padding * 2,
          marginLeft: SIZES.padding * 2,
        }}>
        <Text style={{color: COLORS.lightgreen, ...FONTS.body3}}>Address</Text>
        {/* Addres */}

        <TextInput
          style={{
            marginVertical: SIZES.padding,
            borderBottomColor: COLORS.black,
            borderBottomWidth: 1,
            height: 40,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholder="จังหวัด, อำเภอ/เขต, รหัสไปรษณีย์"
          placeholderTextColor={COLORS.darkGray}
          selectionColor={COLORS.black}
        />
        <TextInput
          style={{
            marginVertical: SIZES.padding,
            borderBottomColor: COLORS.black,
            borderBottomWidth: 1,
            height: 40,
            color: COLORS.black,
            ...FONTS.body3,
          }}
          placeholder="รายละเอียดที่อยู่"
          placeholderTextColor={COLORS.darkGray}
          selectionColor={COLORS.black}
        />
      </View>
    );
  }
}

export default class payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnable: true,
    };
  }

  render() {
    const {price_type, price_total} = this.props.route.params;
    console.log(price_total);

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <LinearGradient
          colors={[COLORS.primary, COLORS.lightYellow]}
          style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              {/* <RenderHeader /> */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: SIZES.padding * 0,
                  paddingHorizontal: SIZES.padding * 2,
                }}
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{width: 20, height: 20, tintColor: COLORS.white}}
                />

                <Text
                  style={{
                    marginLeft: SIZES.padding * 1.5,
                    color: COLORS.white,
                    ...FONTS.h4,
                  }}>
                  Back
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  flexDirection: 'row',
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontWeight: 'bold',
                  right: -40,
                }}>
                Payment
              </Text>
            </View>

            <View style={{flex: 0.8}}>
              <RenderPrice price_type={price_type} price_total={price_total} />
            </View>
            <View style={{flex: 1.5, backgroundColor: '#fff'}}>
              <RenderPayment />
              <RenderForm />
              {/* <RenderComfirm /> */}
              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  // position: 'absolute',
                  // bottom: 30,
                  backgroundColor: COLORS.yellow,
                  width: '90%',
                  height: 70,
                  bottom: 20,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 1.22,
                  elevation: 2,
                }}
                onPress={() =>
                  this.props.navigation.navigate('afterPayment', {
                    price_type: 'daily',
                    price_total: '$300',
                  })
                }>
                <Text style={{color: COLORS.white, ...FONTS.h1}}>Comfirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
      // <View>

      // </View>
    );
  }
}
>>>>>>> fd45dcff72cffcd4e5367bb006b3e24a26028afe
