import React from 'react'
import UserScore from '../../components/userScore'
import firebase from '../../Firebase'
import { View, FlatList, StyleSheet } from 'react-native'
class LeaderBoardScreen extends React.Component {

    state = {
        AllScores: [],
        MyScore: {},

    }

    getAllScores = () => {

        return firebase.firestore().collection('leaderboard').get().then((snapshot) => {
            const AllScores = snapshot.docs.map((doc, index) => {

                return (
                    {
                        key: doc.data().UserID,
                        name: doc.data().Name,
                        userID: doc.data().UserID,
                        score: doc.data().Score
                    }
                );
            });
            return AllScores;
        });
    }

    getMyScore = () => {
        return firebase.firestore().collection('leaderboard').doc(this.props.userID).get().then((doc) => {
            if (doc.exists) {
                return ({
                    key: doc.data().UserID,
                    name: doc.data().Name,
                    userID: doc.data().UserID,
                    score: doc.data().Score
                })
            } else {
                return null;
            }
        })
    }

    scoreSorter = (a, b) => {
        if (a.score == b.score) {
            return a.name < b.name;
        } else {
            return a.score > b.score ? -1 : 1;
        }
    }

    async componentDidMount() {

        const AllScores = await this.getAllScores();

        const MyScore = await this.getMyScore();

        AllScores.sort(this.scoreSorter);

        this.setState({
            AllScores: [...AllScores],
            MyScore: { ...MyScore },

        })

    }

    render() {


        const topTenScores = this.state.AllScores.slice(0, 10);

        const LeaderBoardDisplay = (
            <FlatList
                data={topTenScores}
                renderItem={({ item, index }) => {
                    console.log(item, index)
                    if (item.userID === this.state.MyScore.userID) {
                        return (
                            <UserScore index={index + 1} name={item.name} score={item.score} me={true} />
                        )
                    } else {
                        return (
                            <UserScore index={index + 1} name={item.name} score={item.score} me={false} />
                        )
                    }

                }

                }>
            </FlatList>
        );

        return (
            <View style={styles.container}>
                {LeaderBoardDisplay}
            </View>
        );

    }
}

export default LeaderBoardScreen;


const styles = StyleSheet.create({
    container: {

        backgroundColor: '#01579B',
        width: "100%",
        height: "100%",
        textAlign: "center"


    },


});