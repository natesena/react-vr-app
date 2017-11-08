import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
} from 'react-vr';
import App from './Views/App.js'


export default class test_vr extends React.Component {
 render(){
   return(
      <App/>
   )
 }
};

AppRegistry.registerComponent('test_vr', () => test_vr);
