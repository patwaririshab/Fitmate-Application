import React, { Component } from 'react';
import ExerciseItem from '../../components/ExerciseItem'
import { FlatList, StyleSheet, View} from 'react-native'


class ExerciseScreen extends React.Component{
  state = {
    selectedF: "40",
    exercises:[
      {
        key: "1",
        ExerciseNum:1,
        ExerciseName: "Push Ups"
      },
      {
        key: "2",
        ExerciseNum:2,
        ExerciseName: "Sit Ups",

      },
      {
        key: "3",
        ExerciseNum:3,
        ExerciseName: "Jumping Jacks",

      },
    ]
  }
  challengeFriendsHandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.ChallengeFriendsScreen', // unique ID registered with Navigation.registerScreen
      title: "Challenge Friends", // navigation bar title of the pushed screen (optional)
      subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
      passProps: {...item } ,// Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonTitle: undefined, // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
    });
  }

  exerciseItemClickedHandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.CameraScreen', // unique ID registered with Navigation.registerScreen
      title: item.ExerciseName, // navigation bar title of the pushed screen (optional)
      subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
      passProps: {...item, onValueChanged: (e) => this.onValueChange(e) , selected: this.state.selectedF , pressed: (e ,item) => this.challengeFriendsHandler(item)} ,// Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonTitle: undefined, // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
    });
  }

  onValueChange = (value) => {

    console.log(value)
    const val = value.toString();

    this.setState({selectedF: val});
    // this.setState({
    //   selectedF: value
    // });
  }

  render(){
    const exerciseDisplay =(
      <FlatList
        style = {styles.listcontainer}
        data = {this.state.exercises}
        renderItem={({item}) => <ExerciseItem pressed = {()=>(this.exerciseItemClickedHandler(item))} name = {item.ExerciseName}/>}
      >
      </FlatList>
    )

    return(
    <View style = {styles.outerview}>
      {exerciseDisplay}
    </View>
    );
  }
}

const styles = StyleSheet.create({

  listcontainer:{
    width: "100%"
  },

  outerview : {
    margin: 10
  }

});



export default ExerciseScreen;
