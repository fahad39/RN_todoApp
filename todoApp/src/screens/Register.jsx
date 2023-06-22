import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {ROUTE} from '../common/Route';
import {launchImageLibrary} from 'react-native-image-picker';

const Register = ({navigation}) => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandle = () => {};
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

  return (
    <View style={styles.container1}>
      <Avatar.Image
        size={100}
        source={{uri: avatar ? avatar : null}}
        style={styles.avatarStyle}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={styles.txt3}>Change Photo</Text>
      </TouchableOpacity>
      <View style={styles.container2}>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          value={name}
          onChange={setName}
        />
        <TextInput
          style={styles.input1}
          placeholder="Email"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          style={styles.input1}
          placeholder="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
      </View>
      <Button
        disabled={!email || !password || !name}
        style={styles.btn}
        onPress={registerHandle}>
        <Text style={styles.txt1}>Register</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.Login)}>
        <Text style={styles.txt4}>Have an Account, Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    color: '#fff',
  },
  container2: {
    width: '70%',
    alignItems: 'center',
  },
  input1: {
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
  },
  txt2: {
    color: '#fff',
  },
  txt3: {
    color: '#900',
  },
  txt4: {
    color: '#900',
    height: 30,
    margin: 20,
  },
  avatarStyle: {
    backgroundColor: '#900',
  },
});
