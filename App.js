/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import 'react-native-gesture-handler';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import MyStack from './src/router/Mainrouter';

class App extends React.Component {
  render() {
    return (
      <Root>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </Root>
    );
  }
}

export default App;
