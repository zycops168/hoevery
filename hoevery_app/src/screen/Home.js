import React, {Component} from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

const featuresData = [
  {
    id: 1,
    icon: icons.reload,
    color: COLORS.purple,
    backgroundColor: COLORS.lightPurple,
    description: 'Top Up',
  },
  {
    id: 2,
    icon: icons.send,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightYellow,
    description: 'Transfer',
  },
  {
    id: 3,
    icon: icons.internet,
    color: COLORS.gree,
    backgroundColor: COLORS.lightGreen,
    description: 'Internet,
  },
  {
    id: 4,
    icon: icons.wallet,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: 'Wallet',
  },
  {
    id: 5,
    icon: icons.bill,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightYellow,
    description: 'Bill',
  },
  {
    id: 6,
    icon: icons.game,
    color: COLORS.green,
    backgroundColor: COLORS.lightGreen,
    description: 'Games',
  },
  {
    id: 7,
    icon: icons.phone,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: 'mobile Prepaid',
  },
  {
    id: 8,
    icon: icons.info,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: 'Info',
  },

];

const specialPromoData = [
    {
        id: 1,
        img: images.facebookLogo,
        title: "facebook",
        description: "Don't miss it. Grab it now!"
    },
    {
        id: 2,
        img: images.googleLogo,
        title: "google",
        description: "Don't miss it. Grab it now!"
    },
    {
        id: 3,
        img: images.lineLogo,
        title: "line",
        description: "Don't miss it. Grab it now!"
    },
    {
        id: 4,
        img: images.twitterLogo,
        title: "twitter",
        description: "Don't miss it. Grab it now!"
    },
]



export class RenderPromos extends Component {
    render() {
        return {
            
        }
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             features: this.featuresData(),
             specialPromos: this.specialPromoData()
        }
    }
    
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
