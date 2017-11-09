import React from 'react'
import {
    AppRegistry,
    Text,
    View,
    VrButton,
  } from 'react-vr';

  export default class FocusButton extends React.Component {
    //text is what is shown as text
    constructor(props){
        super(props)
        this.state ={
            color: '#FF0000',
            focused: props.focused,
        }
    }

    focus(){
      this.setState({
        color: this.state.focused? '#FF0000': '#00FF00',
        focused: !this.state.focused,
      }, ()=>{
        //console.log('placeholder clicked', this.state.focused)
      })
    }
    buttonRedirect(){
      console.log('focus button ' + this.props.value + ' triggered')
      this.props.onFocusButtonClick(this.props.viewLink)
    }
    
    
    render() {
      return (
        <View onEnter={this.focus.bind(this)} onExit={this.focus.bind(this)} >
          <VrButton onClick={this.buttonRedirect.bind(this)}>
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
          </VrButton>
        </View>
      );
    }
  };
  
  AppRegistry.registerComponent('focusButton', () => focusButton);