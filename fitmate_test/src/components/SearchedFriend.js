import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'
import { Button } from 'native-base'


const SearchedFriend = (props) => {
  const picture = Math.random() > 0.5 ? Profile1 : Profile2;

  const Addremovebtn = props.yesOrNo ? (
    <Button style={{ flex: 1 }}
      full
      warning
      onPress={props.pressed}
    >
      <Text style={{ color: 'white' }}> {props.removetext}</Text>
    </Button>
  ) : (
      <Button style={{ flex: 1 }}
        full
        success
        onPress={props.pressed}
      >
        <Text style={{ color: 'white' }}>  {props.addtext}</Text>
      </Button>
    );
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Image
          style={styles.profilePicture}
          source={picture}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.textStyle}>{props.item.name}</Text>
        </View>
      </View>
      {Addremovebtn}
    </View>

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
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold'
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
    backgroundColor: '#F5FCFF',
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: '#d6d7da',
  },
  AddFriendbutton: {
    flex: 1,
  }

});

export default SearchedFriend;
