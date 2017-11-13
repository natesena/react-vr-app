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
      xCoordinate: 'X Coordinate: ',
      yCoordinate: 'Y Coordinate: ',
      zCoordinate: 'Z Coordinate: '
    }
  }
  addTextSubmit(){
   //console.log('Addtext: tried to submit')
   //console.log('addtext submit fields',this.state.fields)
   if(typeof(this.state.fields.translateX) !== 'number' || typeof(this.state.fields.translateY) !== 'number'|| typeof(this.state.fields.translateZ) !== 'number') {
     console.log('One or more coordinate inputs are not of type number')
   }
  
   //console.log('addTextSubmits input tests passed')
   
   //send post request with vrText info
   //need current id of home we are on from state
   var fields = {
     ...this.state.fields,
     homeID: this.state.lasthome,
     posterID: this.props.user._id,
   }
   console.log('ADDTEXT posting new text with this data', fields)
   axios({method: 'POST', url: '/api/vrTexts', data: fields})
      .then(res =>{
        //console.log('Fields from AddText Post Request', fields)
        //console.log('ADD Text Post Response', res)
        //redirect to home where we posted it
        this.props.changeView(`/home/${this.state.lasthome}`, this.props.user)
      })
  
  }

  onInputChange(field, value) {
    //console.log('add text input change field:', field)
    //console.log('addtext typeof field:',typeof(field))
    const valIsNum = !isNaN(parseInt(value))
    if(valIsNum){
      console.log('ADD TEXT field text is a number: ', value)
      value = parseInt(value)
      console.log('ADDText parseint to: ', value)
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
    console.log(this.state.fields)
    return (
      <View >

        {/* <Pano source={asset('equirectangular.png')}/> */}
        <Pano source={{uri: 'https://farm8.static.flickr.com/7536/27336477654_8e7c705cf7_b.jpg'}}/>
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
            <TextInput name="xCoordinate" onChange={this.onInputChange.bind(this)} value={this.state.fields.xCoordinate} placeHolder={'X Coordinate: '} focused={false} type={'number'} ></TextInput>
            <TextInput name="yCoordinate" onChange={this.onInputChange.bind(this)} value={this.state.fields.yCoordinate} placeHolder={'Y Coordinate: '} focused={false} type={'number'} ></TextInput>
            <TextInput name="zCoordinate" onChange={this.onInputChange.bind(this)} value={this.state.fields.zCoordinate} placeHolder={'Z Coordinate: '} focused={false} type={'number'} ></TextInput>
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