import React from 'react'
import {
    AppRegistry,
    Text,
    View,
    VrButton,
  } from 'react-vr';

  export default class SimpleText extends React.Component {
      constructor(props){
          super(props)
      }
      render(){
          return(
            <View>
                <Text 
              style={{
                margin: 0.05,
                backgroundColor: `${this.state.color}`,
                fontSize: 0.2,
                fontWeight: "400",
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -3]}],
              }}>
              {this.props.value}
            </Text>
            </View>
          )
      }
  }

  AppRegistry.registerComponent('SimpleText', () => SimpleText);