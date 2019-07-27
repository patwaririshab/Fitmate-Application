import { Navigation } from 'react-native-navigation'
import AuthScreen from './src/screens/Auth/Auth.js';
import ExerciseScreen from './src/screens/Exercise/Exercise.js';
import FriendsScreen from './src/screens/Friends/Friends.js';
import FriendGroupListScreen from './src/screens/FriendGroupList/FriendGroupList.js';
import EachExerciseScreen from './src/screens/EachExercise/EachExercise.js';
import ChallengesListScreen from './src/screens/ChallengesList/ChallengesList.js';
import AddFriendsScreen from './src/screens/AddFriends/AddFriends.js';
import ChallengeFriendsScreen from './src/screens/ChallengeFriends/ChallengeFriends'
import UploadScreen from './src/screens/UploadScreen/uploadScreen'
import CameraScreen from './src/screens/CameraScreen/CameraScreen'
import ViewChallengesScreen from './src/screens/ViewChallenges/ViewChallenges'
import SentChallengesScreen from './src/screens/SentChallengesScreen/SentChallengesScreen'
import ViewContendersStateScreen from './src/screens/ViewContendersStateScreen/ViewContendersStateScreen'
import SideMenuScreen from './src/screens/SideMenu/SideMenu'
import LeaderBoardScreen from './src/screens/LeaderBoardScreen/LeaderBoardScreen'
import WatchVideoScreen from './src/screens/WatchVideo/WatchVideo'

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
Navigation.registerComponent("fitmate.ViewChallengesScreen", () => ViewChallengesScreen);

Navigation.registerComponent("fitmate.SentChallengesScreen", () => SentChallengesScreen);

Navigation.registerComponent("fitmate.ViewContendersStateScreen", () => ViewContendersStateScreen);
Navigation.registerComponent("fitmate.SideMenu", () => SideMenuScreen)

Navigation.registerComponent("fitmate.LeaderBoard", () => LeaderBoardScreen)
Navigation.registerComponent("fitmate.WatchVideoScreen", () => WatchVideoScreen)

Navigation.startSingleScreenApp({
  screen: {
    screen: "fitmate.AuthScreen",
    navigatorStyle: {
      navBarHidden: true,
    }
  }
})