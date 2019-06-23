import React from 'react';
import {Text ,View , FlatList, StyleSheet} from 'react-native'
import EachFriend from '../../components/Eachfriend'

const FriendGroupList = (props) => {
  return(
    <View   style = {styles.outerview}>
      <FlatList
        style = {styles.listcontainer}
        data = {props.FriendList}
        renderItem={({item}) => <EachFriend name = {item}/>}>
      </FlatList>
    </View>
  );
}


const styles = StyleSheet.create({

  listcontainer:{
    width: "100%"
  },

  outerview : {
    margin: 10
  }

});

export default FriendGroupList;
