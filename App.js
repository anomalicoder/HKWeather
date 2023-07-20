import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = 'efdd73994f5d0f53aec0dd3caaa1c3e1';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function App() {
  const [city, setCity] = useState("Loading");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const ask = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.list);
    console.log(days[0]);
  };
  useEffect(()=> {
    ask();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView 
        horizontal
        indicatorStyle={{color:'white'}}
        pagingEnabled
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? 
        (<View style={styles.day}>
          <ActivityIndicator color="white" size="large" style={{marginTop:300}} />
        </View>) :
          (days.map((day, index) => <View key={index} style={styles.day}>
            <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}^</Text>
            <Text style={styles.description}>{day.weather[0].main}</Text>
            <Text style={styles.tinyDescription}>{day.weather[0].description}</Text>
          </View>))
        }
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
    fontSize:150,
    fontWeight:500,
  },
  description:{
    color:'white',
    marginTop:-30,
    fontSize:40,
  },
  tinyDescription:{
    color:'white',
    fontSize:20,
    marginTop:30,
  }
})