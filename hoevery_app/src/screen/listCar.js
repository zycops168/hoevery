import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ListItem, SearchBar, Avatar} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import TouchableScale from 'react-native-touchable-scale'; 

import {styles} from '../style';

import WorkController from '../controller/WorkController';

const RenderHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        padding: 10,
        height: 80,
      }}>
      {/* Text */}
      <View style={{flex: 1}}>
        <Text
          style={{
            color: '#362222',
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Cochin',
          }}>
          Find the nearest car
        </Text>
        <Text
          style={{
            marginTop: 3,
            color: '#ffd700',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Cochin',
          }}>
          for you.
        </Text>
      </View>
      {/* Image */}
      <TouchableOpacity onPress={() => {}}>
        <Feather style={{}} name="filter" color="#ffd700" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default class listCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getDataAPI();
  }

  getDataAPI = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    this.setState({loading: true});
    const response = await fetch(
      `http://203.150.107.212/tenant/get-car-with-type?typeOfWork=${WorkController.Work.workname}`,
      requestOptions,
    );
    const result = await response.json();
    try {
      if (result.ret == 0) {
        this.setState({loading: false, data: result.data.row});
        // console.log(result.data.row);
      } else {
        alert(result.msg);
      }
    } catch (err) {
      alert(err);
    }
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#ffd700',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        // onChangeText={this.handleSearch}
        value={this.state.query}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={styles_local.container}>
        <StatusBar backgroundColor="#eeeeee" barStyle="light-content" />
        <View>
          <RenderHeader />
        </View>
        <View style={styles_local.content}>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndiactor={false}
            ItemSeparatorComponent={this.renderSeparator}
            // ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            renderItem={({item}) => (
              <ListItem
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}
                // bottomDivider>
                >
                <Avatar
                  size="large"
                  source={{
                    uri: `http://203.150.107.212/static/files/upload/${item.image}`,
                  }}
                  rounded
                  title="img"
                  onPress={() => console.log('Freature => Pop image')}
                />
                <ListItem.Content>
                  <ListItem.Title>{item.type}</ListItem.Title>
                  <ListItem.Subtitle>{'location: 0.6 km'}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="#ffd700" />
              </ListItem>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles_local = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.05,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 10,
  },
  content_header: {
    fontSize: 25,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
