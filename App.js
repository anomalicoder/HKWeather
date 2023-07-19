import React from 'react';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex:1, backgroundColor:"teal" }}>
      <View style={{flex:1, backgroundColor:"tomato"}}></View>
      <View style={{flex:7, backgroundColor:"teal"}}></View>
      <View style={{flex:2, backgroundColor:"orange", borderRadius:50,}}></View>
    </View>
  );
}
