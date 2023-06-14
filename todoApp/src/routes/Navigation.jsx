import React from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTE} from '../common/Route';
import Home from '../screens/Home';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTE.Home}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name={ROUTE.Login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
