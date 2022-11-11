import { Text, TextInput ,View,StyleSheet,Pressable} from "react-native";



const GameList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text> Yo dont play no game </Text>
            <Pressable onPress={() => navigation.navigate('Add')}><Text style={styles.goBack}> So go back home! </Text></Pressable>
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
    goBack:{
        fontSize:30,
        color:'red',
        padding:20,
    }
  });