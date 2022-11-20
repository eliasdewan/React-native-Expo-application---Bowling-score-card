
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import { useContext, useState } from "react";
import GameContext from "../../contexts/GameContext";


const CreateGame = ({ navigation }) => {
     const [gameName, setGameName] = useState("Casual Lawn bowling");
     const [date, setDate] = useState(new Date().toDateString());
     const [rink, setRink] = useState(1);
     const [numberOfPlayers, setNumberOfPlayers] = useState(["will", "not do", "it again", "maybe"]);
     const [teamName, setTeamName] = useState(["Team 1 ", "Team 2"]);
     const { create } = useContext(GameContext);

     return (
          <View style={styles.container}>
               <Text style={styles.text}>Game Name</Text>
               <TextInput style={styles.TextInput} placeholder="Game name" defaultValue="Casual Lawn bowling" onChangeText={(text) => { setGameName(text); }} />
               <View style={styles.smallBoxContainer}>
                    <View style={styles.smallBox}>
                         <Text>Date: </Text>
                         <TextInput style={styles.TextInput} placeholder="Enter date" defaultValue={new Date().toDateString()} onChangeText={(text) => { setDate(text); }} />
                    </View>
                    <View style={styles.smallBox}>
                         <Text>Rink No.</Text>
                         <TextInput style={styles.TextInput} placeholder="Rink Number" defaultValue="1" onChangeText={(text) => { setRink(text); }} />
                    </View>

               </View>
               <View style={styles.smallBox}>
                    <Text>Number of payers (2-4):</Text>
                    <TextInput style={styles.TextInput} placeholder="Number of Players" defaultValue="2" onChangeText={(text) => { setNumberOfPlayers(text); }} />
               </View>

               <Text style={styles.text}>Teams</Text>
               <View style={styles.smallBoxContainer}>

                    <View style={styles.smallBox}>
                         <Text>First team name:</Text>
                         <TextInput style={styles.TextInput} placeholder="First team name" defaultValue="Team 1" onChangeText={(text) => { setTeamName(teamName => [text, ...teamName.slice(1)]); }} />
                    </View>

                    <View style={styles.smallBox}>
                         <Text style={styles.text}>VS</Text>
                    </View>


                    <View style={styles.smallBox}>
                         <Text>Second team name</Text>
                         <TextInput style={styles.TextInput} placeholder="Second team name" defaultValue="Team 2" onChangeText={(text) => { setTeamName(teamName => [...teamName.slice(0, 1), text]); }} />
                    </View>
               </View>
               <Text style={styles.text}>Players</Text>
               <View style={styles.smallBoxContainer}>
                    <View style={styles.smallBox}>

                         <TextInput style={styles.TextInput} placeholder="First team player" defaultValue="JH" onChangeText={(text) => { }} />
                    </View>
                    <View style={styles.smallBox}>
                         <Text style={styles.text}>1</Text>
                    </View>
                    <View style={styles.smallBox}>

                         <TextInput style={styles.TextInput} placeholder="Secon team player" defaultValue="LO" onChangeText={(text) => { }} />
                    </View>
               </View>
               <View style={styles.smallBoxContainer}>

                    <View style={styles.smallBox}>
                         <TextInput style={styles.TextInput} placeholder="First team player" defaultValue="JH" onChangeText={(text) => { }} />
                    </View>

                    <View style={styles.smallBox}>
                         <Text style={styles.text}>2</Text>
                    </View>
                    <View style={styles.smallBox}>

                         <TextInput style={styles.TextInput} placeholder="Secon team player" defaultValue="LO" onChangeText={(text) => { }} />
                    </View>
               </View>

               <Button title="CREATE GAME " onPress={() => {
                    create(gameName, date, rink, numberOfPlayers, teamName, () => navigation.navigate('List'));

                    //create(gameName, date, rink, numberOfPlayers, setTeamName, () => navigation.pop());


               }} />
          </View >
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
          //alignItems: "stretch",
          alignContent: "stretch"
          //justifyContent: 'flex-start',
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