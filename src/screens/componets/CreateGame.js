
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import { useContext, useState } from "react";
import GameContext from "../../contexts/GameContext";


const CreateGame = ({ navigation }) => {
     const [gameName, setGameName] = useState("Casual Lawn bowling");
     const [date, setDate] = useState(new Date().toDateString());
     const [rink, setRink] = useState(1);
     const [numberOfPlayers, setNumberOfPlayers] = useState(2);
     const [teamName, setTeamName] = useState(["Team 1 ","Team 2"]);
     const { create } = useContext(GameContext);

     return (
          <View>
               <Text>Customize game name:</Text>
               <TextInput style={styles.TextInput} placeholder="Game name" defaultValue="Casual Lawn bowling" onChangeText={(text) => { setGameName(text); }} />
               <Text>Customize game date: </Text>
               <TextInput style={styles.TextInput} placeholder="Enter date" defaultValue={new Date().toDateString()} onChangeText={(text) => { setDate(text); }} />
               <Text>Rink number:</Text>
               <TextInput style={styles.TextInput} placeholder="Rink Number" defaultValue="1" onChangeText={(text) => { setRink(text); }} />
               <Text>Select number of payers (2-4):</Text>
               <TextInput style={styles.TextInput} placeholder="Number of Players" defaultValue="2" onChangeText={(text) => { setNumberOfPlayers(text); }} />
               <Text>Customize first team name:</Text>
               <TextInput style={styles.TextInput} placeholder="First team name" defaultValue="Team 1" onChangeText={(text) => { setTeamName(teamName => [...teamName, text]); }} />
               <Text>Customize second team name</Text>
               <TextInput style={styles.TextInput} placeholder="Second team name" defaultValue="Team 2" onChangeText={(text) => { setTeamName(teamName => [...teamName, text]); }} />

               <Button title="CREATE GAME " onPress={() => {
                    create(gameName, date, rink, numberOfPlayers, teamName);
                    //create(gameName, date, rink, numberOfPlayers, setTeamName, () => navigation.pop());


               }} />
          </View>
     )
}
export default CreateGame;

function Addnav({ navigation }) {
     return (

          <Stack.Navigator>
               <Stack.Screen name="Add" codamponent={Add} />
               <Stack.Screen name="Create" component={CreateGame} />

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