import React from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  VrButton,
  History
} from 'react-vr';
import FocusButton from '../js/vr_components/focusButton.js'

export default class Home extends React.Component{
  state={
    
  }
  redirectFromHomeView(link){
  console.log('tried to redirect from home view')
  console.log('Home Button redirect location link:', link||'no link provided')
  this.props.changeView(link + '/'+ this.props.user._id, this.props.user)
  }
  
    
  render() {
    return (
      <View >

        <Pano source={asset('chess-world.jpg')}/>
            <View>
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
                Welcome Home {this.props.user.username? this.props.user.username : 'no username'}
              </Text>
              <FocusButton value={'Edit/Delete Your Info'} onFocusButtonClick={this.redirectFromHomeView.bind(this)} viewLink={'/edit'}></FocusButton>
              <FocusButton value={'Add Something'} onFocusButtonClick={this.redirectFromHomeView.bind(this)} viewLink={'/add'}></FocusButton>
            </View>
      </View>
    );
  }
}