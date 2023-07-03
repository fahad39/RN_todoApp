import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {ROUTE} from '../common/Route';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser, logout, updateProfile} from '../redux/action';
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const [name, setName] = useState(user.name);

  const handleImage = async () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    const result = await launchImageLibrary(options, res => {
      const img = res.assets[0].uri;
      setAvatar(img);
    });
  };

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('avatar', {
      uri: avatar,
      name: avatar.split('/').pop(),
    });
    dispatch(updateProfile(myForm));
    dispatch(loadUser());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{uri: avatar ? avatar : null}}
        style={styles.avatarStyle}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={styles.txt1}>Change Photo</Text>
      </TouchableOpacity>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button style={styles.btn} onPress={submitHandler}>
        <Text style={{color: '#fff'}}>Update</Text>
      </Button>
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate(ROUTE.Password)}>
        <Text style={{color: '#fff'}}>Change Password</Text>
      </Button>
      {user.verified ? null : (
        <Button
          style={styles.btn}
          onPress={() => navigation.navigate(ROUTE.Verify)}>
          <Text style={{color: '#fff'}}>Verify</Text>
        </Button>
      )}
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate(ROUTE.Verify)}>
        <Text style={{color: '#fff'}}>Verify</Text>
      </Button>

      <Button style={styles.btn} onPress={logoutHandler}>
        <Text style={{color: '#fff'}}>Logout</Text>
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarStyle: {
    backgroundColor: '#900',
  },
  txt1: {
    color: '#900',
  },
  container2: {
    width: '70%',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 1,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
    width: '100%',
  },
  btn: {
    backgroundColor: '#900',
    padding: 5,
    width: '70%',
    marginVertical: 10,
  },
});
