import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';
import Backgroundimg from '../../icons/exercise.png'

const EachChallenge = (props) => {

  let exerciseName = "";
  if (props.Exercise === 1) {
    exerciseName = "Push Ups"
  } else if (props.Exercise === 2) {
    exerciseName = "Sit Ups"
  } else if (props.Exercise === 3) {
    exerciseName = "Squats"
  }
  console.log(props.TimeStamp)
  const verified = (props.videoUpdated) ? "Verified" : "Unverified";
  const verifiedCol = (props.videoUpdated) ? "green" : "red";
  return (
    <TouchableOpacity style={styles.container} onPress={props.pressed}>
      <ImageBackground source={props.img} style={styles.imageBack}>
        <View style={styles.textBG}>
          <Text style={styles.titleText}>{exerciseName}</Text>
          <Text style={styles.titleText}>{props.Number}</Text>
          <Text style={styles.titleText}>{props.InitiatorName}</Text>
          <Text style={styles.titleText}>{"12/12/2019"}</Text>
          <Text style={{ ...styles.titleTextVerified, color: verifiedCol }}>{verified}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

}


const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textBG: {
    backgroundColor: '#11111130',
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 'auto',
    color: "white",
    backgroundColor: '#11111130',
    flex: 1,
    width: "100%"
  },
  titleTextVerified: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 'auto',
    backgroundColor: '#11111130',
    flex: 1,
    width: "100%"
  },
  imageBack: { width: '100%', height: '100%', textAlign: "center", textAlignVertical: "center" }

});

export default EachChallenge;
