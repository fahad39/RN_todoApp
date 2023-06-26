import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {deleteTask, updateTask} from '../redux/action';

const Task = ({title, description, status = false, taskId}) => {
  const [completed, setCompleted] = useState(status);
  const dispatch = useDispatch();
  const handleCheckBox = () => {
    setCompleted(!completed);
    dispatch(updateTask(taskId));
  };
  const deleteHandler = () => {
    console.log('deleted task');
    dispatch(deleteTask(taskId));
  };
  return (
    <View style={style.container}>
      <View style={style.container2}>
        <Text style={style.txt1}>{title}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
      <Checkbox
        status={completed ? 'checked' : 'unchecked'}
        color="#474747"
        onPress={handleCheckBox}
      />
      <Icon
        name="delete"
        color="#fff"
        size={20}
        style={style.iconStyle}
        onPress={deleteHandler}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container2: {
    width: '70%',
  },
  txt1: {
    fontSize: 20,
    marginVertical: 7,
    color: '#900',
  },
  description: {
    color: '#4a4a4a',
  },
  iconStyle: {
    backgroundColor: '#900',
    padding: 10,
    borderRadius: 100,
  },
});

export default Task;
