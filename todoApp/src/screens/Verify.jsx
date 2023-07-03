import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {loadUser, verifyAccount} from '../redux/action';

const Verify = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();

  const verifyHandler = async () => {
    await dispatch(verifyAccount(code));
    dispatch(loadUser());
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.txt1}>Verify Account</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input1}
          placeholder="Enter Verification Code"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />

        <Button disabled={!code} style={styles.btn} onPress={verifyHandler}>
          <Text style={styles.txt2}>Verify</Text>
        </Button>

        <Text>{err}</Text>
      </View>
    </View>
  );
};

export default Verify;

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
    marginTop: 20,
  },
  txt4: {
    color: '#900',
    height: 30,
    margin: 20,
  },
});
