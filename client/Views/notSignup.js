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
import FocusButton from '../js/vr_components/focusButton.js'
import SimpleText from '../js/vr_components/SimpleText.js'

export default class Login extends React.Component{
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
  submit(){
      console.log('tried to submit login form')
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
                    {err}
                    </Text>
                  )
                })}
              </View>
              <View>
                <TextInput name="username" onChange={this.onInputChange.bind(this)} value={this.state.fields.username} placeHolder={'username: '} focused={false} type={'text'} ></TextInput>
                
                <TextInput name="password" onChange={this.onInputChange.bind(this)} value={this.state.fields.password} placeHolder={'password: '} focused={false} type={'password'} ></TextInput>
               
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
            </View>
      </View>
    );
  }
}