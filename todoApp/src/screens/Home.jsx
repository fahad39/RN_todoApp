import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '../common/Route';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/Entypo';
import {Dialog, Button, TextInput} from 'react-native-paper';

const Home = () => {
  const navigation = useNavigation();
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const hideDialog = () => {
    setOpenDialog(!openDialog);
  };
  const addTaskHandler = () => {
    console.log('task added');
  };
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
    <>
      <View style={style.container}>
        <Text style={style.heading}>All Tasks</Text>
        <FlatList
          keyExtractor={item => item._id}
          data={tasks}
          renderItem={({item}) => (
            <Task
              key={item._id}
              title={item.title}
              description={item.description}
              status={item.completed}
              taskId={item._id}
            />
          )}
        />

        <TouchableOpacity style={style.addBtn} onPress={hideDialog}>
          <Icon name="add-to-list" size={20} color="#900" />
        </TouchableOpacity>
      </View>
      <Dialog visible={openDialog} onDismiss={hideDialog}>
        <Dialog.Title>Add a Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={style.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={style.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <View style={style.view1}>
            <TouchableOpacity onPress={hideDialog}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <Button textColor="#900" onPress={addTaskHandler}>
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
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
  addBtn: {
    backgroundColor: '#fff',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Home;
