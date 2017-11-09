import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
} from 'react-vr';
import clientAuth from '../js/clientAuth.js'
import Login from './login.js'
import Test from './test.js'

export default class App extends React.Component {
  state={
    history: [],
    user: null,
    view: 'login'
  }
  //------------------------------------------------------
  componentDidMount() {
		this.setState({ currentUser: clientAuth.getCurrentUser() })
	}

	onLoginSuccess(user) {
		this.setState({ currentUser: clientAuth.getCurrentUser() })
	}

	logOut() {
		clientAuth.logOut()
		this.setState({ currentUser: null })
  }
  //-----------------------------------------------------
  changeView(link){
    //console.log(link)
    this.setState({
      ...this.state,
      view: link,
      //history
    })
  }
  render(){
    console.log(this.state)
   if(this.state.view == 'login'){
     return(
      <Login changeView={this.changeView.bind(this)}/>
     )
   }
   else if(this.state.view == 'test'){
      return(
      <Test/>
      )
    }
  }
   };