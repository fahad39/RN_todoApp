import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTE} from '../common/Route';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Footer from '../components/Footer';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import {useSelector, useDispatch} from 'react-redux';
import {loadUser} from '../redux/action';
import {Text} from 'react-native-paper';
import Loader from '../components/Loader';
import Password from '../screens/Password';
import Verify from '../screens/Verify';
import ForgetPassword from '../screens/ForgetPassword';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isAuthenticated, loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? ROUTE.Home : ROUTE.Login}>
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
        <Stack.Screen name={ROUTE.Profile} component={Profile} />
        <Stack.Screen name={ROUTE.Password} component={Password} />
        <Stack.Screen name={ROUTE.ForgetPassword} component={ForgetPassword} />
        <Stack.Screen name={ROUTE.Verify} component={Verify} />
        <Stack.Screen name={ROUTE.ResetPassword} component={ResetPassword} />
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Navigation;
