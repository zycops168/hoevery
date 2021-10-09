import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

export const COLORS = {
    // base colors
    primary: "#f7a914",
    secondary: "#4e4c4c",
    background: "#f6f5ed",

    backgroundInput: "#f4e4b9",


    green: "#66D50A",
    lightGreen: "#66D50A",

    lime: "#00BA63",
    emerald: "#2BC978",
    drakGreen: "#2f4f4f",
    
    red: "#ff4134",
    lightRed: "#FFF1F0",

    pink: "#ff69b4",

    blue: "#3E76DF",
    
    purple: "#6B3CE9",
    lightPurple: "#F3EFFF",
    
    yellow: "#F8B135",
    lightYellow: "#F1E5CB",
    
    black: "#1E1F20",
    white: "#FFFFFF",
    
    lightGray: "#FCFBFC",
    gray: "#eeeeee",
    darkGray: "#C3C6C7",

    transparent: "transparent",
}


export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    //font sizes
    largeTitle: 50,
    h1: 26,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 36,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height

}

export const FONTS = {
    largeTitle1: { fontFamily:"Roboto-Regular", fontSize: SIZES.largeTitle, lineHeight: 50},
    largeTitle2: { fontFamily:"Birthstone-Regular", fontSize: SIZES.largeTitle, lineHeight: 50},
    largeTitle3: { fontFamily:"Delight Candles ", fontSize: SIZES.largeTitle, lineHeight: 50},
    largeTitle4: { fontFamily:"Just Another Hand", fontSize: SIZES.largeTitle, lineHeight: 50},
    largeTitle5: { fontFamily:"Lobster-Regular", fontSize: SIZES.largeTitle, lineHeight: 50},
    h1: { fontFamily:"Roboto-Black", fontSize: SIZES.h1, lineHeight: 36},
    h2: { fontFamily:"Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30},
    h3: { fontFamily:"Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22},
    h4: { fontFamily:"Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22},
    body1: { fontFamily:"Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36},
    body2: { fontFamily:"Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30},
    body3: { fontFamily:"Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22},
    body4: { fontFamily:"Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22},
    body5: { fontFamily:"Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22},
}

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;