//React-VR Standard Code
import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  Scene,
  View,
  VrButton,
  NativeModules
} from 'react-vr';
import clientAuth from '../js/clientAuth.js'

//self-produced views
import SignUp from './SignUp.js'
import Home from './Home.js'
import AddText from './AddText.js'
import Login from './Login.js'

const History = NativeModules.History
// 
//state begins with login and no user as we update user once we recognize a JWT, must keep track of every view for conditional rendering, viewOwner represents who owns the world we are in
export default class App extends React.Component {
  state={
    history: [['login']],
    currentHistoryIndex: 0,
    user: null,
    view: 'login',
    viewOwner: null,
    location: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    }
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
    console.log('tried to go back')
  }
  //Go forwards will be used to change the view to go forwards in history
  goForwards(){
    //hijack history API
  }
  //------------------------------------------------------
  
  componentDidMount() {
		this.setState({ 
      user: clientAuth.getCurrentUser() 
    }, ()=>{
      History.pushState(this.state, "Login", "/login")
    })
    
  }
  //not yet implemented
	onLoginSuccess(user) {
		this.setState({ 
      user: clientAuth.getCurrentUser() 
    })
	}
  //not yet implemented
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
    //console.log("History", History)
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
    }, ()=>{
      History.pushState(this.state, this.state.newViewOwner + linkSplits[0],link)
    })
    //if navigating to a new user's profile
  }
  onInput(evt){
    if(evt.nativeEvent.inputEvent.type == 'KeyboardInputEvent'){
      //if key is wasd or arrows, begin moving!
      var theKeyCode = evt.nativeEvent.inputEvent.keyCode
      var key = evt.nativeEvent.inputEvent.key
      var eventType = evt.nativeEvent.inputEvent.eventType
      
      if(key == 'w'){
        //KEYDOWN VS KEYUP
        eventType == 'keydown'? this.handleMovement('w'): null
        
      }
      if(key == 's'){
        eventType == 'keydown'? this.handleMovement('s'): null
      }
      if(key == 'a'){
        eventType == 'keydown'? this.handleMovement('a'): null
      }
      if(key =='d'){
        eventType == 'keydown'? this.handleMovement('d'): null
      }
      if( key == 'left'){
        eventType == 'keydown'? this.handleMovement('left'): null
      }
      if(key == 'right'){
        eventType == 'keydown'? this.handleMovement('right'): null
      }
      //make movement in a direction true if that key is down

    }
  }
  handleMovement(direction){
    var speed = 0.1
    var dx = 0
    var dy = 0
    var dz = 0

    if(direction == 'w'){
      dz = 1
    }
    if(direction == 's'){
      dz = -1
    }
    if(direction == 'a'){
      dx = -1
    }
    if(direction == 'd'){
      dx = 1
    }
    this.setState({
      location:{
        x: this.state.location.x + dx*speed,
        y: this.state.location.y + dy*speed,
        z: this.state.location.z - dz*speed
      }
    })
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
   if(this.state.view == 'signup'){
     return(
      <SignUp changeView={this.changeView.bind(this)}/>
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
    else if(this.state.view == 'login'){
      return(
        <Scene style={{transform:[{translateX: this.state.location.x}, {translateY: this.state.location.y}, {translateZ: this.state.location.z}]}} onInput={this.onInput.bind(this)}><Login changeView={this.changeView.bind(this)} /></Scene>
      )
    }
  }
   };