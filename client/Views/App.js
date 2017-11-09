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
import Home from './Home.js'

export default class App extends React.Component {
  state={
    history: ['/login'],
    user: null,
    view: '/login'
  }
  formatAddress(string){
    var stringARR = string.split('')
    var splits = []
    var currentSplit = ''
    for(let i = 0; i < stringARR.length; i++){
      if(stringARR[i] !=='/'){
        currentSplit+=stringARR[i]
        if(i == stringARR.length -1){
          splits.push(currentSplit)
        }
      }
      else{
        if(currentSplit){
          splits.push(currentSplit)
        }
        currentSplit = ''
      }
    }
    return splits
  }

  goBack(){
    //hijack history API
  }
  goForwards(){
    //hijack history API
  }
  //------------------------------------------------------
  componentDidMount() {
		this.setState({ user: clientAuth.getCurrentUser() })
	}

	onLoginSuccess(user) {
		this.setState({ user: clientAuth.getCurrentUser() })
	}

	logOut() {
		clientAuth.logOut()
		this.setState({ user: null })
  }
  //-----------------------------------------------------
  changeView(link, user){
    console.log('tried to changeview')
    console.log(formatAddress(link))
    //formatAddress()
    this.setState({
      history: [...this.state.history, link ],
      view: link,
      user: user
    })
  }
  render(){
    console.log("state:", this.state)
   if(this.state.view == '/login'){
     return(
      <Login changeView={this.changeView.bind(this)}/>
     )
   }
   else if(this.state.view == '/home'){
      return(
      <Home user={this.state.user} changeView={this.changeView.bind(this)}/>
      )
    }
  }
   };