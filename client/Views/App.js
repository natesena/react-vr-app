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
import AddText from './AddText.js'

export default class App extends React.Component {
  state={
    history: [['login']],
    currentHistoryIndex: 0,
    user: null,
    view: 'login'
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
  getLastHome(){
    for(let i = this.state.history.length - 1; i >= 0; i--){
      if(this.state.history[i][0] == 'home'){
        console.log("App Last Home",this.state.history[i][1])
        return this.state.history[i][1]
      }
      else{
        console.log('APP,getLastHome, no last user was found')
        return this.state.user._id 
      }
    }
  }
  //-----------------------------------------------------
  changeView(link, user){
    console.log('tried to change view within APP')
    var linkSplits = this.formatAddress(link)
    console.log('linkSplits', linkSplits)
    //need to handle currentHistoryIndex changing with backwards, forwards
    this.setState({
      history: [...this.state.history, linkSplits ],
      currentHistoryIndex: this.state.currentHistoryIndex + 1,
      view: linkSplits[0],
      user: user
    })
  }
  render(){
    var lastHome
    if(this.state.user){
      lastHome = this.getLastHome()
    }
    console.log(lastHome) 
    console.log("new state in APP:", this.state)
   if(this.state.view == 'login'){
     return(
      <Login changeView={this.changeView.bind(this)}/>
     )
   }
   else if(this.state.view == 'home'){
      return(
      <Home user={this.state.user} changeView={this.changeView.bind(this)}/>
      )
    }
    else if(this.state.view == 'add'){
      return(
        <AddText user={this.state.user} changeView={this.changeView.bind(this)} getHome={lastHome}/>
      )
    }
  }
   };