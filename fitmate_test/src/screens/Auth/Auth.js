import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import startTabs from '../MainTabs/startMainTabs'
import firebase from '../../Firebase'

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'


class AuthScreen extends React.Component{

  constructor(props){
    super(props)

    this.state = ({
      email: ' ',
      password: '',
      name: "",
    })

  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }
  signUpUser =  (email, password) => {
    try{
      if(this.state.password.length < 6){
        alert("Please enter at least 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((user) => {
        // get user data from the auth trigger

        const email = user.email; // The email of the user.
        const displayName =  this.state.name; // The display name of the user.

        // set account  doc
        const account = {
          name: displayName,
          email:email
        }
        firebase.firestore().collection('accounts').doc(user.uid).set(account);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });


    }
    catch(error){
      console.log(error.toString())
    }
  }

  logInUser = (email, password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function (user) {
        // console.log(user)
      startTabs();
    })
    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginHandler = () => {
    startTabs();
  }


  async logInWithFacebook(){
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('2371990063013333', {  permissions:['public_profile']  })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
    <Container style={styles.container}>
      <Form>

        <Text style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold' }}> Fitmate</Text>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
            />
        </Item>

        <Item floatingLabel>
          <Label>Display Name</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(name) => this.setState({name})}
            />
        </Item>


        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            />
        </Item>

        <Button style={{ marginTop: 30 }}
          full
          rounded
          success
          onPress={()=> this.logInUser(this.state.email,this.state.password)}
        >
          <Text style={{ color: 'white' }}> Login</Text>
        </Button>

        <Button style={{ marginTop: 10 }}
          full
          rounded
          warning
          onPress={()=> this.signUpUser(this.state.email,this.state.password)}
        >
          <Text style={{ color: 'white'}}> Sign Up</Text>
        </Button>

        <Button style={{ marginTop: 10 }}
          full
          rounded
          primary
          onPress={()=> this.logInWithFacebook()}
        >
          <Text style={{ color: 'white'}}> Login with Facebook</Text>
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
    padding:10,
  },

});

export default AuthScreen;
