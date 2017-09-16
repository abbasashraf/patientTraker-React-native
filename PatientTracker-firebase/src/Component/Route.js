import React,{Component} from 'react'

import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text ,Left,Right,Body,Title } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {Router,Scene} from 'react-native-router-flux';
import AddPatient from './addPatient'
import App from './app'
export default class Route extends Component{
    render() {
    return (
        <Router>
          <Scene key='root'>
              <Scene key='App' component={App} initial='true' hideNavBar='true'/> 
            <Scene key='AddPatient' component={AddPatient} hideNavBar='true'/>
          </Scene>
        </Router>    
    );
  }

}
