import React from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  VrButton,
  History
} from 'react-vr';
//import axios from 'axios'//---------------------------
import TextInput from '../js/vr_components/textInput.js'
import axios from 'axios'

export default class AddText extends React.Component{
  state = {
    lasthome: this.props.getHome,
    fields: {
      text: 'Text: ',
      translateX: 'X Coordinate: ',
      translateY: 'Y Coordinate: ',
      translateZ: 'Z Coordinate: '
    }
  }
  addTextSubmit(){
   console.log('Addtext: tried to submit')
   console.log('addtext submit fields',this.state.fields)
   if(typeof(this.state.fields.translateX) !== 'number' || typeof(this.state.fields.translateY) !== 'number'|| typeof(this.state.fields.translateZ) !== 'number') {
     console.log('One or more coordinate inputs are not of type number')
   }
   else{
     console.log('addTextSubmits input tests passed')
   }
   //send post request with vrText info
   //need current id of home we are on from state
   var fields = {
     ...this.state.fields,
     homeID: this.state.lasthome,
     posterID: this.props.user._id,
   }
   axios({method: 'POST', url: '/api/vrTexts', data: fields})
      .then(res =>{
        console.log('Fields from AddText Post Request', fields)
        console.log('ADD Text Post Response', res)
        //this is the wrong route currently
        //should be the id of the last home visited
        this.props.changeView(`/home/${this.state.lasthome}`, this.props.user)
      })
   //redirect to home where we posted it
  }

  onInputChange(field, value) {
    //console.log('field', field)
    //console.log(typeof field)
    const valIsNum = !isNaN(parseInt(value))
    if(valIsNum){
      value = parseInt(value)
    }
    //need to make sure inputs are parsed as numbers if they are numbers
    if(field === 'text' || valIsNum && field !== 'text'){
      this.setState({
        fields: {
          ...this.state.fields,
          [field]: value
        }
      })
    }
    else{
      console.log('TextInput expected a Number and a String was Sent Instead')
    }
  }
  
  render() {
    //console.log(this.state.fields)
    return (
      <View >

        <Pano source={asset('equirectangular.png')}/>
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
                VR Text Submission
            </Text>
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
                It is best to use numbers less than 20
            </Text>
            <TextInput name="text" onChange={this.onInputChange.bind(this)} value={this.state.fields.text} placeHolder={'Text: '} focused={false} type={'text'} ></TextInput>
            <TextInput name="translateX" onChange={this.onInputChange.bind(this)} value={this.state.fields.translateX} placeHolder={'X Coordinate: '} focused={false} type={'number'} ></TextInput>
            <TextInput name="translateY" onChange={this.onInputChange.bind(this)} value={this.state.fields.translateY} placeHolder={'Y Coordinate: '} focused={false} type={'number'} ></TextInput>
            <TextInput name="translateZ" onChange={this.onInputChange.bind(this)} value={this.state.fields.translateZ} placeHolder={'Z Coordinate: '} focused={false} type={'number'} ></TextInput>
            <VrButton onClick={this.addTextSubmit.bind(this)}>
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