import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../common/Route';

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.view1}>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.Home)}>
        <Icon name="home" size={30} color="#900" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.Profile)}>
        <Icon name="user" size={30} color="#900" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    padding: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export default Footer;
