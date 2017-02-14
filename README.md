# Spotify Song Anayzer Application

A React-native song analyzer using the Spotfiy API

## Intro

This native mobile (Android, IOS) application allows the user to return a list of songs that they've searched for, view various stats for individual songs (danceability, tempo, etc) and listen to a 30 second preview of each song.

## Technologies Used

React-native, Auth-0, Redux

## How the Application works

Users are presented a log-in screen (courtesy of Auth-0) and proceed to log in using their social media account of choice. A search screen is displayed after log in where users are able to search for songs by name and artist. Once the search is completed, a list of all the songs matching the search criteria will be displayed, and users can click on the individual song that they'd like to analyze - at which point they will be brought to a screen showing each attribute of the song, along with a button to preview and stop playback.

## Images

## Build Setup

# install dependencies
npm install

# serve with device simulator (Xcode)
react-native run-ios or react-native run-android
