import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { Item, Picker, Button } from 'native-base';

const EachExercise = (props) => {

  return (
    <View style={styles.outerview}>
      <Text>{props.ExerciseName}</Text>
      <Item picker>
        <Picker
          mode="dropdown"

          style={{ width: undefined }}
          placeholder="Select your SIM"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={props.selected}
          onValueChange={props.onValueChanged}
        >
          <Picker.Item label="20" value="20" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="40" value="40" />
          <Picker.Item label="50" value="50" />
          <Picker.Item label="60" value="60" />
        </Picker>
      </Item>

      <Button style={{ height: 50 }}
        full
        success
        onPress={() => {
          props.navigator.push({
            screen: 'fitmate.ChallengeFriendsScreen',
            title: "Challenge Friends",
            subtitle: undefined,
            passProps: {
              Exercise: props.ExerciseNum,
              Number: props.selected
            },
            animated: true,
            animationType: 'fade',
            backButtonTitle: undefined,
            backButtonHidden: false,
          });
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

  outerview: {
    margin: 10,
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }

});

export default EachExercise;
