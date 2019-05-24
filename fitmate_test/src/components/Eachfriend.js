import React from 'react';
import {View , Text ,StyleSheet , Image} from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'

const Eachfriend = (props) => {
  const picture = Math.random() > 0.5 ? Profile1 : Profile2;
  return(
    <View style = {styles.container}>
      <Image
          style = {styles.profilepic}
          source={picture}
      />
      <Text style = {styles.textstyle}>{props.name.key}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    borderRadius:5,
    marginBottom:10,
    padding: 20 ,
    height: 100,
    width: "100%",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textstyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  profilepic:{
    height: 50,
    width: 50,
    borderRadius: 100
  }

});

export default Eachfriend;
