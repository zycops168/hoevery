import React, {Component} from 'react';
import {Text, View, Button, TextInput, FlatList} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default class testDeploy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      id: '',
    };
  }

  getDataAPI = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(`http://203.150.107.212/user/${this.state.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        this.setState({data: result});

        this.data = result;
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      <View>
        <Button onPress={() => this.getDataAPI()} title="GET DATA" />
        <TextInput
          style={{margin: 10, borderBottomWidth: 1}}
          placeholder=" *id"
          autoCapitalize="none"
          onChangeText={id => this.setState({id})}
          value={this.state.id}
        />
        <Text>{this.state.data}</Text>

        
        <Button
          onPress={() => this.props.navigation.navigate('testRegister')}
          title="resgister"
        />
      </View>
    );
  }
}
