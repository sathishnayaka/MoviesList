import axios from 'axios';
import React, { useState , useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
type formTypes = {
  navigation : any;
  route : any;
}

const MovieDetails = ({navigation,route}:formTypes) => {

  const { data  } = route.params;
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Image
        data-testid="weather-icon"
        style={styles.tinyLogo}
        source={{
          uri: data.Poster,
        }}
      />
      <Text style={{ fontSize:20}}>Title : {data.Title}</Text>
      <Text style={{ fontSize:20}}>Release date : {data.Released}</Text>
      <Text style={{ fontSize:20}}>{data.Plot}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    height:"100%",
    marginHorizontal:20,
  },
  tinyLogo :{
    width:300, 
    height:350,
    borderRadius:16,
    resizeMode:"cover"
  },
  image :{
    flex:1,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  capitalText : {
    fontSize:24,
    fontWeight:'800',
    alignSelf:'center'
  },
  temp:{
    fontSize:36,
    lineHeight:50,
    fontWeight:'800',
    color : 'orange'
  }

});


export default MovieDetails;
