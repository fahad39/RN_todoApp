import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../common/Route';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Home</Text>
      <Text onPress={() => navigation.navigate(ROUTE.Login)}>Hello world</Text>
    </View>
  );
};

export default Home;
