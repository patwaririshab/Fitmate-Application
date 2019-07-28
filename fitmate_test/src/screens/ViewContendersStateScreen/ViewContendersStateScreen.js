import React from 'react';
import { Platform, PermissionsAndroid, CameraRoll, Button, FlatList, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import SentChallengeState from '../../components/SentChallengeState'


class ChallengeFriendsScreen extends React.Component {

    static navigatorStyle = {
        tabBarHidden: true, // make the screen content hide the tab bar (remembered across pushes)
    };


    render() {
        const navButton = (
            <Button 
                color={'#008000'}
                style={styles.buttonStyle}
                onPress={() => {
                    this.props.navigator.push({
                        screen: 'fitmate.WatchVideoScreen',
                        title: "Watch Video",
                        subtitle: undefined,
                        passProps: {
                            Exercise: this.props.ExerciseNum,
                            Number: this.props.Number,
                            DownloadURL: this.props.DownloadURL,

                        },
                        animated: true,
                        animationType: 'fade',
                        backButtonTitle: undefined,
                        backButtonHidden: false,
                    });
                }}
                title={'Watch Video'}>

            </Button>
        )

        const friendDisplay = (
            <FlatList
                style={styles.listcontainer}
                data={this.props.Contenders}
                renderItem={({ item }) => <SentChallengeState item={item} />}>

            </FlatList>
        );
        return (
            <View style={styles.overallcontainer}>
                {friendDisplay}
                {navButton}
            </View>
        );
    }



}

const styles = StyleSheet.create({
    listcontainer: {
        width: "100%"
    },
    overallcontainer: {
        paddingBottom: 0
    },
    buttonStyle: {
        flex: 1,
        margin: 0,
    }
});

export default ChallengeFriendsScreen;
