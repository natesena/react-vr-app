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
  NativeModules,
  VrHeadModel
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
    rotation: [0,0,0]
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
    console.log('Component MOunt Head Rotation: ',VrHeadModel.rotation())
		this.setState({ 
      user: clientAuth.getCurrentUser(),
      rotation: VrHeadModel.rotation()
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
      location: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: [0,0,0]
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
      
      //console.log('evt key', key)

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
      if( key == 'ArrowLeft'){
        eventType == 'keydown'? this.handleMovement('ArrowLeft'): null
      }
      if(key == 'ArrowRight'){
        eventType == 'keydown'? this.handleMovement('ArrowRight'): null
      }
      //make movement in a direction true if that key is down

    }
  }
  handleMovement(direction){
    //currenRotation gets the rotation of the user ie, the rotation of the view as they have pulled it on desktop of moved on mobile
    var currentRotation = VrHeadModel.rotation()

    var currentRotationX = currentRotation[0]
    var currentRotationY = currentRotation[1]
    var currentRotationZ = currentRotation[2]

    //these rotations are the normal ones for spinning
    var rotationX = this.state.rotation[0]
    var rotationY = this.state.rotation[1]
    var rotationZ = this.state.rotation[2]
    
    var speed = 0.1
    var rotationSpeed = Math.PI/10
    
    var dx = 0
    var dy = 0
    var dz = 0
    var ry = 0

    if(direction == 'w'){
      dz = -1
    }
    if(direction == 's'){
      dz = 1
    }
    if(direction == 'a'){
      dx = -1
    }
    if(direction == 'd'){
      dx = 1
    }
    if(direction == 'ArrowLeft'){
      ry = -1
    }
    if(direction == 'ArrowRight'){
      ry = 1
    }
    
    console.log('App Movement Handler ', " speed: ", speed, " rotationSpeed: ", rotationSpeed, " rotationX: ", rotationX, " rotationY: ", rotationY, " rotationZ: ", rotationZ, " dx: ", dx, " dy: ", dy, " dz: ", dz, " ry: ", ry)
    //one set state should handle both forward and lateral movement, currently it does not
    this.setState({
      location:{
        x: this.state.location.x + dx*speed,
        y: this.state.location.y + dy*speed,
        z: this.state.location.z + dz*speed
      },
      rotation: [rotationX, rotationY - ry * rotationSpeed, rotationZ]
    })
  }


  render(){
    //should i be getting the last home or last homeowner
    var lastHome
    //when you begin, user is null, so this is for error handling
    if(this.state.user){
      lastHome = this.getLastHome()
    }
    var rotationY = this.state.rotation[1]
    var sceneStyle = {transform:[{translateX: this.state.location.x}, {translateY: this.state.location.y}, {translateZ: this.state.location.z}, {rotateY: rotationY}]}
    //console.log(lastHome) 
    console.log("new state in APP:", this.state)
   if(this.state.view == 'signup'){
     return(
      <Scene style={sceneStyle} onInput={this.onInput.bind(this)}><SignUp changeView={this.changeView.bind(this)}/></Scene>
     )
   }
   else if(this.state.view == 'home'){
      return(
        <Scene style={sceneStyle} onInput={this.onInput.bind(this)}><Home user={this.state.user} homeOwner={this.state.viewOwner} changeView={this.changeView.bind(this)} getHome={lastHome}/></Scene>
      )
    }
    else if(this.state.view == 'add'){
      return(
        <Scene style={sceneStyle} onInput={this.onInput.bind(this)}><AddText user={this.state.user} homeOwner={this.state.viewOwner} changeView={this.changeView.bind(this)} getHome={lastHome}/></Scene>
      )
    }
    else if(this.state.view == 'login'){
      return(
        <Scene style={sceneStyle} onInput={this.onInput.bind(this)}><Login changeView={this.changeView.bind(this)} /></Scene>
      )
    }
  }
   };