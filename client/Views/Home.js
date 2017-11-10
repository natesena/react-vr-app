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
import TextInput from '../js/vr_components/textInput.js'

import axios from 'axios'

var data = {

}
//update data to be the  id of the last home visited
axios({method: 'GET', url: '/api/vrTexts', data: data})
.then(res =>{
  console.log('Home Get Requests Response', res)
})


export default class Home extends React.Component{
  state={
    fields:{
      searchQuery: 'search by username: '
    }
  }
  redirectFromHomeView(link){
  console.log('tried to redirect from home view')
  console.log('Home Button redirect location link:', link||'no link provided')
  //want to provide link of this particular home which should be the id of the home owner
  this.props.changeView(link + '/'+ this.props.user._id, this.props.user)
  }
  
  onInputChange(field, value) {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value
      }
    })
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
              <TextInput name="searchQuery" onChange={this.onInputChange.bind(this)} value={this.state.fields.searchQuery} placeHolder={'search by username: '} focused={false} type={'text'} ></TextInput>
              <FocusButton value={'Edit/Delete Your Info'} onFocusButtonClick={this.redirectFromHomeView.bind(this)} viewLink={'/edit'}></FocusButton>
              <FocusButton value={'Add Something'} onFocusButtonClick={this.redirectFromHomeView.bind(this)} viewLink={'/add'}></FocusButton>
            </View>
      </View>
    );
  }
}