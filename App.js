import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AsyncStorageHelper from './helpers/asyncStorageHelper';
export default class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        count: 1,
        multiplyBy: 0,
        containerStyle: StyleSheet.create({
          container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }
        }),
        styles: StyleSheet.create({
          welcome: {
            fontSize: 120,
            textAlign: 'center',
            color: "white",
            margin: 10,
          },
          instructions: {
            fontSize: 40,
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
          },
        })
      };
  }
  componentWillMount(){
    this.getLastSave();
  }
  componentDidMount(){
    this.counter = setInterval(x=>{
      this.setState(currentState => ({ count: currentState.count + 1 }));
      this.save();
    },1000);
  }
  componentWillUnmount(){
    clearInterval(this.counter);
  }

  save = () => {
     AsyncStorageHelper.set("count",this.state.count.toString());
   }
  getLastSave = () => {
    AsyncStorageHelper.get("count").then(response =>{
      this.setState({
        count: parseInt(response)
      });
    });
  }
  render() {
    return (
      <View style={this.state.containerStyle.container}>
        <Text style={this.state.styles.welcome}>{this.state.count}</Text>
        <Text style={this.state.styles.instructions}>POINTS</Text>
      </View>
    );
  }
}
