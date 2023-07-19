import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions  } from 'react-native';

const {height, width:SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView 
        horizontal
        indicatorStyle={{color:'white'}}
        pagingEnabled
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>15^</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>15^</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>15^</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>15^</Text>
          <Text style={styles.description}>Rainy</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:"orange",
  },
  city:{
    flex:0.5,
    backgroundColor:"teal",
    justifyContent : 'flex-end',
    alignItems:"center",
  },
  cityName:{
    color:"white",
    fontSize:50,
    fontWeight:"300",
  },
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    backgroundColor:"teal",
    alignItems:"center",
  },
  temp:{
    color:'white',
    marginTop:150,
    fontSize:180,
  },
  description:{
    color:'white',
    marginTop:-30,
    fontSize:50,
  },
})