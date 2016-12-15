import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

export default class Search extends Component{
  constructor (props) {
   super(props)
   }

 render() {
    return (
      <View>
        <Text>Search</Text>
        <TextInput
        editable = {true}></TextInput>
      </View>
    )
  }
}
