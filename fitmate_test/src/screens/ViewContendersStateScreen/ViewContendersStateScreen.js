import React from 'react';
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


    return (
        <View style={styles.overallcontainer}>
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
    }
});

export default ChallengeFriendsScreen;
