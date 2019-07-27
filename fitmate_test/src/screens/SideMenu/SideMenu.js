import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import Profile1 from '../../../icons/profilepic.jpg'
import Profile2 from '../../../icons/profilepic2.jpg'
import firebase from '../../Firebase'
import { Navigation } from 'react-native-navigation'


const picture = Math.random() > 0.5 ? Profile1 : Profile2;


class SideMenu extends Component{
    render(){
        const userName = firebase.auth().currentUser.userID
        const userEmail = firebase.auth().currentUser.email
        return(

                <View
                    style={[styles.container]
                }>
                    <Image
                        style = {styles.ImageStyle}
                        source = {picture}
                    />
                    <Text style= {styles.TextStyle}>
                        {userName}
                    </Text>
                    <Text style= {styles.TextStyle}>
                        {userEmail}
                    </Text>
                    <Button 
                        containerStyle={{ marginTop: 100, marginHorizontal: 30 }}
                        buttonStyle={{ backgroundColor: 'grey', borderRadius: 30, padding: 10}}
                        titleStyle={{color: 'white'}}
                        title = "Logout"
                        type = 'solid'
                        raised
                        onPress={()=>{
                            firebase.auth().signOut()
                            .then(() => {
                                Navigation.startSingleScreenApp({
                                    screen: {
                                      screen: "fitmate.AuthScreen",
                                      navigatorStyle: {
                                          navBarHidden: true,
                                      }
                                    }
                                  })
                            })
                            .catch((error) => {
                                Alert.alert(error)
                            });
                            

                        }}
                     >
          </Button>
                </View>
        )
    }
}



const styles = StyleSheet.create({

    container:{
        paddingTop:22,
        backgroundColor:"#00000095",
        width: Dimensions.get("window").width * 0.4,
        height: Dimensions.get("window").height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImageStyle: {
        borderRadius: 100,
        height: 80,
        width: 80,
    },
    TextStyle: {
        color: 'white',
        marginTop: 20
    }
})

export default SideMenu;