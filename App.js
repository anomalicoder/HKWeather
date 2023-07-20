import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import {Fontisto} from "@expo/vector-icons";

const API_KEY = 'efdd73994f5d0f53aec0dd3caaa1c3e1';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

const icons = {
  Clouds:"cloudy",
  Clear:"day-sunny",
  Atmosphere:"fog",
  Snow:"snows",
  Rain:"rains",
  Drizzle:"rain",
  Thunderstorm:"lightnings",
  
};

export default function App() {
  const [city, setCity] = useState("Loading");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const filterDays = (list) => {
    list.filter((day)=> {
      if(day.dt_txt.includes("12:00:00")){
        return day;
      }
    })
  }
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
    setDays(json.list.filter((weather)=>{
      if(weather.dt_txt.includes("12:00:00")){
        return weather;
      }
    }))
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
          <ActivityIndicator color="white" size="large" style={{marginTop:300, alignContent:"center"}} />
        </View>) :
          (days.map((day, index) => <View key={index} style={styles.day}>
            <View style={{
              flexDirection:"row", 
              alignItems:"flex-end",
              justifyContent:"space-between",
              width: "100%",
              }}
            >
              <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}^</Text>
              <Fontisto
                name={icons[day.weather[0].main]} 
                size={75} 
                color="white"
              />
            </View>

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
    backgroundColor:"teal",
  },
  city:{
    flex:1,
    backgroundColor:"teal",
    justifyContent : 'flex-end',
    alignItems:"center",
  },
  cityName:{
    color:"white",
    fontSize:50,
    fontWeight:"300",
    fontFamily:"Arial",
  },
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    backgroundColor:"teal",
    alignItems:"flex-start",
    paddingHorizontal:20,
    paddingVertical:150,
    alignItems:"flex-start",
  },
  temp:{
    color:'white',
    fontSize:100,
    fontWeight:500,
  },
  description:{
    color:'white',
    marginTop:-15,
    fontSize:40,
    marginLeft:5,
  },
  tinyDescription:{
    color:'white',
    fontSize:20,
    marginLeft:10,
  },
})