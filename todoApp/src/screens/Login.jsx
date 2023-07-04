import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {ROUTE} from '../common/Route';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/action';
import {clearError} from '../redux/reducer';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const {isAuthenticated, loading, error} = useSelector(state => state.auth);
  const loginHandler = () => {
    dispatch(clearError());
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (error !== '') {
      setErr(error);
    }
  }, [error, dispatch]);

  return (
    <View style={styles.container1}>
      <Text style={styles.txt1}>WELCOME</Text>
      <View style={styles.container2}>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input1}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          disabled={!email || !password}
          style={styles.btn}
          onPress={loginHandler}>
          <Text style={styles.txt2}>{loading ? 'Loading' : 'Login'}</Text>
        </Button>
        <Text style={styles.txt3}>Or</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTE.Register)}>
          <Text style={styles.txt4}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTE.ForgetPassword)}>
          <Text style={styles.txt4}>Forget Password</Text>
        </TouchableOpacity>
        <Text>{err}</Text>
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
    marginTop: 70,
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
