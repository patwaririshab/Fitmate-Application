import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native'
import { Item, Picker, Button } from 'native-base';
import Toast from 'react-native-root-toast';

const EachExercise = (props) => {

  const [uri, setUri] = useState("");
  const [type, setType] = useState(`video/mp4`);
  const [number, setnum] = useState("30");

  const description = props.Description.map((item) => {
    return (
      <Text style={styles.description}>{item}</Text>
    );
  });

  return (
    <View style={styles.outerview}>
      <Image
        style={styles.imageHeading}
        source={props.img}
      />
      <Text style={styles.descriptionIter}>Select Number of Iterations to be completed:</Text>
      <Item picker>
        <Picker
          mode="dropdown"

          style={{ width: undefined }}
          placeholder="Select your SIM"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={number}
          onValueChange={setnum}
        >
          <Picker.Item label="20" value="20" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="40" value="40" />
          <Picker.Item label="50" value="50" />
          <Picker.Item label="60" value="60" />
        </Picker>
      </Item>
      {description}

      <Button style={{ height: 50 }}
        full
        success
        onPress={() => {
          props.navigator.push({
            screen: 'fitmate.CameraScreen',
            title: "Record Video",
            subtitle: undefined,
            passProps: { uri: uri, type: type, uriChanged: setUri, typeChanged: setType },
            animated: true,
            animationType: 'fade',
            backButtonTitle: undefined,
            backButtonHidden: false,

          });
        }}
      >
        <Text style={{ color: 'white' }}>  Add Video </Text>
      </Button>

      <Button style={{ height: 50 }}
        full
        success
        onPress={() => {
          // if (uri === "") {
          //   const toast = Toast.show('You must add a video!', {
          //     duration: Toast.durations.SHORT,
          //     position: Toast.positions.BOTTOM,
          //     shadow: true,
          //     animation: true,
          //     hideOnPress: true,
          //     delay: 0,
          //     backgroundColor: "red"
          //   });
          // } else {
          props.navigator.push({
            screen: 'fitmate.ChallengeFriendsScreen',
            title: "Challenge Friends",
            subtitle: undefined,
            passProps: {
              Exercise: props.ExerciseNum,
              Number: props.selected,
              videoURI: uri,
              videoType: type
            },
            animated: true,
            animationType: 'fade',
            backButtonTitle: undefined,
            backButtonHidden: false,
          });
          // }

        }}
      >
        <Text style={{ color: 'white' }}>  Submit Challenge </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({

  listcontainer: {
    width: "100%"
  },

  imageHeading: {
    width: "100%",
    height: 200,
  },

  outerview: {
    margin: 0,
    padding: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  description: {
    marginHorizontal: 20,
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    flex: 1
  },
  descriptionIter: {
    marginHorizontal: 'auto',
    fontSize: 18,
    color: 'black',
    marginBottom: 2,
  }

});

export default EachExercise;
