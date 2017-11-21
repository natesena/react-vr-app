import React from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  VrButton,
  History
} from 'react-vr';
import clientAuth from '../js/clientAuth.js'

import TextInput from '../js/vr_components/textInput.js'
import FocusButton from '../js/vr_components/focusButton.js'
import SimpleText from '../js/vr_components/SimpleText.js'

export default class NotSignup extends React.Component{
    state = {
    fields: {
      username: 'username: ',
      password: 'password: ',
      passwordStars: 'password: ',
      confirmPasswordStars: 'confirm password: '
    },
    errors: []
  }
  
  loginFormIsFilledOut(){
    if(this.state.fields.username !== 'username: ' && this.state.fields.password !== 'password: '){
      return true
    }
    return false
  }
  emailPasses(){
    
  }
  //submit should allow a user to login to their account with a JWT Token
  submit(){
    var fields = {
      "username": this.state.fields.username,
      "password": this.state.fields.password
    }
      console.log('tried to submit login form')
      clientAuth.logIn(fields).then(user =>{
        if(user){
          //console.log('we got a user in notsignup submit: ', user)
          this.props.changeView(`/home/${user._id}`, user)
        }
        else{
          console.log('NotSignup Improper credentials')
        }
      })
  }

  signUp(){
    this.props.changeView("/login", null)
  }

  onInputChange(field, value) {
    //throw error if value is non alphanumeric
    //console.log('login on inputchange field and value: ', field, value)
   
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      }
    })
  }
  
  render() {
    //console.log(this.state.fields)
    return (
      <View >

        {/* <Pano source={asset('equirectangular.png')}/> */}
        <Pano source={{uri: 'https://farm8.static.flickr.com/7536/27336477654_8e7c705cf7_b.jpg'}}/>
            <View>
              <View style={{
                
                }}>
                {this.state.errors.map((err)=>{
                  return(
                    <SimpleText value={err}></SimpleText>
                  )
                })}
              </View>
              <View>
                <TextInput name="username" onChange={this.onInputChange.bind(this)} value={this.state.fields.username} placeHolder={'username: '} focused={false} type={'text'} ></TextInput>
                
                <TextInput name="password" onChange={this.onInputChange.bind(this)} value={this.state.fields.password} placeHolder={'password: '} focused={false} type={'password'} ></TextInput>
               
                <VrButton onClick={this.submit.bind(this)}>
                <SimpleText value={"Submit"}></SimpleText>
               
                </VrButton>
                <VrButton onClick={this.signUp.bind(this)}>
                <SimpleText value={"Sign Up"}></SimpleText>
               
                </VrButton>
              </View>
            </View>
      </View>
    );
  }
}