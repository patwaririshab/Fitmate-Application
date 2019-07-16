import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'
import { Button } from 'native-base'
import { Icon } from 'react-native-elements'


const SentChallengeState = (props) => {

    const Addremovebtn = props.item.done ? (
        <TouchableHighlight style={styles.iconBtn} onPress={props.pressed}>
            <Icon
                reverse
                name='md-happy'
                type='ionicon'
                color='green'
            />
        </TouchableHighlight>

    ) : (
            <TouchableHighlight style={styles.iconBtn} onPress={props.pressed}>
                <Icon
                    reverse
                    name='md-sad'
                    type='ionicon'
                    color='red'
                />
            </TouchableHighlight>
        );
    return (
        <View style={styles.container}>

            <View style={styles.nameContainer}>
                <Text style={styles.textStyle}>{props.item.name}</Text>
            </View>
            {Addremovebtn}

        </View>





    );
}


const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#212121',
        borderBottomWidth: 1,
        // borderWidth: 1,
        padding: 10,
        height: 80,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    profilePicture: {
        height: 50,
        width: 50,
        borderRadius: 100,
    },
    nameContainer: {
        // flexGrow: 2,
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#F5FCFF',
    },
    iconBtn: {
        width: 'auto'
    },



});

export default SentChallengeState;
