import { Navigation } from 'react-native-navigation';
// import settingsicon from '../../../icons/profile.png';
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
        navigatorButtons: {
          rightButtons: [
            {
              id:"sideDrawerToggle",
              icon: settingsicon,
              title: 'Menu'
            }
          ]
        },
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
    //     icon: require('../../../icons/friends.png'),
    //     // navigatorButtons: {
    //     //   rightButtons: [
    //     //     {
    //     //       id: 'profileBtn',
    //     //       icon: profileicon
    //     //     },
    //     //   ]
    //     // },
    //   },
    //   {
    //     screen: "fitmate.AddFriendsScreen",
    //     label: "Add friends",
    //     title: "Add friends",
    //     headerTitleSyle: {
    //       textAlign: 'center',
    //       flex: 1
    //     },
    //     icon: require('../../../icons/addperson.png'),
    //     // navigatorButtons: {
    //     //   rightButtons: [
    //     //     {
    //     //       id: 'profileBtn',
    //     //       icon: profileicon
    //     //     },
    //     //   ]
    //     // },
    //   }
    // ]
  });

}

export default startTabs;
