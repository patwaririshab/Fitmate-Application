import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements'
import Profile1 from '../../../icons/profilepic.jpg'
import Profile2 from '../../../icons/profilepic2.jpg'
import firebase from '../../Firebase'

import { Navigation } from 'react-native-navigation'


class SideMenu extends Component {

    state = {
        name: "",
        userID: "",
        email: ""
    }

    async componentDidMount() {

        const user = firebase.auth().currentUser;

        const userDoc = await firebase.firestore().collection('users').where("userID", "==", user.uid).get().then((snapshot) => {
            return snapshot.docs[0].data();
        });

        console.log("USERDOC", userDoc)

        this.setState({ name: userDoc.name, email: userDoc.email, userID: userDoc.userID })


    }

    render() {

        const words = this.state.name.split(" ");

        const initials = words.map(word => word[0])

        const Disp = initials.join("");

        return (

            <View
                style={[styles.container]
                }>
                <View
                    style={styles.ImageStyle}
                >
                    <Text
                        style={{ width: 80, height: 80, textAlign: "center", textAlignVertical: "center", fontSize: 30, fontStyle: "bold", color: "white", margin: "auto" }}
                    >{Disp}</Text>
                </View>
                <Text style={styles.TextStyle}>
                    {this.state.name}
                </Text>
                <Text style={styles.TextStyle}>
                    {this.state.email}
                </Text>
                <Button
                    containerStyle={{ marginTop: 100, marginHorizontal: 30 }}
                    buttonStyle={{ backgroundColor: 'grey', borderRadius: 30, padding: 10 }}
                    titleStyle={{ color: 'white' }}
                    title="Logout"
                    type='solid'
                    raised
                    onPress={() => {
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
                                console.log(error)
                            });
                    }}
                >
                </Button>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "#00000095",
        width: Dimensions.get("window").width * 0.4,
        height: Dimensions.get("window").height,
        alignItems: 'center',
        justifyContent: 'center'

    },
    ImageStyle: {
        borderRadius: 100,
        height: 80,
        width: 80,
        marginLeft: "auto",
        marginRight: "auto",
        borderWidth: 3,
        borderColor: "white",
        backgroundColor: "#0D47A1",
        textAlign: "center",
        textAlignVertical: "center"
    },
    TextStyle: {
        color: 'white',
        marginTop: 20
    }
})

export default SideMenu;