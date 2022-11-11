import { Text ,View,StyleSheet,Pressable} from "react-native";


function IndexScreen() {
    return (
      <View style={styles.View}>
        <Text>Main screen with the score histore
          Middle new game
        </Text>
        <Text> Home</Text >
      </View >
    );
  }

  export default IndexScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    View: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });