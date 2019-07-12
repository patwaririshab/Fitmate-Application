import React, { Component } from 'react';
import ExerciseItem from '../../components/ExerciseItem'
import { FlatList, StyleSheet, View } from 'react-native'

import pushupimg from '../../../icons/pushuplabel.jpg'
import situpimg from '../../../icons/situpslabel.jpg'

import squatsimg from '../../../icons/squatslabel.jpg'

class ExerciseScreen extends React.Component {
  state = {
    selectedF: "40",
    exercises: [
      {
        key: "1",
        ExerciseNum: 1,
        ExerciseName: "Push Ups",
        Description: ["Lay Prone on the ground with arms supporting your body", "Keep your body straight while raising and lowering your body with your arms", "This exercise works the chest shoulders, triceps and back and legs"],
        img: pushupimg
      },
      {
        key: "2",
        ExerciseNum: 2,
        ExerciseName: "Sit Ups",
        Description: ["Lie down andbend your knees with your feet flat on the floor. Cross your arms in front of your chest",
          , "Then life your head and shoulders up till your arms touch your thighs", "This exercise works the rectus abdominis muscle and obliques"],
        img: situpimg
      },
      {
        key: "3",
        ExerciseNum: 3,
        ExerciseName: "Squats",
        Description: ["Stand with your feet shoulder width apart and your arms stretched forward, then lower your body until your thigs are parallel to the floor",
          "Return to the start position and repeat", "This exercise works the thighs, hips , buttocks , quads , hamstrings and lower body"],
        img: squatsimg
      },
    ]
  }
  // challengeFriendsHandler = (item) => {
  //   this.props.navigator.push({
  //     screen: 'fitmate.ChallengeFriendsScreen',
  //     title: "Challenge Friends",
  //     subtitle: undefined,
  //     passProps: { ...item },
  //     animated: true,
  //     animationType: 'fade',
  //     backButtonTitle: undefined,
  //     backButtonHidden: false,
  //   });
  // }

  exerciseViewItemClickedHandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.EachExerciseScreen',
      title: item.ExerciseName,
      subtitle: undefined,
      passProps: { ...item, selected: this.state.selectedF, pressed: (e, item) => this.challengeFriendsHandler(item) },
      animated: true,
      animationType: 'fade',
      backButtonTitle: undefined,
      backButtonHidden: false,
    });
  }

  // exerciseItemClickedHandler = (item) => {
  //   this.props.navigator.push({
  //     screen: 'fitmate.CameraScreen', // unique ID registered with Navigation.registerScreen
  //     title: item.ExerciseName, // navigation bar title of the pushed screen (optional)
  //     subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
  //     passProps: { ...item, onValueChanged: (e) => this.onValueChange(e), selected: this.state.selectedF, pressed: (e, item) => this.challengeFriendsHandler(item) },// Object that will be passed as props to the pushed screen (optional)
  //     animated: true, // does the push have transition animation or does it happen immediately (optional)
  //     animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
  //     backButtonTitle: undefined, // override the back button title (optional)
  //     backButtonHidden: false, // hide the back button altogether (optional)
  //   });
  // }

  render() {
    const exerciseDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.exercises}
        renderItem={({ item }) => <ExerciseItem pressed={() => {
          this.exerciseViewItemClickedHandler(item)
          this.props.closeModal();
        }}
          {...item} />}
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
    // margin: 10
  }

});



export default ExerciseScreen;
