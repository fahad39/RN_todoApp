import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => {
  return (
    <View style={styles.container1}>
      <ActivityIndicator animating={true} size={100} color="#900" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
