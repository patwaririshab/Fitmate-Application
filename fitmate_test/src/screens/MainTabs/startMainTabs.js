import { Navigation } from 'react-native-navigation';
import settingsicon from '../../../icons/setting.png';
const startTabs = () => {

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: "fitmate.ChallengesListScreen",
        label: "Challenges",
        title: 'Challenges',
        navigatorButtons: {
          rightButtons: [
            {
              id: 'buttonOne',
              icon: settingsicon
            }
          ]
        },
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/exercise-icon.png'),
      },
      {
        screen: "fitmate.FriendsScreen",
        label: "Manage friends",
        title: "Manage friends",
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/friends-icon.png'),
        navigatorButtons: {
          rightButtons: [
            {
              id: 'buttonOne',
              icon: settingsicon
            }
          ]
        },
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
        navigatorButtons: {
          rightButtons: [
            {
              id: 'buttonOne',
              icon: settingsicon
            }
          ]
        },
      }
    ]
  });

}

export default startTabs;
