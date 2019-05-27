import React from 'react';
import {StyleSheet,Alert, Button , Text, TouchableOpacity, ImageBackground} from 'react-native';
import Backgroundimg from '../../icons/exercise.png'


const ExerciseItem = (props) => {
  return(
   <TouchableOpacity 
        style = {styles.container} 
        onPress = {props.pressed}
      >
      <ImageBackground source={Backgroundimg} style={styles.imgback}>
        <Text style = {styles.titleText}>{props.name}</Text>
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
  imgback: {width: '100%', height: '100%' ,textAlign: "center"}
  ,
  eachitem: {
    backgroundColor: '#eee',
    width:"100%",
    height: 75,
    padding: 5,
    marginBottom: 10
  },

  viewitem:{
    margin :5,
    width:"100%",
    textAlign: 'center'
  }

});

export default ExerciseItem;