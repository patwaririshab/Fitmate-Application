import React from 'react';
import {Platform, StyleSheet, Text, View , TextInput , Button , TouchableOpacity , ImageBackground} from 'react-native';
import Backgroundimg from '../../icons/exercise.png'

const EachChallenge = (props) => {

  let exerciseName = "";
  if(props.Exercise === 1){
    exerciseName = "Push Ups"
  }else if(props.Exercise === 2){
    exerciseName = "Sit Ups"
  }else if(props.Exercise === 3){
    exerciseName = "Planks"
  }
  return(
    <TouchableOpacity style = {styles.container} onPress = {props.pressed}>
      <ImageBackground source={Backgroundimg} style={styles.imageBack}>
       <Text style = {styles.titleText}>{exerciseName}</Text>
       <Text style = {styles.titleText}>{props.Number}</Text>
       <Text style = {styles.titleText}>{props.Initiator}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    padding: 20 ,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageBack: {width: '100%', height: '100%' ,textAlign: "center"}
  ,
  eachItem: {
    backgroundColor: '#eee',
    width:"100%",
    height: 75,
    padding: 5,
    marginBottom: 10
  },

  viewItem:{
    margin :5,
    width:"100%",
    textAlign: 'center'
  }

});

export default EachChallenge;
