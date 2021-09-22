import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }

  render() {
    return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>MochiMochi</Text>   
        <Text style={styles.mail}>kim_mo27@hotmail.com</Text>      
      </View>

      <View style={styles.inside}>
        <View style={{flex: 0. ,justifyContent: 'center'}}>
          <Button 
            title="ให้เช่า"
            name="arrow-right" 
            size={30} 
            color="pink" 
            containerStyle={{ top: 50, left: 130, width: 100 }}
            /> 
        </View>     

        <View style={{flex: 0. ,justifyContent: 'center'}}>
          <Button 
            name="heart" 
            size={30} 
            color="pink" 
            containerStyle={{ top: 150, left: 20, width: 50 }}
            /> 
          <Text style={{top: 150, left: 20}}>HISTORY</Text>  
        </View>  
        <View style={{flex: 0.1 ,justifyContent: 'center'}}>
          <Button 
            name="heart" 
            size={30} 
            color="pink" 
            containerStyle={{ top: 110, left: 150, width: 50 }}
            /> 
          <Text style={{top: 110, left: 145}}>ADDRESS</Text>  
        </View>  
          <View style={{flex: 0.1 ,justifyContent: 'center'}}>
          <Button 
            name="heart" 
            size={30} 
            color="pink" 
            containerStyle={{ top: 65, left: 280, width: 50 }}
            /> 
          <Text style={{ top: 65, left: 275 }}>PRIVACY</Text>  
        </View>  
        <View style={{flex: 0.1 ,justifyContent: 'center'}}>
          <Button 
            name="heart" 
            size={30} 
            color="pink" 
            containerStyle={{ top: 130, left: 80, width: 50 }}
            /> 
          <Text style={{ top: 130, left: 90 }}>LIKE</Text>  
        </View>  
        <View style={{flex: 0.1 ,justifyContent: 'center'}}>
          <Button 
            name="heart" 
            size={30} 
            color="pink" 
            containerStyle={{ top: 85, left: 220, width: 50 }}
            /> 
          <Text style={{ top: 85, left: 227 }}>HELP</Text>  
        </View>  
        <View style={{flex: 0.1 ,justifyContent: 'center'}}>
          <Button 
            name="heart" 
            size={30} 
            color="pink" 
            containerStyle={{ top: 280, left: 280, width: 50 }}
            /> 
          <Text style={{ top: 280, left: 277 }}>LOGOUT</Text>  
        </View> 

      </View>   
    </View>

  );

    }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1CA89',
    alignItems: 'center',
    height: 750,
  },

  header: {
    backgroundColor: '#CC9B6D',
    alignItems: 'flex-start',
    alignItems: 'center',
    height: 100,
    width: 400
  },

  name: {
    color: 'white',
    fontSize: 25,
    top: 20,
    left: 60

  },
  mail: {
    color: 'white',
    fontSize: 15,
    top: 25,
    left: 77
  },

  inside: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 120,
    height: 500,
    width: 350
  },


});

export default Profiles;
