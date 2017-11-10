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


export default class AddText extends React.Component{
  state = {
    fields: {
      text: 'Text: ',
      translateX: 'X Coordinate: ',
      translateY: 'Y Coordinate: ',
      translateZ: 'Z Coordinate: '
    }
  }
  addTextSubmit(){
   console.log('Addtext: tried to submit')
   console.log(this.state.fields)
  }

  onInputChange(field, value) {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      }
    }, console.log(this.state.fields))
  }
  
  render() {
    //console.log(this.state.fields)
    return (
      <View >

        <Pano source={asset('equirectangular.png')}/>
        
            <TextInput name="text" onChange={this.onInputChange.bind(this)} value={this.state.fields.text} placeHolder={'Text: '} focused={false} type={'text'} ></TextInput>
            <TextInput name="translateX" onChange={this.onInputChange.bind(this)} value={this.state.fields.translateX} placeHolder={'X Coordinate: '} focused={false} type={'text'} ></TextInput>
            <TextInput name="translateY" onChange={this.onInputChange.bind(this)} value={this.state.fields.translateY} placeHolder={'Y Coordinate: '} focused={false} type={'text'} ></TextInput>
            <TextInput name="translateZ" onChange={this.onInputChange.bind(this)} value={this.state.fields.translateZ} placeHolder={'Z Coordinate: '} focused={false} type={'text'} ></TextInput>
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