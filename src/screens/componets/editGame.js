
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import { useContext, useState } from "react";
import GameContext from "../../contexts/GameContext";


const EditGame = ({ navigation, route }) => {
    const { state, update } = useContext(GameContext);
    const [gameName, setGameName] = useState(route.params);
    const game = state.find((game) => game.gameName === gameName);
    console.log("insidede edit game");
    console.log(route);
    console.log(navigation);
    const [date, setDate] = useState(game.date);
    const [rink, setRink] = useState(game.rink);
    const [numberOfPlayers, setNumberOfPlayers] = useState(game.numberOfPlayers);
    const [teamName, setTeamName] = useState(game.teamName);


    return (
        <View>
            <Text>Customize game name:</Text>
            <TextInput style={styles.TextInput} placeholder="Game name" defaultValue={gameName} onChangeText={(text) => { setGameName(text); }} />
            <Text>Customize game date: </Text>
            <TextInput style={styles.TextInput} placeholder="Enter date" defaultValue={date} onChangeText={(text) => { setDate(text); }} />
            <Text>Rink number:</Text>
            <TextInput style={styles.TextInput} placeholder="Rink Number" defaultValue={rink} onChangeText={(text) => { setRink(text); }} />
            <Text>Select number of payers (2-4):</Text>
            <TextInput style={styles.TextInput} placeholder="Number of Players" defaultValue={numberOfPlayers} onChangeText={(text) => { setNumberOfPlayers(text); }} />
            <Text>Customize first team name:</Text>
            <TextInput style={styles.TextInput} placeholder="First team name" defaultValue={teamName[0]} onChangeText={(text) => { setTeamName(teamName => teamName[0] = text); }} />
            <Text>Customize second team name</Text>
            <TextInput style={styles.TextInput} placeholder="Second team name" defaultValue={teamName[1]} onChangeText={(text) => { setTeamName(teamName => teamName[0] = text); }} />

            <Button title="CONFIRM EDIT " onPress={() => {
                update(gameName, date, rink, numberOfPlayers, teamName, () => navigation.goBack());
                () => navigation.navigate('List');
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