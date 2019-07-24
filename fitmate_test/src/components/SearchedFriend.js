import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'
import IsFriendIcon from '../../icons/friends.png'
import AddFriendIcon from '../../icons/addperson.png'
import { ListItem } from 'react-native-elements';



const SearchedFriend = (props) => {
  const picture = Math.random() > 0.5 ? Profile1 : Profile2;

  return (
    <ListItem
      roundAvatar
      title={props.item.name}
      leftAvatar={{ source: picture }}
      rightAvatar={props.yesOrNo ? { source: IsFriendIcon } : { source: AddFriendIcon }}
      // rightTitle = {AddRemoveText}
      onPress={props.pressed}
    >
    </ListItem>

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
    borderRadius: 30

  },
  AddFriendbutton: {
    flex: 1,
  }

});

export default SearchedFriend;

