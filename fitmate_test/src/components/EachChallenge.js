import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';

const EachChallenge = (props) => {

  const constructStringDate = () => {
    const date = new Date(props.TimeStamp.seconds * 1000);
    return `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }

  const strDate = constructStringDate();

  console.log("STRING DATE", strDate)

  let exerciseName = "";
  if (props.Exercise === 1) {
    exerciseName = "Push Ups"
  } else if (props.Exercise === 2) {
    exerciseName = "Sit Ups"
  } else if (props.Exercise === 3) {
    exerciseName = "Squats"
  }
  console.log("TimeStamp", props.TimeStamp)
  const verified = (props.videoUpdated) ? "Verified" : "Unverified";
  const verifiedCol = (props.videoUpdated) ? "green" : "red";
  return (
    <TouchableOpacity style={styles.container} onPress={props.pressed}>
      <ImageBackground source={props.img} style={styles.imageBack}>
        <View style={styles.textBG}>
          <Text style={styles.titleText}>{`${props.Number} ${exerciseName}`}</Text>
          <Text style={styles.titleTextName}>{props.InitiatorName}</Text>
          <Text style={styles.titleTextDate}>{strDate}</Text>
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
    // backgroundColor: '#00000070',
     backgroundColor: '#F5FCFF70',
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
  titleTextName: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 'auto',
    paddingTop: 10,
    color: "white",
    backgroundColor: '#11111130',
    flex: 1,
    width: "100%"
  }
  ,
  titleTextDate: {
    fontSize: 14,
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
  imageBack: { width: '100%', height: '100%', textAlign: "center", textAlignVertical: "center",}

});

export default EachChallenge;
