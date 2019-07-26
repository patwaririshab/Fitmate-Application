import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Item, Picker, Button } from 'native-base';
import Toast from 'react-native-root-toast';


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
                if (props.uri === "") {
                  const toast = Toast.show('You must add a video!', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    backgroundColor: "red"
                  });
                } else {
                  props.navigator.push({
                    screen: 'fitmate.WatchVideoScreen',
                    title: "Watch Video",
                    subtitle: undefined,
                    passProps: {
                      Exercise: props.ExerciseNum,
                      Number: props.number,
                      DownloadURL:props.uri,

                    },
                    animated: true,
                    animationType: 'fade',
                    backButtonTitle: undefined,
                    backButtonHidden: false,
                  });  
                }
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

