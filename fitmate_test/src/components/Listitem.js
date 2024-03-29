import React from 'react';
import {Platform, StyleSheet, Text, View , TextInput , Button , TouchableOpacity} from 'react-native';


const ListItem = (props) => {
  return(
    <TouchableOpacity onPress={props.pressed}>
      <View>
        <Text style = {styles.eachItem}>{props.textitem}</Text>
      </View>
    </TouchableOpacity>



  );
}

const styles = StyleSheet.create({
  eachItem: {
    backgroundColor: '#eee',
    width:"100%",
    padding: 5,
    marginBottom: 10
  },

});

export default ListItem;
