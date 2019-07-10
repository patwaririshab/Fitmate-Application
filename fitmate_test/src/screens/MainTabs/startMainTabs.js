import { Navigation } from 'react-native-navigation';

const startTabs = () => {

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: "fitmate.ChallengesListScreen",
        label: "Challenges",
        title: "Challenges",
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/exercise-icon.png'),
      },
      // {
      //   screen:"fitmate.ExerciseScreen",
      //   label: "Start Challenge",
      //   title: "Start Challenge",
      //   headerTitleSyle: {
      //     textAlign: 'center',
      //     flex: 1
      //   },
      //   icon: require('../../../icons/exercise-icon.png'),
      // },

      {
        screen: "fitmate.FriendsScreen",
        label: "Manage friends",
        title: "Manage friends",
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/friends-icon.png'),
      },
      {
        screen: "fitmate.AddFriendsScreen",
        label: "Add friends",
        title: "Add friends",
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/friends-icon.png'),
      }
    ]
  });

}

export default startTabs;
