import {Navigation} from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth.js';
import ExerciseScreen from './src/screens/Exercise/Exercise.js';
import FriendsScreen from './src/screens/Friends/Friends.js';
import EachgroupScreen from './src/screens/Eachgroup/Eachgroup.js';

Navigation.registerComponent("fitmate.AuthScreen", () => AuthScreen);

Navigation.registerComponent("fitmate.ExerciseScreen", () => ExerciseScreen);
Navigation.registerComponent("fitmate.FriendsScreen", () => FriendsScreen);
Navigation.registerComponent("fitmate.EachgroupScreen", () => EachgroupScreen);


Navigation.startSingleScreenApp({
  screen:{
    screen: "fitmate.AuthScreen",
    title:"Login"
  }
  })
