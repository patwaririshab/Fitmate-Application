import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'
import { Button } from 'native-base'
import { Icon } from 'react-native-elements'


const SearchedFriend = (props) => {
  const picture = Math.random() > 0.5 ? Profile1 : Profile2;


  const words = props.item.name.split(" ");

  const initials = words.map(word => word[0])

  const Disp = initials.join("");

  const Addremovebtn = props.yesOrNo ? (
    <TouchableHighlight style={styles.iconBtn} onPress={props.pressed}>
      <Icon
        reverse
        name='md-happy'
        type='ionicon'
        color='green'
      />
    </TouchableHighlight>

  ) : (
      <TouchableHighlight style={styles.iconBtn} onPress={props.pressed}>
        <Icon
          reverse
          name='md-sad'
          type='ionicon'
          color='red'
        />
      </TouchableHighlight>
    );
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 100,
          height: 50,
          width: 50,
          borderWidth: 3,
          borderColor: "white",
          backgroundColor: "#0D47A1",
          textAlign: "center",
          textAlignVertical: "center"
        }}
      >
        <Text
          style={{ width: 50, height: 50, textAlign: "center", textAlignVertical: "center", fontSize: 20, color: "white", margin: "auto" }}
        >{Disp}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.textStyle}>{props.item.name}</Text>
      </View>
      {Addremovebtn}

    </View>





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
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold'
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
    backgroundColor: '#F5FCFF',
  },
  iconBtn: {
    width: 'auto'
  },



});

export default SearchedFriend;
