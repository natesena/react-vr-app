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

export default class Home extends React.Component{
  state={
    lasthome: this.props.getHome,
    fields:{
      searchQuery: 'search by username: '
    },
    vrTexts: []
  }
  componentDidMount(){
    this.grabVRTexts()
  }
  grabVRTexts(){
    //texts are found by their homeID, which should be the lasthome at the time of post
    console.log('Home, tried to fetch homeOwnersVRtexts')
    axios({method: 'GET', url: `/api/vrTexts/${this.props.homeOwner._id}`})
    .then(res =>{
      console.log('Home Get Requests Response', res)
      //change state, then re render with new ones shown
      this.setState({
        vrTexts: res.data
      }, console.log('Changed Home State to include requested VRTexts', res.data))
    })
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

  usernameSubmit(){
    console.log('tried to username submit')
    //post arequest looking for if there is someone in the database witht that username
    //could throw error if we know the query cant be a username
    axios({method: 'GET', url: `/api/users/${this.state.fields.searchQuery}`})
    .then(res=>{
      console.log('username submission response: ',res)
      //want to navigate to /home/${res.data._id}
      console.log('username submit link', '/home/'+res.data[0]._id)
      this.props.changeView('/home/'+res.data[0]._id, res.data[0])
      this.grabVRTexts()
    })
  }
    
  render() {
    console.log('New Home State: ', this.state)
    return (
      <View >
        <View>
        {this.state.vrTexts.map(vrText => {
          return(
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
              transform: [{translate: [vrText.xCoordinate || 0, vrText.yCoordinate || -0.1, vrText.xCoordinate || -3]}],
            }}>
            {vrText.text}
          </Text>
          )
        })}
        </View>
        {/* <Pano source={asset('chess-world.jpg')}/> */}
          <Pano source={{uri:'https://c1.staticflickr.com/4/3161/5864327856_e6c797d614_b.jpg'}}/>
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
                  transform: [{translate: [0, 0, -3]}],
                }}>
                {this.props.user == this.props.homeOwner? `Welcome home ${this.props.user.username}`: `Welcome to ${this.props.homeOwner.username}'s home`}
              </Text>
              </View>
              <View>
              <TextInput name="searchQuery" onChange={this.onInputChange.bind(this)} value={this.state.fields.searchQuery} placeHolder={'search by username: '} focused={false} type={'text'} ></TextInput>
              <VrButton onClick={this.usernameSubmit.bind(this)}>
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
              <FocusButton value={'Edit/Delete Your Info'} onFocusButtonClick={this.redirectFromHomeView.bind(this)} viewLink={'/edit'}></FocusButton>
              <FocusButton value={'Add Something'} onFocusButtonClick={this.redirectFromHomeView.bind(this)} viewLink={'/add'}></FocusButton>
              </View>
      </View>
    );
  }
}