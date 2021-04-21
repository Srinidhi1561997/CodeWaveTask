/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView} from 'react-native';
import Number from './Components/Number';

const App: () => Node = () => {
 
  return (
    <SafeAreaView style={{flex:1}}>
       <Number/>      
    </SafeAreaView>
  );
};

export default App;
