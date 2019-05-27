import React, { Component } from 'react';
import ExerciseItem from '../../components/ExerciseItem'
import { FlatList, StyleSheet, View} from 'react-native'


class ExerciseScreen extends React.Component{
  state = {
    exercises:[
      {
        key: "1",
        ExerciseName: "Push Ups"
      },
      {
        key: "2",
        ExerciseName: "Sit Ups",
        
      },
      {
        key: "3",
        ExerciseName: "Jumping Jacks",
      
      },
    ]
  }
  
  exerciseitemclickedhandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.EachExerciseScreen', // unique ID registered with Navigation.registerScreen
      title: item.ExerciseName, // navigation bar title of the pushed screen (optional)
      subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
      passProps: item, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonTitle: undefined, // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
    });
  }

  render(){
    const exercisedisp =(
      <FlatList
        style = {styles.listcontainer}
        data = {this.state.exercises}
        renderItem={({item}) => <ExerciseItem pressed = {()=>{return this.exerciseitemclickedhandler(item)}} name = {item.ExerciseName}/>}
      >
      </FlatList>
    )
    
    return(
    <View style = {styles.outerview}>
      {exercisedisp}
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
