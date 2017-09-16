/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Route from './src/Component/Route'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Store/index.js';
export default class PatientTracker extends Component {
  render() {
    return (
    <Provider store={store}>
      <Route />
    </Provider>


    );
  }
}
AppRegistry.registerComponent('PatientTracker', () => PatientTracker);
