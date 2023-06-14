import React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../common/Route';
import Task from '../components/Task';

const Home = () => {
  const navigation = useNavigation();
  const tasks = [1, 2, 1];
  return (
    <View style={style.container}>
      <Text style={style.heading}>All Tasks</Text>
      {tasks.map((item, index) => {
        return <Task key={index} title={item} />;
      })}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#474747',
  },
});

export default Home;
