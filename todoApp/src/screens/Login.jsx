import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {ROUTE} from '../common/Route';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = () => {};

  return (
    <View style={styles.container1}>
      <Text style={styles.txt1}>WELCOME</Text>
      <View style={styles.container2}>
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
        <Button
          disabled={!email || !password}
          style={styles.btn}
          onPress={loginHandler}>
          <Text style={styles.txt2}>Login</Text>
        </Button>
        <Text style={styles.txt3}>Or</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTE.Register)}>
          <Text style={styles.txt4}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: 20,
    margin: 20,
  },
  container2: {
    width: '70%',
  },
  input1: {},
  btn: {},
  txt2: {
    color: '#fff',
  },
  txt3: {
    marginTop: 20,
  },
  txt4: {
    color: '#900',
    height: 30,
    margin: 20,
  },
});
