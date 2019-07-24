import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'

const EachFriend = (props) => {
  const picture = Math.random() > 0.5 ? Profile1 : Profile2;

  const words = props.name.name.split(" ");

  const initials = words.map(word => word[0])

  const Disp = initials.join("");
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
          style={{ width: 50, height: 50, textAlign: "center", textAlignVertical: "center", fontSize: 20, fontStyle: "bold", color: "white", margin: "auto" }}
        >{Disp}</Text>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.textStyle}>{props.name.name}</Text>
        <Text style={styles.textStyle}>{props.name.email}</Text>
      </View>
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
    flex: 1,
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
  }

});

export default EachFriend;
