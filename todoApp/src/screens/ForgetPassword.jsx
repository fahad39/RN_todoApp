import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import {ROUTE} from '../common/Route';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword, updatePassword} from '../redux/action';
import {clearError} from '../redux/reducer';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);

  const changePasswordHandler = async () => {
    await dispatch(forgetPassword(email));
    navigation.navigate(ROUTE.ResetPassword);
  };
  useEffect(() => {
    if (error !== '') {
      setErr(error);
    }
  }, [error, dispatch]);

  return (
    <View style={styles.container1}>
      <Text style={styles.txt1}>Change Password</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input1}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry
        />

        <Button
          disabled={loading}
          style={styles.btn}
          loading={loading}
          onPress={changePasswordHandler}>
          <Text style={styles.txt2}>Send Email</Text>
        </Button>
      </View>
    </View>
  );
};

export default ForgetPassword;

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
