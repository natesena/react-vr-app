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

export default class Test extends React.Component{
    
  render() {
    //console.log(this.state.fields)
    return (
      <View >

        <Pano source={asset('chess-world.jpg')}/>

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
            
      </View>
    );
  }
}