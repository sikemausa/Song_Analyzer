import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import songsContainer from '../containers/songsContainer';
import userContainer from '../containers/userContainer';

class Search extends Component{
  constructor (props) {
   super(props)
   }

   render() {
     console.log(this.props);
     const { user } = this.props;
      return (
        <View>
          <Text>Search</Text>
          <TextInput
          editable = {true}>
          </TextInput>
          <TouchableHighlight onPress={this.onApiCall}>
            <Text>Get Books!</Text>
          </TouchableHighlight>
          <Text>{user.name}</Text>
        </View>
      )
    }

  onApiCall() {
    const { getSongs } = this.props;
    getSongs([{
      yo: 'YOYOY'
    }])
  }

}

export default songsContainer(userContainer(Search))
