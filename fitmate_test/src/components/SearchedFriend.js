import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'
import IsFriendIcon from '../../icons/isfriend.jpg'
import AddFriendIcon from '../../icons/addfriend.png'
import { Button } from 'native-base'
import { ListItem } from 'react-native-elements';


const SearchedFriend = (props) => {
  const picture = Math.random() > 0.5 ? Profile1 : Profile2;

//   const Addremovebtn = props.yesOrNo ? (
//     <Button style={{ flex: 1 }}
//       full
//       warning
//       onPress={props.pressed}
//       borderRadius={30}
//       margin = {10}
//     >
//       <Text style={{ color: 'white' }}> {props.removetext}</Text>
//     </Button>
//   ) : (
//       <Button style={{ flex: 1 }}
//         full
//         success
//         onPress={props.pressed}
//         borderRadius={30}
//         margin={10}
//       >
//         <Text style={{ color: 'white' }}>  {props.addtext}</Text>
//       </Button>
//     );


//const AddRemoveText = props.yesOrNo ? 'Friend': ''
// const AddRemoveIcon = props.yesOrNo ? (source = {IsFriendIcon}) : (source = {AddFriendIcon})
  return (
    <ListItem
        roundAvatar
        title = {props.item.name}
        leftAvatar = {{source: picture}}
        rightAvatar = {props.yesOrNo? {source: AddFriendIcon} :{source: IsFriendIcon}}
        // rightTitle = {AddRemoveText}
        onPress = {props.pressed}
    >
    </ListItem>




    // <View style={styles.outerContainer}>
    //   <View style={styles.container}>
    //     <Image
    //       style={styles.profilePicture}
    //       source={picture}
    //     />
    //     <View style={styles.nameContainer}>
    //       <Text style={styles.textStyle}>{props.item.name}</Text>
    //     </View>
    //   </View>
    // </View>

  );
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginBottom: 10,
    padding: 20,
    height: 100,
    width: "100%",
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 100
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius:30
  },
  AddFriendbutton: {
    flex: 1,
  }

});

export default SearchedFriend;

