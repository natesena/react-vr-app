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
      confirmPassword: 'confirm password: '
    }
  }
  submit(){
    console.log('Tried to submit')
    if(this.state.fields.username !== 'username: ' && this.state.fields.email !== 'email: ' && this.state.fields.password !== 'password: '&&this.state.fields.confirmPassword !== 'confirm password: '){
      console.log('test passed!')
      //need to create a model
      //run create controller action on user model with {"username": this.state.fields.username,...}
      var fields = {
        "username": this.state.fields.username,
        "email": this.state.fields.email,
        "password": this.state.fields.password
      }
      //---------------------------------------------------
      clientAuth.signUp(fields).then(user => {
        this.setState({ 
          ...this.state,
          fields: { 
            username: '',
            email: '',
            password: '',
            confirmPassword: '' 
            }
        })
        if(user) {
          this.props.onSignUpSuccess(user)
          this.props.changeView('/test')
        }
      })
      //---------------------------------------------------
    }
  }

  onInputChange(field, value) {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      }
    })
  }

  onTestClick() {
    this.props.changeView('test')
  }
  
  render() {
    //console.log(this.state.fields)
    return (
      <View >

        <Pano source={asset('equirectangular.png')}/>
        
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
            <VrButton onClick={this.onTestClick.bind(this)}>
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
                  transform: [{translate: [0, -0.1, -3]}],
                }}>
                View2
              </Text>
            </VrButton>
      </View>
    );
  }
}