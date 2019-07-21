import React from 'react'

import { View, Text, StyleSheet } from 'react-native';

const UserScore = (props) => {

    console.log("Inside USER", props)

    if (props.me) {
        styles.container['backgroundColor'] = '#FFCA28';

    }
    return (

        <View style={styles.container}>
            <Text style={styles.indexItem}>
                {props.index}
            </Text>
            <Text style={styles.nameItem}>
                {props.name}
            </Text>
            <Text style={styles.scoreItem}>
                {props.score}
            </Text>
        </View>
    );
}

export default UserScore;



const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        backgroundColor: '#40C4FF',
        width: "100%",
        alignContent: "stretch",

    },
    indexItem: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 1
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