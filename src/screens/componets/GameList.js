import { Text, TextInput, View, StyleSheet, Pressable, FlatList } from "react-native";
import { useContext } from "react";
import GameContext from "../../contexts/GameContext";
import { Ionicons ,MaterialIcons} from '@expo/vector-icons';



const GameList = ({ navigation }) => {
    const { state, remove } = useContext(GameContext);
    console.log(state, " From game list");
    return (
        <View style={styles.container}>
            <Text> Yo dont play no game </Text>
            <Pressable onPress={() => navigation.navigate('Add')}>
                <Text style={styles.goBack}>
                    So go back home!
                </Text>
            </Pressable>



            <FlatList
                data={state}
                keyExtractor={(e) => e.gameName.toString()}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => navigation.navigate('View', {
                            gameName: item.gameName,
                            date: item.date,
                        })}>

                            <View style={styles.container} >
                                <Text> {item.gameName}</Text>
                                <Text>{item.date}</Text>
                                <Text>Players :{item.numberOfPlayers}</Text>
                                <Text>Rink number: {item.rink}</Text>
                                <Text>Teams :{item.teamName}</Text>

                                <Pressable
                                    onPress={() => {
                                        remove(item.gameName)
                                    }}>
                                    <MaterialIcons name="delete" size={24} color="black" />
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBack: {
        fontSize: 30,
        color: 'red',
        padding: 20,
    }
});