import React from 'react'

import { View, Text, StyleSheet } from 'react-native';

const UserScore = (props) => {

    console.log("Inside USER", props)

    const color = props.index === 1 ? '#FFEA00' : (props.index === 2 ? '#E0E0E0' : props.index === 3 ? '#F57F17' : '#40C4FF');


    return (

        <View style={{ ...styles.container, backgroundColor: color }}>
            <Text style={styles.indexItem}>
                {props.index}
            </Text>
            <Text style={styles.nameItem}>
                {props.name}
            </Text>
            <Text style={styles.scoreItem}>
                {props.score}
            </Text>
        </View >
    );
}

export default UserScore;



const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        width: "80%",
        borderRadius: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,

    },
    indexItem: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 1,
        textAlign: "center"
    },
    nameItem: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 2,
        textAlign: "center"
    },
    scoreItem: {
        fontSize: 20,
        fontWeight: 'bold',
        flexGrow: 1,
        textAlign: "center"
    },


});