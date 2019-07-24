import React from 'react'
import Profile1 from '../../icons/profilepic.jpg'
import Profile2 from '../../icons/profilepic2.jpg'

import { View, Text, StyleSheet, Image } from 'react-native';

const MyScore = (props) => {



    const picture = Math.random() > 0.5 ? Profile1 : Profile2;

    return (

        <View style={styles.container}>
            <Image
                style={styles.profilePicture}
                source={picture}
            />
            <Text style={styles.nameItem}>
                {props.name}
            </Text>
            <Text style={styles.scoreItem}>
                {props.score}
            </Text>
        </View>
    );
}

export default MyScore;



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        backgroundColor: 'yellow'
    },
    profilePicture: {
        flexGrow: 1,
        height: 50,
        borderRadius: 100
    },
    nameItem: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 2
    },
    scoreItem: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 1
    },


});