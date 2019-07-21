import { Navigation } from 'react-native-navigation';
import settingsicon from '../../../icons/setting.png';
import profileicon from '../../../icons/profile.png';
import refreshicon from '../../../icons/refresh.png';
const startTabs = () => {

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: "fitmate.ChallengesListScreen",
        label: "Challenges",
        title: 'Challenges',
        // navigatorButtons: {
        //   rightButtons: [
        //     {
        //       id: 'profileBtn',
        //       icon: profileicon
        //     },
        //     {
        //       id: 'refreshBtn',
        //       icon: refreshicon
        //     }
        //   ]
        // },
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/exercise-icon.png'),
      },
      {
        screen: "fitmate.SentChallengesScreen",
        label: "View Sent Challenges",
        title: "View Sent Challenges",
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/exercise-icon.png'),

      },
      // {
      //   screen: "fitmate.FriendsScreen",
      //   label: "Manage friends",
      //   title: "Manage friends",
      //   headerTitleSyle: {
      //     textAlign: 'center',
      //     flex: 1
      //   },
      //   icon: require('../../../icons/friends.png'),
      //   // navigatorButtons: {
      //   //   rightButtons: [
      //   //     {
      //   //       id: 'profileBtn',
      //   //       icon: profileicon
      //   //     },
      //   //   ]
      //   // },
      // },
      {
        screen: "fitmate.AddFriendsScreen",
        label: "Add friends",
        title: "Add friends",
        headerTitleSyle: {
          textAlign: 'center',
          flex: 1
        },
        icon: require('../../../icons/addperson.png'),

      }
    ],

    drawer: {
      right: {
        screen: 'fitmate.SideMenu'
      }
    }

  });

}

export default startTabs;
