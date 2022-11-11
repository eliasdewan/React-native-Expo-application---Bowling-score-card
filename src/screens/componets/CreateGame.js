
import { Text, TextInput, StyleSheet, View } from "react-native";


const CreateGame = ({ navigation }) => {
     return (<View>
          <Text>Customize game name:</Text>
          <TextInput style={styles.TextInput} placeholder="Game name" defaultValue="Casual Lawn bowling"></TextInput>
          <Text>Customize game date: </Text>
          <TextInput style={styles.TextInput} placeholder="Enter date" default value={new Date().toDateString()}></TextInput>
          
          <Text>Select number of payers (2-4):</Text>
          <TextInput style={styles.TextInput} placeholder="Number of Players" defaultValue="2"></TextInput>
          <Text>Customize first team name:</Text>
          <TextInput style={styles.TextInput} placeholder="First team name" defaultValue="Team 1 " ></TextInput>
          <Text>Customize second team name</Text>
          <TextInput style={styles.TextInput} placeholder="Second team name"defaultValue="Team 2"></TextInput>


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