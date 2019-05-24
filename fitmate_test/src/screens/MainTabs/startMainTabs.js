import {Navigation} from 'react-native-navigation';

const startTabs = () => {

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen:"fitmate.ExerciseScreen",
        label: "Start Challenge",
        title: "Start Challenge",
        icon: require('../../../icons/exercise-icon.png'),
      },

      {
        screen:"fitmate.FriendsScreen",
        label: "Manage friends",
        title: "Manage friends",
        icon: require('../../../icons/friends-icon.png'),
      }
    ]
  });

}

export default startTabs;
