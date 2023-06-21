import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = useState('');
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
});
