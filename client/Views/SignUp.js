import React from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  VrButton,
  History
} from 'react-vr';
//my own components
import TextInput from '../js/vr_components/textInput.js'
import SimpleText from '../js/vr_components/SimpleText.js'

import clientAuth from '../js/clientAuth.js'

export default class SignUp extends React.Component{
    state = {
    fields: {
      username: 'username: ',
      email: 'email: ',
      password: 'password: ',
      confirmPassword: 'confirm password: ',
      passwordStars: 'password: ',
      confirmPasswordStars: 'confirm password: '
    },
    errors: []
  }
  //usernames should pass some simple checks
  usernamePasses(){
    var username = this.state.fields.username
    var usernamePassesTest = true
    //username must be alphanumeric with no spaces
    for(let i = 0; i < username.length; i++){
      //console.log('username.charCodeAt(i): ', username.charCodeAt(i))
      if (!(username.charCodeAt(i) > 47 && username.charCodeAt(i) < 58) && // numeric (0-9)
        !(username.charCodeAt(i) > 64 && username.charCodeAt(i) < 91) && // upper alpha (A-Z)
        !(username.charCodeAt(i) > 96 && username.charCodeAt(i) < 123)) { // lower alpha (a-z)
        usernamePassesTest = false
        console.log('login username check contains non alphanumeric')
      }
    }
    return usernamePassesTest
  }
  //make sure that the login form is not blank
  loginFormIsFilledOut(){
    if(this.state.fields.username !== 'username: ' && this.state.fields.email !== 'email: ' && this.state.fields.password !== 'password: '&&this.state.fields.confirmPassword !== 'confirm password: '){
      return true
    }
    return false
  }
  //
  emailPasses(){
    
  }

  submit(){
      //console.log('Tried to submit')
    var formIsFilled = this.loginFormIsFilledOut()
    var userNameIsAlphanumeric = this.usernamePasses()
    var passwordsMatch = (this.state.fields.password == this.state.fields.confirmPassword)
   
    if(formIsFilled && userNameIsAlphanumeric && passwordsMatch){
      var fields = {
        "username": this.state.fields.username,
        "email": this.state.fields.email,
        "password": this.state.fields.password
      }
      clientAuth.signUp(fields).then(user => {
        console.log('user', user)
        if(user) {
          //this.props.onSignUpSuccess(user)
          console.log('changing view within login.js submit')
          //the user we would typically pass is the viewOwner
          this.props.changeView(`/home/${user._id}`, user)
        }
      })
    }
    else{
      //throw error for each error
      var newErrors = []
      formIsFilled? null: newErrors.push('fill out the whole form')
      userNameIsAlphanumeric? null: newErrors.push('username is not alphanumeric')
      passwordsMatch? null: newErrors.push('passwords do not match')
      if(newErrors){
        this.throwError(newErrors)
      }
      
    }
  }
  //throwError shows errors above the singup form so the user knows what mistakes they made
  throwError(newerrors){
    this.setState({
      errors: [...newerrors]
    })
  }

  onInputChange(field, value) {
    //console.log('login on inputchange field and value: ', field, value)
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      }
    }, ()=>{
      if(field == 'username'){
        this.usernamePasses()? this.throwError([]): this.throwError(['username is not alphanumeric'])
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
                <TextInput name="email" onChange={this.onInputChange.bind(this)} value={this.state.fields.email} placeHolder={'email: '} focused={false} type={'email'} ></TextInput>
                <TextInput name="password" onChange={this.onInputChange.bind(this)} value={this.state.fields.password} placeHolder={'password: '} focused={false} type={'password'} ></TextInput>
                <TextInput name="confirmPassword" onChange={this.onInputChange.bind(this)} value={this.state.fields.confirmPassword} placeHolder={'confirm password: '} focused={false} type={'password'} ></TextInput>
                <VrButton onClick={this.submit.bind(this)}>
                <SimpleText value={"Submit"}></SimpleText>
                </VrButton>
              </View>
            </View>
      </View>
    );
  }
}