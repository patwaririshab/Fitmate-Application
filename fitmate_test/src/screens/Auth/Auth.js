import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import startTabs from '../MainTabs/startMainTabs'
import firebase from '../../Firebase'
import AuthContext from '../../Context/AuthContext'

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'


class AuthScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: ' ',
      password: '',
      name: "",
      uid: ""
    })

  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        startTabs();
      }
    })
  }
  async signUpUser() {
    console.log("Signing up");

    try {
      if (this.state.password.length < 6) {
        alert("Please enter at least 6 characters")
        return;
      }
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((response) => {
        console.log(response);
      });


      const user = firebase.auth().currentUser;

      const account = {
        name: this.state.name,
        email: this.state.email,
        userID: user.uid
      }
      this.setState({ uid: user.uid });
      await firebase.firestore().collection('users').doc(user.uid).set(account);
      const newFriends = {
        Friends: []
      }
      await firebase.firestore().collection('allFriends').doc(user.uid).set(newFriends);

    }
    catch (error) {
      console.log(error.toString())
      alert(error);
    }
  }

  logInUser = () => {

    console.log("Logging in");

    try {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
        console.log(user)
        startTabs();
      })
    }
    catch (error) {
      console.log(error.toString())
    }
  }


  // async logInWithFacebook(){
  //   const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('2371990063013333', {  permissions:['public_profile']  })
  //
  //   if (type == 'success') {
  //
  //     const credential = firebase.auth.FacebookAuthProvider.credential(token)
  //
  //     firebase.auth().signInWithCredential(credential).catch((error) => {
  //       console.log(error)
  //     })
  //   }
  // }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <AuthContext.Provider value={{ authenticated: true, userUID: this.state.uid }} />
          <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold' }}> Fitmate</Text>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Display Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(name) => this.setState({ name })}
            />
          </Item>


          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
          </Item>

          <Button style={{ marginTop: 30 }}
            full
            rounded
            success
            onPress={() => this.logInUser()}
          >
            <Text style={{ color: 'white' }}> Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            warning
            onPress={() => this.signUpUser()}
          >
            <Text style={{ color: 'white' }}> Sign Up</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.logInWithFacebook()}
          >
            <Text style={{ color: 'white' }}> Login with Facebook</Text>
          </Button>

        </Form>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    padding: 10,
  },

});

export default AuthScreen;
