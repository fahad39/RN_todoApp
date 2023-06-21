import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTE} from '../common/Route';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Footer from '../components/Footer';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Camera from '../screens/Camera';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTE.Login}>
        <Stack.Screen
          name={ROUTE.Home}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTE.Login}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTE.Register}
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTE.Camera}
          component={Camera}
          options={{headerShown: false}}
        />
        <Stack.Screen name={ROUTE.Profile} component={Profile} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default Navigation;
