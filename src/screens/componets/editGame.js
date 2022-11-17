
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import { useContext, useState } from "react";
import GameContext from "../../contexts/GameContext";


const EditGame = ({ navigation, route }) => {
    const { state, update } = useContext(GameContext);
    const { id } = route.params;
    const game = state.find((game) => game.id === id);
    const [gameName, setGameName] = useState(game.gameName)
    const [date, setDate] = useState(game.date);
    const [rink, setRink] = useState(game.rink);
    const [numberOfPlayers, setNumberOfPlayers] = useState(game.numberOfPlayers);
    const [teamName, setTeamName] = useState(game.teamName);
    console.log("use staes now :", gameName, date, rink, numberOfPlayers, teamName)


    return (
        <View>
            <Text>Customize game name:</Text>
            <TextInput style={styles.TextInput} placeholder="Game name" defaultValue={gameName} onChangeText={(text) => { setGameName(text); }} />
            <Text>Customize game date: </Text>
            <TextInput style={styles.TextInput} placeholder="Enter date" defaultValue={date} onChangeText={(text) => { setDate(text); }} />
            <Text>Rink number:</Text>
            <TextInput style={styles.TextInput} placeholder="Rink Number" defaultValue={rink.toString()} onChangeText={(text) => { setRink(text); }} />
            <Text>Select number of payers (2-4):</Text>
            <TextInput style={styles.TextInput} placeholder="Number of Players" defaultValue={numberOfPlayers.toString()} onChangeText={(text) => { setNumberOfPlayers(text); }} />
            <Text>Customize first team name:</Text>
            <TextInput style={styles.TextInput} placeholder="First team name" defaultValue={teamName[0]} onChangeText={(text) => { setTeamName(list => [text, ...teamName.slice(1)]); }} />
            <Text>Customize second team name</Text>
            <TextInput style={styles.TextInput} placeholder="Second team name" defaultValue={teamName[1]} onChangeText={(text) => { setTeamName(list => [...teamName.slice(0, 1), text]); }} />

            <Button title="Accept" onPress={() => {
                update(game.id, gameName, date, rink, numberOfPlayers, teamName, game.end, () => navigation.pop());
                //create(gameName, date, rink, numberOfPlayers, setTeamName, () => navigation.pop());
            }} />
        </View>
    )
}
export default EditGame;

function Addnav({ navigation }) {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Add" codamponent={Add} />
            <Stack.Screen name="Create" component={EditGame} />

        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextInput: {
        padding: 10,
        borderWidth: 5,
        margin: 2,
    }
});