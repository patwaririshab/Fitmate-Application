import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth.js';
import ExerciseScreen from './src/screens/Exercise/Exercise.js';
import FriendsScreen from './src/screens/Friends/Friends.js';
import FriendGroupListScreen from './src/screens/FriendGroupList/FriendGroupList.js';
import EachExerciseScreen from './src/screens/EachExercise/EachExercise.js';
import ChallengesListScreen from './src/screens/ChallengesList/ChallengesList.js';
import AddFriendsScreen from './src/screens/AddFriends/AddFriends.js';
import ChallengeFriendsScreen from './src/screens/ChallengeFriends/ChallengeFriends'
import CameraScreen from './src/screens/CameraScreen/CameraScreen.js';
import UploadScreen from './src/screens/UploadScreen/uploadScreen'


Navigation.registerComponent("fitmate.AuthScreen", () => AuthScreen);
Navigation.registerComponent("fitmate.ExerciseScreen", () => ExerciseScreen);
Navigation.registerComponent("fitmate.FriendsScreen", () => FriendsScreen);
Navigation.registerComponent("fitmate.FriendGroupListScreen", () => FriendGroupListScreen);
Navigation.registerComponent("fitmate.EachExerciseScreen", () => EachExerciseScreen);
Navigation.registerComponent("fitmate.ChallengesListScreen", () => ChallengesListScreen);
Navigation.registerComponent("fitmate.AddFriendsScreen", () => AddFriendsScreen);
Navigation.registerComponent("fitmate.ChallengeFriendsScreen", () => ChallengeFriendsScreen);
Navigation.registerComponent('fitmate.CameraScreen', () => CameraScreen);
Navigation.registerComponent("fitmate.UploadScreen", () => UploadScreen);


Navigation.startSingleScreenApp({
  screen: {
    screen: "fitmate.AuthScreen",
    title: "Login",
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1
    },

  }
})
