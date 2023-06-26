import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/Entypo';
import {Dialog, Button, TextInput, Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, loadUser} from '../redux/action';
import {clearMessage, clearMessageError} from '../redux/messageReducer';

const Home = () => {
  const disptach = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {loading, message, error} = useSelector(state => state.message);
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      setErr(error);
      setVisible(true);
      disptach(clearMessageError());
    }
    if (message) {
      setErr(message);
      setVisible(true);
      disptach(clearMessage());
    }
  }, [error, message, disptach]);

  const hideDialog = () => {
    setOpenDialog(!openDialog);
  };
  const addTaskHandler = async () => {
    hideDialog();
    await disptach(addTask(title, description));
    disptach(loadUser());
  };
  return (
    <>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        elevation={3}
        action={{
          label: 'close',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {err}
      </Snackbar>
      <View style={style.container}>
        <Text style={style.heading}>All Tasks</Text>
        <TouchableOpacity style={style.addBtn} onPress={hideDialog}>
          <Icon name="add-to-list" size={20} color="#900" />
        </TouchableOpacity>
        {user && (
          <FlatList
            keyExtractor={item => item._id}
            data={user.task}
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
        )}
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
            <Button
              textColor="#900"
              onPress={addTaskHandler}
              disabled={title === '' || description === '' || loading}>
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
