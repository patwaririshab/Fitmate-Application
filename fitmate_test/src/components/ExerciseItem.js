import React from 'react';
import { StyleSheet, Alert, Button, Text, TouchableOpacity, ImageBackground } from 'react-native';



const ExerciseItem = (props) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.pressed}
    >
      <ImageBackground source={props.img} style={styles.imgback}>
        <Text style={styles.titleText}>{props.ExerciseName}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}



// const source_selector = (props) => {
//   if (props.name === 'Pushup'
// }


const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'black',
    width: "100%",
    height: 150,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 'auto',
    fontSize: 40,
    color: "white",
    backgroundColor: '#21212130',
    fontWeight: 'bold',
    height: "100%",
    width: "100%"
  },
  imgback: { width: '100%', borderRadius: 10, height: '100%', textAlign: "center" }
  ,

});

export default ExerciseItem;