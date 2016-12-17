import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Text, View, Switch, Navigator, TouchableHighlight, ScrollView } from 'react-native';
import songsContainer from '../containers/songsContainer';
import SongOverview from './SongOverview';

class SongList extends Component {
  constructor (props) {
   super(props);
   }

  render() {
    const { songs } = this.props;
    console.log(songs.tracks.items);
    return (
      <ScrollView
        style={styles.scrollView}>
        {songs.tracks.items.map(function(song, i) {
          return <SongOverview key={i} song={song} />}
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  messageBox: {
    flex: 1,
    marginTop: 100,
  },
  avatar: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    top: 80,
  },
  form: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    top: 85,
    padding: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  ebook: {
    top: 95,
    left: 15,
    marginBottom: 10,
  },
  orderByNewest: {
    top: 55,
    left: 150,
    marginBottom: 10,
  },
  eBookLabel: {
    top: 50,
    left: 15,
    marginBottom: 10,
    fontSize: 12,
  },
  newestLabel: {
    top: 25,
    left: 150,
    marginBottom: 10,
    fontSize: 12,
  },
  callApiButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderColor: '#1E77E2',
    borderWidth: 2,
    margin: 10,
    shadowColor: '#1b71E2',
    shadowRadius: 10,
    borderRadius: 5,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiButtonLabel: {
    fontSize: 24,
  },
  scrollView: {
    top: 20,
    backgroundColor: '#1E77E2',
    height: 400
  },
});


export default songsContainer(SongList);
