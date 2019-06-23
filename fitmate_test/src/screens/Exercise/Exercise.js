import React, { Component } from 'react';
import ExerciseItem from '../../components/ExerciseItem'
import { FlatList, StyleSheet, View } from 'react-native'


class ExerciseScreen extends React.Component {
  state = {
    selectedF: "40",
    exercises: [
      {
        key: "1",
        ExerciseNum: 1,
        ExerciseName: "Push Ups"
      },
      {
        key: "2",
        ExerciseNum: 2,
        ExerciseName: "Sit Ups",

      },
      {
        key: "3",
        ExerciseNum: 3,
        ExerciseName: "Jumping Jacks",

      },
    ]
  }
  challengeFriendsHandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.ChallengeFriendsScreen',
      title: "Challenge Friends",
      subtitle: undefined,
      passProps: { ...item },
      animated: true,
      animationType: 'fade',
      backButtonTitle: undefined,
      backButtonHidden: false,
    });
  }

  exerciseItemClickedHandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.EachExerciseScreen',
      title: item.ExerciseName,
      subtitle: undefined,
      passProps: { ...item, onValueChanged: (e) => this.onValueChange(e), selected: this.state.selectedF, pressed: (e, item) => this.challengeFriendsHandler(item) },
      animated: true,
      animationType: 'fade',
      backButtonTitle: undefined,
      backButtonHidden: false,
    });
  }

  onValueChange = (value) => {
    console.log(value)
    const val = value.toString();
    this.setState({ selectedF: val });
  }
  render() {
    const exerciseDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.exercises}
        renderItem={({ item }) => <ExerciseItem pressed={() => (this.exerciseItemClickedHandler(item))} name={item.ExerciseName} />}
      >
      </FlatList>
    )
    return (
      <View style={styles.outerview}>
        {exerciseDisplay}
      </View>
    );
  }
}
const styles = StyleSheet.create({

  listcontainer: {
    width: "100%"
  },

  outerview: {
    margin: 10
  }

});



export default ExerciseScreen;
