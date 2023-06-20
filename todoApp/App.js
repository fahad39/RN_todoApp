/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/routes/Navigation';
import Footer from './src/components/Footer';

function App() {
  return (
    <SafeAreaView style={style.container}>
      <Navigation />
      <Footer />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default App;
