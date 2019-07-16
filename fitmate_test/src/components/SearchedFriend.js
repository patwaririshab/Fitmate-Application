import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'
import IsFriendIcon from '../../icons/isfriend.jpg'
import AddFriendIcon from '../../icons/addfriend.png'
import { ListItem } from 'react-native-elements'; 
// import { Button } from 'native-base'
// import { Icon } from 'react-native-elements'


const SearchedFriend = (props) => {
  const picture = Math.random() > 0.5 ? Profile1 : Profile2;

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
  // const Addremovebtn = props.yesOrNo ? (
  //   <TouchableHighlight style={styles.iconBtn} onPress={props.pressed}>
  //     <Icon
  //       reverse
  //       name='md-happy'
  //       type='ionicon'
  //       color='green'
  //     />
  //   </TouchableHighlight>

  // ) : (
  //     <TouchableHighlight style={styles.iconBtn} onPress={props.pressed}>
  //       <Icon
  //         reverse
  //         name='md-sad'
  //         type='ionicon'
  //         color='red'
  //       />
  //     </TouchableHighlight>
  //   );
  // return (
  //   <View style={styles.container}>
  //     <Image
  //       style={styles.profilePicture}
  //       source={picture}
  //     />
  //     <View style={styles.nameContainer}>
  //       <Text style={styles.textStyle}>{props.item.name}</Text>
  //     </View>
  //     {Addremovebtn}

  //   </View>





  );
}


const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#212121',
    borderBottomWidth: 1,
    // borderWidth: 1,
    padding: 10,
    height: 80,
    width: "100%",
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
    borderRadius: 100,
  },
  nameContainer: {
    // flexGrow: 2,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
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
  // iconBtn: {
  //   width: 'auto'
  },



});

export default SearchedFriend;

