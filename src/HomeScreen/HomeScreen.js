/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {
  List,
  ListItem,
  Button,
  Body,
  Item,
  Input,
  Toast,
  Root,
} from 'native-base';

const API_KEY = 'GVkCwT22O8SGeZgGtPRE0srcZIkpf3i1piXvFubB';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: '',
      dataList: [],
      dataDetail: null,
      loader: false,
    };
  }

  renderIssue = () => {
    Toast.show({
      text: 'No Records to display',
      buttonText: 'Okay',
      position: 'bottom',
    });
  };

  onSubmit = () => {
    this.fetchDetails(this.state.textInput);
  };
  onItemPress = (dataId) => {
    this.fetchDetails(dataId);
  };

  fetchDetails = async (dataId) => {
    this.setState({loader: true});
    try {
      let response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${dataId}?api_key=${API_KEY}`,
      );

      this.props.navigation.navigate('Details', {
        detailsData: response.data,
      });
    } catch (e) {
      this.renderIssue();
    }
    this.setState({loader: false, textInput: ''});
  };

  onRandomAsteriod = async () => {
    this.setState({loader: true});
    try {
      let response = await axios.get(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY',
      );
      this.setState({dataList: response.data.near_earth_objects});
    } catch (e) {
      this.renderIssue();
    }
    this.setState({loader: false});
  };

  onChangeText = (text) => {
    this.setState({textInput: text});
  };

  renderList = () => (
    <FlatList
      data={this.state.dataList}
      renderItem={({item}) => (
        <List>
          <ListItem onPress={() => this.onItemPress(item.id)}>
            <Body style={{alignItems: 'center'}}>
              <Text> {item.id}</Text>
            </Body>
          </ListItem>
        </List>
      )}
    />
  );

  LoaderOverlay = () => (
    <View style={styles.loaderOverlay}>
      <ActivityIndicator size={80} color={'#000'} />
    </View>
  );

  render() {
    return (
      <Root>
        <View style={styles.container}>
          <View style={styles.formLay}>
            <Item style={styles.inputStyle} rounded>
              <Input
                value={this.state.textInput}
                onChangeText={this.onChangeText}
                placeholder="Enter Asteriod Id"
                keyboardType={'number-pad'}
              />
            </Item>
            <View style={{marginTop: 10}}>
              <Button
                style={styles.buttonStyle}
                disabled={this.state.textInput == '' ? true : false}
                onPress={this.onSubmit}>
                <Text style={styles.textStyle}>Submit</Text>
              </Button>
            </View>
            <View style={{marginTop: 10}}>
              <Button
                style={styles.buttonStyle}
                primary
                onPress={this.onRandomAsteriod}>
                <Text style={styles.textStyle}>Random Asteriod</Text>
              </Button>
            </View>
          </View>

          <View style={styles.listLay}>
            {this.state.dataList.length > 0 ? this.renderList() : null}
          </View>
        </View>

        {this.state.loader ? this.LoaderOverlay() : null}
      </Root>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
  },
  inputStyle: {width: '80%', backgroundColor: '#fff', elevation: 7},
  loaderOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  buttonStyle: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listLay: {flex: 1, backgroundColor: 'white'},
  formLay: {
    width: '100%',
    height: 250,
    borderWidth: 0.1,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {color: '#fff', fontSize: 18, textAlign: 'center'},
});
