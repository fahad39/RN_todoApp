import React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../common/Route';
import Task from '../components/Task';

const Home = () => {
  const navigation = useNavigation();
  const tasks = [
    {
      title: 'Task1',
      description: 'Simple Task',
      completed: false,
      _id: 'djfhksadhfkshf',
    },
    {
      title: 'Task2',
      description: 'Simple Task',
      completed: false,
      _id: 'dfsdafdfgffffff',
    },
  ];
  return (
    <View style={style.container}>
      <Text style={style.heading}>All Tasks</Text>
      {tasks.map((item, index) => {
        return (
          <Task
            key={item._id}
            title={item.title}
            description={item.description}
            status={item.completed}
            taskId={item._id}
          />
        );
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
