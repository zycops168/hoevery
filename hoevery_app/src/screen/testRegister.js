import React, {Component} from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';

export default class testDeploy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      tel: '',
    };
  }

  registerAPI = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      tel: this.state.tel,
      image: '',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://203.150.107.212/user/register', requestOptions)
      .then(response => response.text())
      .then(result => { 
          console.log(result)
          this.setState({data:result})
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      <View>
        <Button onPress={() => this.registerAPI()} title="REGISTER" />
        <TextInput
          style={{margin: 10, borderBottomWidth: 1}}
          placeholder=" *username"
          autoCapitalize="none"
          onChangeText={username => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={{margin: 10, borderBottomWidth: 1}}
          placeholder=" *password"
          autoCapitalize="none"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          style={{margin: 10, borderBottomWidth: 1}}
          placeholder=" *firstname"
          autoCapitalize="none"
          onChangeText={firstname => this.setState({firstname})}
          value={this.state.firstname}
        />
        <TextInput
          style={{margin: 10, borderBottomWidth: 1}}
          placeholder=" *lastname"
          autoCapitalize="none"
          onChangeText={lastname => this.setState({lastname})}
          value={this.state.lastname}
        />
        <TextInput
          style={{margin: 10, borderBottomWidth: 1}}
          placeholder=" *tel"
          autoCapitalize="none"
          onChangeText={tel => this.setState({tel})}
          value={this.state.tel}
        />
        <Text>{this.state.data}</Text>
        
      </View>
    );
  }
}
