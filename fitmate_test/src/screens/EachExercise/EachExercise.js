import React from 'react';
import { Text, View , StyleSheet } from 'react-native'
import { Item, Picker ,Button } from 'native-base';

const EachExercise = (props) => {

    return (
      <View>
          <Text>{props.ExerciseName}</Text>

          <Item picker>
            <Picker
              mode="dropdown"
              // iosIcon={<Icon name="arrow-down" />}
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
                screen: 'fitmate.ChallengeFriendsScreen', // unique ID registered with Navigation.registerScreen
                title: "Challenge Friends", // navigation bar title of the pushed screen (optional)
                subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
                passProps: {
                  Exercise: props.ExerciseNum,
                  Number: props.selected 
                } ,// Object that will be passed as props to the pushed screen (optional)
                animated: true, // does the push have transition animation or does it happen immediately (optional)
                animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                backButtonTitle: undefined, // override the back button title (optional)
                backButtonHidden: false, // hide the back button altogether (optional)
              });
            }}
          >
            <Text style={{ color: 'white' }}>  Submit Challenge </Text>
          </Button>



      </View>
    );
}



const styles = StyleSheet.create({

listcontainer:{
    width: "100%"
},

outerview : {
    margin: 10,
    padding: 20 ,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
}

});

export default EachExercise;
