import React from 'react';
import { Text, View , StyleSheet } from 'react-native'

const EachExercise = (props) => {

    return (
      <View>
          <Text>{props.ExerciseName}</Text>
      </View>
    );
}


const styles = StyleSheet.create({

listcontainer:{
    width: "100%"
},

outerview : {
    margin: 10
}

});

export default EachExercise;
