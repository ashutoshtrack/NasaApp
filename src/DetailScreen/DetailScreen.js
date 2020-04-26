import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

class DetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsData: props.route.params.detailsData,
    };
  }

  render() {
    let {
      name,
      nasa_jpl_url,
      is_potentially_hazardous_asteroid,
    } = this.state.detailsData;
    return (
      <View>
        <Card>
          <CardItem bordered>
            <Text>Name: </Text>
            <Text style={{fontWeight: 'bold'}}>{name}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>INFO Link: </Text>
              <Text style={{fontWeight: 'bold'}}>{nasa_jpl_url}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Text>Is Asteroid potentially hazardous ?: </Text>
            <Text style={{fontWeight: 'bold'}}>
              {is_potentially_hazardous_asteroid == true ? 'Yes' : 'No'}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default DetailScreen;
