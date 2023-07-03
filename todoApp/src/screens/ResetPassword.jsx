import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {ROUTE} from '../common/Route';

const ResetPassword = ({naivgation}) => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const passwordHandler = async () => {
    await dispatch(otp, password);
    naivgation.navigate(ROUTE.Login);
  };

  return (
    <View style={styles.container1}>
      <Text style={styles.txt1}>Reset Password</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input1}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input1}
          placeholder="Enter New Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input1}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button
          disabled={loading}
          style={styles.btn}
          loading={loading}
          onPress={passwordHandler}>
          <Text style={styles.txt2}>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default ResetPassword;

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
    color: '#fff',
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
