import { Navigation } from 'react-native-navigation';
import settingsicon from '../../../icons/profile.png';
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
              id:"sideDrawerToggle",
              icon: settingsicon,
              title: 'Menu'
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
        screen: "fitmate.AddFriendsScreen",
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
              id:"sideDrawerToggle",
              icon: settingsicon,
              title: 'Menu'
            }
          ]
        },
      },
      // {
      //   screen: "fitmate.AddFriendsScreen",
      //   label: "Add friends",
      //   title: "Add friends",
      //   headerTitleSyle: {
      //     textAlign: 'center',
      //     flex: 1,

      //   },
      //   icon: require('../../../icons/friends-icon.png'),
      //   navigatorButtons: {
      //     rightButtons: [
      //       {
      //         id:"sideDrawerToggle",
      //         icon: settingsicon,
      //         title: 'Menu'
      //       }
      //     ]
      //   },
      // }
    ],
  drawer: {
    right: {
      screen: 'fitmate.SideMenu'
    }
  }
  });

}

export default startTabs;
