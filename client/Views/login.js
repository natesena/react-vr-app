import React from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  VrButton,
  History
} from 'react-vr';
import TextInput from '../js/vr_components/textInput.js'
import clientAuth from '../js/clientAuth.js'

export default class Login extends React.Component{
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
  usernamePasses(){
    var username = this.state.fields.username
    var usernamePassesTest = true
    //username must be alphanumeric with no spaces
    for(let i = 0; i < username.length; i++){
      if (!(username.charCodeAt(i) > 47 && username.charCodeAt(i) < 58) && // numeric (0-9)
        !(username.charCodeAt(i) > 64 && username.charCodeAt(i) < 91) && // upper alpha (A-Z)
        !(username.charCodeAt(i) > 96 && username.charCodeAt(i) < 123)) { // lower alpha (a-z)
        usernamePassesTest = false
        return usernamePassesTest
      }
    }
    return usernamePassesTest
  }
  loginFormIsFilledOut(){
    if(this.state.fields.username !== 'username: ' && this.state.fields.email !== 'email: ' && this.state.fields.password !== 'password: '&&this.state.fields.confirmPassword !== 'confirm password: '){
      return true
    }
    return false
  }
  emailPasses(){
    
  }
  submit(){
    var formIsFilled = this.loginFormIsFilledOut()
    var userNameIsAlpanumeric = this.loginFormIsFilledOut()
    var passwordsMatch = (this.state.fields.password == this.state.fields.confirmPassword)
    //console.log('Tried to submit')
    //if something was typed into every field 
   
    if(formIsFilled && userNameIsAlpanumeric && passwordsMatch){
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
          this.props.changeView(`/home/${user._id}`, user)
        }
      })
    }
    else{
      //throw error for each error
      
    }
  }
  throwError(error){
    this.setState({
      errors: [...this.state.errors, error]
    })
  }
  onInputChange(field, value) {
    //should have errors thrown here as users are signing up
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
            {this.state.errors.map((err)=>{
              return(
                <Text
                style={{
                  backgroundColor: '#777879',
                  fontSize: 0.2,
                  fontWeight: '400',
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  transform: [{translate: [0, -0.2, -3]}],
                }}>
                {err}
                </Text>
              )
            })}
            </View>
            <TextInput name="username" onChange={this.onInputChange.bind(this)} value={this.state.fields.username} placeHolder={'username: '} focused={false} type={'text'} ></TextInput>
            <TextInput name="email" onChange={this.onInputChange.bind(this)} value={this.state.fields.email} placeHolder={'email: '} focused={false} type={'email'} ></TextInput>
            <TextInput name="password" onChange={this.onInputChange.bind(this)} value={this.state.fields.password} placeHolder={'password: '} focused={false} type={'password'} ></TextInput>
            <TextInput name="confirmPassword" onChange={this.onInputChange.bind(this)} value={this.state.fields.confirmPassword} placeHolder={'confirm password: '} focused={false} type={'password'} ></TextInput>
            <VrButton onClick={this.submit.bind(this)}>
              <Text
                style={{
                  backgroundColor: '#777879',
                  fontSize: 0.2,
                  fontWeight: '400',
                  layoutOrigin: [0.5, 0.5],
                  paddingLeft: 0.2,
                  paddingRight: 0.2,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  transform: [{translate: [0, 0, -3]}],
                }}>
                Submit
              </Text>
            </VrButton>
      </View>
    );
  }
}