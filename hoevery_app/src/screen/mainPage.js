import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import {styles} from '../style';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { SpeedDial,LinearProgress } from 'react-native-elements';

const  mainPage= ({navigation}) => {
    
    const [open, setOpen] = useState(false)

    return (
        // all of body is header/body/footer
        <View style={styles1.container}>
      {/* header */}
            <View style={styles1.header}>
            <Text style={[styles.text_header1, {color: '#362222'}]}>SELECT</Text>
            </View>
            <View style={styles1.header2}>
            <Text style={[styles.text_header1, {color: '#800080'}]}>E</Text>
            <Text style={[styles.text_header1, {color: '#00008b'}]}>X</Text>
            <Text style={[styles.text_header1, {color: '#00ced1'}]}>C</Text>
            <Text style={[styles.text_header1, {color: '#00ff7f'}]}>A</Text>
            <Text style={[styles.text_header1, {color: '#ffff00'}]}>V</Text>
            <Text style={[styles.text_header1, {color: '#ff8c00'}]}>A</Text>
            <Text style={[styles.text_header1, {color: '#DA1503'}]}>T</Text>
            <Text style={[styles.text_header1, {color: '#a52a2a'}]}>O</Text>
            <Text style={[styles.text_header1, {color: '#8b0000'}]}>R</Text>
            </View>
       {/* body */}
       
            <View style={styles1.body}>
                <View style={styles1.left_body}>
                <TouchableOpacity style={{flex:1}}
                      onPress={()=> navigation.navigate('findCar')}>
                            <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/1_crawler.png')}
                        onPress={()=> navigation.navigate('findCar')}
                        borderRadius={10}
                            />
                            <Text style={styles1.text_exca_detail}> •- Crawler -•</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={{flex:1}}
                      onPress={()=> navigation.navigate('findCar')}>
                            <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/2_dragline.png')}
                        onPress={()=> navigation.navigate('findCar')}
                        borderRadius={10}
                            />
                         <Text style={styles1.text_exca_detail}> •- Drag Line -•</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity style={{flex:1}}
                      onPress={()=> navigation.navigate('findCar')}>
                            <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/3_suction.png')}
                        onPress={()=> navigation.navigate('findCar')}
                        borderRadius={10}
                            />
                         <Text style={styles1.text_exca_detail}> •- Suction -•</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles1.right_body}>
           
                <TouchableOpacity style={{flex:1}}
                      onPress={()=> navigation.navigate('findCar')}>
                            <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/4_skid_steel.png')}
                        onPress={()=> navigation.navigate('findCar')}
                        borderRadius={10}
                            />
                         <Text style={styles1.text_exca_detail}> •- Skid Steel -•</Text>
                    </TouchableOpacity>      
                    <TouchableOpacity style={{flex:1}}
                      onPress={()=> navigation.navigate('findCar')}>
                            <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/5_long_reach.png')}
                        onPress={()=> navigation.navigate('findCar')}
                        borderRadius={10}
                            />
                         <Text style={styles1.text_exca_detail}> •- Long Reach -•</Text>
                    </TouchableOpacity>          
                    <TouchableOpacity style={{flex:1}}
                      onPress={()=> navigation.navigate('findCar')}>
                            <Image
                        style={styles1.pic_main}
                        source={require('../../images/type_ex/6_mini_crawler.png')}
                        onPress={()=> navigation.navigate('findCar')}
                        borderRadius={10}
                            />
                            <Text style={styles1.text_exca_detail}> •- Mini Crawler -•</Text>
                    </TouchableOpacity>       
                </View>                    
                </View>

        {/* footer */}
            <View style={styles1.footer}>    
            </View>
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
                    onPress={()=> navigation.navigate('Profiles')} // for page kim
                />
                <SpeedDial.Action
                    color={'#ffd700'}
                    icon={{ name: 'logout', color: '#362222' }}
                    title="Logout"
                    onPress={() => console.log('Delete Something')}
                />
            </SpeedDial>
            <LinearProgress color="#ff69b4" />
        </View>
    )
}

const styles1 = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#fff',
    },
    header : {
        flex:0.1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#fff'
    },
    header2 : {
        flex:0.1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#fff'
    },
    body : {
        flex: 0.9,
        width:"90%",
        paddingHorizontal: 5,
        flexDirection:'row',
        backgroundColor:'#ffff',
        justifyContent: 'space-around', //y
        alignItems: 'flex-start',  //x
        alignSelf: 'center',
        borderRadius:5,
        // shadowOffset: { width: 10, height: 10 },
        // shadowColor: '#000',
        // shadowOpacity: 1.0,
        // shadowRadius: 1.0,
        // // elevation: 1,
    }, 
    footer : {
        flex:0.1,
        backgroundColor: '#fff',
        padding: 10
    },
    left_body : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    right_body : {
        flex:1,
        flexDirection:'column',
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textaddbtn: {
        padding:15,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf:'center',
        color:'#2f4f4f'
      },
    text_select : {
        fontSize: 18,
    },
    pic_main  : {
        width: 150,
        height: 100,
    },
    text_exca_detail :{
        paddingTop:10,  
        fontSize: 18,
        fontWeight: 'normal',
        alignSelf: 'center'
    }
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