import { Text, TextInput, View, StyleSheet, Pressable, FlatList } from "react-native";
import { useContext } from "react";
import GameContext from "../../contexts/GameContext";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
//import EditGame from "./EditGame";


const GameList = ({ navigation }) => {
    const { state, remove } = useContext(GameContext);
    
    console.log(state, " From game list");
    {
        if (state.length < 1) {
            return (
                <View >
                    <Text style={styles.goBack}> Yo dont have any game </Text>
                    <Pressable onPress={() => navigation.navigate('Add')}>
                        <Text style={styles.goBack}>
                            GO BACK HOME
                        </Text>
                    </Pressable>
                </View>
            )
        }
    }
    return (
        <View >


            <FlatList
                data={state}
                keyExtractor={(game) => game.id.toString()}
                renderItem={({ item }) => {


                    return (
                        // <Pressable onPress={() => navigation.navigate("EditGame", { id: item.id })}>
                        <Pressable onPress={() => navigation.navigate("EndScore", { id: item.id })}>
                            <View style={styles.container} >
                                <View stle={styles.listItem}>
                                    <Text> {item.gameName}</Text>
                                    <Text>{item.date}</Text>
                                    <Text>Players :{item.numberOfPlayers}</Text>
                                    <Text>Rink number: {item.rink}</Text>
                                    <Text>Teams :{item.teamName}</Text>
                                </View>


                                <Pressable onPress={() => navigation.navigate("EditGame", { id: item.id })}>
                                    <MaterialIcons name="edit" size={48} color="black" />
                                </Pressable>

                                <Pressable
                                    onPress={() => {
                                        remove(item.id)
                                    }}>
                                    <MaterialIcons name="delete" size={48} color="black" />
                                </Pressable>
                            </View >
                        </Pressable>
                    )
                }}
            />
        </View>

    )
}
export default GameList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#fff',
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom:10,
        borderBottomWidth:1

    },
    listItem: {
        flexDirection: "column"

    },
    goBack: {
        fontSize: 30,
        color: 'teal',
        padding: 20,
    }
});