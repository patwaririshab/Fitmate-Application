import React, { Component } from 'react';
import { Alert, Platform, StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native';
import startTabs from '../MainTabs/startMainTabs'
import firebase from '../../Firebase'
import AuthContext from '../../Context/AuthContext'

import { Container, Content, Header, Form, Item, Label } from 'native-base'
import { Button, Input, ThemeProvider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import dumbell from '../../../icons/dumbell.png'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

class AuthScreen extends Component {

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
      const leaderBoardScores = {
        UserID: user.uid,
        Name: this.state.name,
        Score: 0
      }
      await firebase.firestore().collection('leaderboard').doc(user.uid).set(leaderBoardScores);

    }
    catch (error) {
      console.log(error.toString())
      alert(error);
    }
  }

  logInUser = () => {

    console.log("Logging in");
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        startTabs();

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Email already associated with another account.');
        }
        else if (errorCode === 'auth/invalid-credential') {
          alert('Please recheck your email and password.')
        }
        else if (errorCode === 'auth/user-not-found') {
          alert('User Not Found. Please recheck your username.')
        }
        else if (errorCode === 'auth/wrong-password') {
          alert('Please recheck your password.')
        }
        else {
          console.log(error);
          alert('An unknown error occured, please try again later.')
        }
      }
      )
  }

  logInWithFacebook = () => (
    alert('This feature is currently not available. Try log in using other methods.')
    // Auth.Facebook.login(fbLoginPermissions)
    // .then((token) => {
    //   firebase.auth()

    // .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(
    //   token))
    // })
    // .catch((err) => this.onError && this.onError(err))
  );

  // async logInWithFacebook(){
  //   const {type, token} = await Facebook.logInWithReadPermissionsAsync('2371990063013333', {  permissions:['public_profile']  })

  //   if (type == 'success') {

  //     const credential = firebase.auth.FacebookAuthProvider.credential(token)

  //     firebase.auth().signInWithCredential(credential).catch((error) => {
  //       console.log(error)
  //     })
  //   }
  // }



  render() {
    return (
      <Container style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../../icons/background-image-green.png')}
        >
          <Form>
            <AuthContext.Provider value={{ authenticated: true, userUID: this.state.uid }} />
            <View
              style={styles.imageContainer}
            >
              <Image
                style={styles.dumbellStyle}
                source={dumbell}
              />
            </View>
            <Text style={{ fontFamily: 'monospace', textAlign: 'center', fontSize: 50, fontWeight: 'bold', color: 'black' }}> Fitmate</Text>

            <View
              style={styles.inputBackground}>
              <Input
                placeholder='Email'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
                leftIcon={
                  <Icon
                    style={{ marginRight: 10 }}
                    name='envelope'
                    size={18}
                    color='black'
                  />
                }
              />


              <Input
                placeholder='Display Name'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(name) => this.setState({ name })}
                leftIcon={
                  <Icon
                    style={{ marginRight: 10 }}
                    name='user'
                    size={21}
                    color='black'
                  />
                }
              />


              <Input
                placeholder='Password'
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                leftIcon={
                  <Icon
                    style={{ marginRight: 10 }}
                    name='key'
                    size={18}
                    color='black'
                  />
                }
              />
            </View>

            <Button
              containerStyle={{ marginTop: 30, marginHorizontal: 30 }}
              buttonStyle={{ borderColor: 'black', borderRadius: 30, padding: 10 }}
              titleStyle={{ color: 'black' }}
              title='Login'
              type='outline'
              transparent='true'
              //raised
              onPress={() => this.logInUser()}
            >
            </Button>

            <Button
              containerStyle={{ marginTop: 20, marginHorizontal: 30 }}
              buttonStyle={{ backgroundColor: 'grey', borderRadius: 30, padding: 10 }}
              titleStyle={{ color: 'white' }}
              title="Sign Up User"
              type='solid'
              raised
              onPress={() => this.signUpUser()}
            >
            </Button>

            <Button
              containerStyle={{ marginTop: 20, marginHorizontal: 30 }}
              buttonStyle={{ backgroundColor: '#000000', borderRadius: 30, padding: 10 }}
              icon={
                <Icon
                  style={{ marginRight: 10 }}
                  name='facebook-official'
                  size={20}
                  color='white'
                />
              }
              title="Facebook Login"
              type='solid'
              onPress={this.logInWithFacebook}
            >
            </Button>
          </Form>
        </ImageBackground>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  inputBackground: {
    marginTop: 10,
    backgroundColor: '#FFFFFF50',
    borderRadius: 10,
    padding: 20
  },
  imageContainer: {
    alignItems: 'center'
  },
  dumbellStyle: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 6,
  }
});

export default AuthScreen;
