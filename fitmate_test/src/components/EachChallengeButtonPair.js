import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Item, Picker, Button } from 'native-base';


const ButtonPair = (props) => {

    const button = <Button
        style={{ height: 50, flexGrow: 1 }}
        full
        success
        onPress={() => {
            props.navigator.push({
                screen: 'fitmate.CameraScreen',
                title: "Record Video",
                subtitle: undefined,
                passProps: { uri: props.uri, type: props.type, uriChanged: props.setUri, typeChanged: props.setType },
                animated: true,
                animationType: 'fade',
                backButtonTitle: undefined,
                backButtonHidden: false,
            });
        }}
    >
        <Text style={{ color: 'white' }}> {props.uri ? "Replace Video" : "Add Video"} </Text>
    </Button>

    const disableBtn = props.uri ? false : true;

    const buttonView = (
        <Button

            style={{ height: 50, flexGrow: 1 }}
            full
            success
            disabled={disableBtn}
            onPress={() => {
                //TODO Add view Video Screen
            }}
        >
            <Text style={{ color: 'white' }}> Watch Video </Text>
        </Button>
    );

    return (
        <View style={styles.container}>
            {button}
            {buttonView}

        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },


});

export default ButtonPair;

