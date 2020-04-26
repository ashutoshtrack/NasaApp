import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/HomeScreen';
import DetailScreen from '../DetailScreen/DetailScreen';

const Stack = createStackNavigator();

MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MyStack;
