import React from 'react';
import {Button} from 'react-native'
import { Platform, PermissionsAndroid, CameraRoll, FlatList, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import SentChallengeState from '../../components/SentChallengeState'


const ChallengeFriendsScreen = (props) => {
    const friendDisplay = (
        <FlatList
            style={styles.listcontainer}
            data={props.Contenders}
            renderItem={({ item }) => <SentChallengeState item={item} />}>

        </FlatList>
    );

    const navButton = (
        <Button success
                style={styles.buttonStyle} 
                onPress={()=>{
                props.navigator.push({
                    screen: 'fitmate.WatchVideoScreen',
                    title: "Watch Video",
                    subtitle: undefined,
                    passProps: {
                    Exercise: props.ExerciseNum,
                    Number: props.Number,
                    DownloadURL:props.DownloadURL,

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
    
    return (
        <View style={styles.overallcontainer}>
            {navButton}
            {friendDisplay}
        </View>
    );
    


}

const styles = StyleSheet.create({
    listcontainer: {
        width: "100%"
    },
    overallcontainer: {
        paddingBottom: 16
    },
    buttonStyle: {
        flex: 1,

    
    }
});

export default ChallengeFriendsScreen;
