
import { Text, TextInput, StyleSheet, View, Button, KeyboardAvoidingView, ScrollView } from "react-native";
import { useContext, useState } from "react";
import GameContext from "../../contexts/GameContext";


const EditGame = ({ navigation, route }) => {
    const { state, update } = useContext(GameContext);
    const { id } = route.params;
    const game = state.find((game) => game.id === id);
    const [gameName, setGameName] = useState(game.gameName)
    const [date, setDate] = useState(game.date);
    const [rink, setRink] = useState(game.rink);
    const [playerNames, setPlayerNames] = useState(game.playerNames);
    const [teamName, setTeamName] = useState(game.teamName);
    console.log("use staes now :", gameName, date, rink, playerNames, teamName)
    console.log(playerNames);


    return (
        <ScrollView style={styles.container}>

            <Text style={styles.text}>Game Name</Text>
            <TextInput style={styles.TextInput} placeholder="Game name" defaultValue={gameName} onChangeText={(text) => { setGameName(text); }} />
            <View style={styles.smallBoxContainer}>
                <View style={styles.smallBox}>
                    <Text>Date: </Text>
                    <TextInput style={styles.TextInput} placeholder={"date"} defaultValue={new Date().toDateString()} onChangeText={(text) => { setDate(text); }} />
                </View>
                <View style={styles.smallBox}>
                    <Text>Rink No.</Text>
                    <TextInput style={styles.TextInput} keyboardType="number-pad" placeholder="rink Number" defaultValue={rink.toString()} onChangeText={(text) => { setRink(text); }} />
                </View>
            </View>

            <Text style={styles.text}>Teams</Text>
            <View style={styles.smallBoxContainer}>

                <View style={styles.smallBox}>
                    <Text>First team name:</Text>
                    <TextInput style={styles.TextInput} placeholder="First team name" defaultValue={teamName[0]} onChangeText={(text) => { setTeamName(teamName => [text, ...teamName.slice(1)]); }} />
                </View>

                <View style={styles.smallBox}>
                    <Text style={styles.text}>VS</Text>
                </View>

                <View style={styles.smallBox}>
                    <Text>Second team name</Text>
                    <TextInput style={styles.TextInput} placeholder="Second team name" defaultValue={teamName[1]} onChangeText={(text) => { setTeamName(teamName => [...teamName.slice(0, 1), text]); }} />
                </View>
            </View>
            <Text style={styles.text}>Players</Text>
            <View style={styles.smallBoxContainer}>

                <View style={styles.smallBox}>
                    <TextInput style={styles.TextInput} placeholder="First team player" defaultValue={playerNames[0]} onChangeText={(text) => { playerNames.splice(0, 1, text); }} />
                </View>
                <View style={styles.smallBox}>
                    <Text style={styles.text}>1</Text>
                </View>
                <View style={styles.smallBox}>
                    <TextInput style={styles.TextInput} placeholder="Secon team player" defaultValue={playerNames[1]} onChangeText={(text) => { playerNames.splice(1, 1, text); }} />
                </View>
            </View>
            <View style={styles.smallBoxContainer}>
                <View style={styles.smallBox}>
                    <TextInput style={styles.TextInput} placeholder="First team player" defaultValue={playerNames[2]} onChangeText={(text) => { playerNames.splice(2, 1, text); }} />
                </View>

                <View style={styles.smallBox}>
                    <Text style={styles.text}>2</Text>
                </View>
                <View style={styles.smallBox}>
                    <TextInput style={styles.TextInput} placeholder="Secon team player" defaultValue={playerNames[3]} onChangeText={(text) => { playerNames.splice(3, 1, text); }} />
                </View>
            </View>

            <Button title="Accept" onPress={() => {
                update(game.id, gameName, date, rink, playerNames, teamName, game.end, () => navigation.pop());
                //create(gameName, date, rink, numberOfPlayers, setTeamName, () => navigation.pop());
            }} />

        </ScrollView>
    )
}
export default EditGame;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: "stretch"
    },
    TextInput: {
        padding: 10,
        borderWidth: 5,
    },
    smallBoxContainer: {
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-between",

    },
    smallBox: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"


    },
    text: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 5
    }
});