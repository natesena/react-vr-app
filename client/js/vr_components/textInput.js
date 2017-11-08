import React from 'react'
import {
    AppRegistry,
    Text,
    View,
    VrButton,
  } from 'react-vr';

  export default class TextInput extends React.Component {
    //text is what is shown as text
    constructor(props){
        super(props)
        this.state ={
            text: props.placeHolder,
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
    fieldClick(){
      console.log('clicked textInput')
    }
    keyPressed(evt){
      //keycode of pressedKey
      var theKeyCode = evt.nativeEvent.inputEvent.keyCode
        //console.log('keycode', theKeyCode)

      //actual key that was pressed. Could be non-alphanumeric
      var key = evt.nativeEvent.inputEvent.key
      
      //if key is alphanumeric or @ or .
      if((theKeyCode >= 48 && theKeyCode <= 57)||(theKeyCode >= 65 && theKeyCode <= 90||theKeyCode == 190)){  
        this.setState({
          text: this.state.text == this.props.placeHolder? key: this.state.text + key,
        }, ()=>{
          this.props.onChange(this.props.name, this.state.text)
          //console.log(this.state.text)
        })
      }

      //if delete key was pressed
      if(theKeyCode == 8){
        var currentText = this.state.text.split('')
        //delete letter from array
        currentText.pop()
        var joinedLess = currentText.join('')
        //if currenttext is empty, show placeholder
        this.setState({
          //if value would be empty or text == placeholder make it placeholder, otherwise make it popped off
          text: !joinedLess || this.state.text == this.props.placeHolder? this.props.placeHolder : joinedLess

        }, ()=>{
          //console.log('delete-end-state', this.state)
          this.props.onChange(this.props.name, this.state.text)
        })
      }
      
    }
    
    render() {
      return (
        <View onInput={(evt)=>{
          //only register a typing event on keyup as to remove duplicates
          if(evt.nativeEvent.inputEvent.type == 'KeyboardInputEvent' && evt.nativeEvent.inputEvent.eventType == "keyup"){
            //console.log(evt.nativeEvent)
            this.keyPressed(evt)
          }
        }}>
          <VrButton onEnter={this.focus.bind(this)} onExit={this.focus.bind(this)} onClick={this.fieldClick.bind(this)}>
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
  
  AppRegistry.registerComponent('textInput', () => textInput);