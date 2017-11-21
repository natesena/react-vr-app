//React-VR Standard Code
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

//self-produced views
import Login from './login.js'
import Home from './Home.js'
import AddText from './AddText.js'
import NotSignup from './NotSignup.js'

// 
//state begins with login and no user as we update user once we recognize a JWT, must keep track of every view for conditional rendering, viewOwner represents who owns the world we are in
export default class App extends React.Component {
  state={
    history: [['NotSignup']],
    currentHistoryIndex: 0,
    user: null,
    view: 'NotSignup',
    viewOwner: null,
  }
  //format address takes the string from out changeView function and returns an array of all the necessary data that would typically be in URLs for RESTful Routes
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
  //Go back will be used to change the view to go backwards in history
  goBack(){
    //hijack history API
  }
  //Go forwards will be used to change the view to go forwards in history
  goForwards(){
    //hijack history API
  }
  //------------------------------------------------------
  
  componentDidMount() {
		this.setState({ 
      user: clientAuth.getCurrentUser() 
    })
	}

	onLoginSuccess(user) {
		this.setState({ user: clientAuth.getCurrentUser() })
	}

	logOut() {
		clientAuth.logOut()
		this.setState({ user: null })
  }
  //should return id of last home we were at
  getLastHome(){
    for(let i = this.state.history.length - 1; i >= 0; i--){
      console.log('APP, getlasthome history check:', this.state.history[i])
      if(this.state.history[i][0] == 'home'){
        console.log("App Last Home",this.state.history[i][1])
        return this.state.history[i][1]
      }
    }
    console.log('APP,getLastHome, no last user was found')
    return this.state.user._id 
    
  }
  //changeView changes the current view for the app to render
  changeView(link, newViewOwner){
    //thenewViewOwner is the user who owns the view we are navigating to
    //if a user just signed up, the new view owner is also the owner 
    console.log('tried to change view within APP')
    var linkSplits = this.formatAddress(link)
    console.log('linkSplits', linkSplits)
    //need to handle currentHistoryIndex changing with backwards, forwards
    //if there is no user set, then we propbably just signed in and the newviewowner passed in would be the new user
    this.setState({
      history: [...this.state.history, linkSplits ],
      currentHistoryIndex: this.state.currentHistoryIndex + 1,
      view: linkSplits[0],
      user: this.state.user? this.state.user: newViewOwner,
      viewOwner: newViewOwner,
    })
    //if navigating to a new user's profile
  }
  render(){
    //should i be getting the last home or last homeowner
    var lastHome
    //when you begin, user is null, so this is for error handling
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
      <Home user={this.state.user} homeOwner={this.state.viewOwner} changeView={this.changeView.bind(this)} getHome={lastHome}/>
      )
    }
    else if(this.state.view == 'add'){
      return(
        <AddText user={this.state.user} homeOwner={this.state.viewOwner} changeView={this.changeView.bind(this)} getHome={lastHome}/>
      )
    }
    else if(this.state.view == 'NotSignup'){
      return(
        <NotSignup changeView={this.changeView.bind(this)} />
      )
    }
  }
   };