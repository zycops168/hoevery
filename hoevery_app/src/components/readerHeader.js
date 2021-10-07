import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default class readerHeader extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.padding * 0,
            marginBottom: SIZES.padding * 1,
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
            right: -15,
            top: 5,
          }}>
          Search excavator
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.padding * 0,
            marginBottom: SIZES.padding * 1,
            paddingHorizontal: SIZES.padding * 2,
          }}
          onPress={() => console.log('press filter button')}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
              marginLeft: SIZES.padding * 5,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
