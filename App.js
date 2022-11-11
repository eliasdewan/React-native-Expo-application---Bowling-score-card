import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import CreateGame from './src/screens/componets/CreateGame';
import GameList from './src/screens/componets/GameList';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();








function HomeScreen() {
  return (
    <View style={styles.View}>
      <Text>Main screen with the score histore
        Middle new game
      </Text>
      <Text> Home</Text >
    </View >
  );
}
function Add({ navigation }) {
  return (

      <View style={styles.View}>
        <Button title='New Game' onPress={() => navigation.navigate('Create')} />
      </View >
    
  );
}
function Addnav({ navigation }) {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Create" component={CreateGame} />
        
      </Stack.Navigator>
    
  );
}


const App = () => {

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Awesome app', // Title at the top
            tabBarLabel: 'Tab name',// Home
            //tabBarIcon : () => { return (<Ionicons name="create" size={24} color="black" />) }
            tabBarIcon: () => (<Ionicons name="home" size={24} color="black" />)
          }}// Content and name are functional whats on the screen and name for naviagion
        />

        <Tab.Screen
          name="Add"
          component={Addnav}
          options={{
            title: 'Adding screen',
            tabBarLabel: 'Add new game',
            //tabBarIcon : () => { return (<Ionicons name="create" size={24} color="black" />) }
            tabBarIcon: () => (<Ionicons name="create" size={24} color="black" />)
          }}
        />
        <Tab.Screen name="List"
          options={{
            title:"Games Played",
            tabBarBadge: "Loser",
            tabBarLabel: " List of Games",
            tabBarIcon: () => (<Ionicons name="list" size={24} color="black" />)
          }}
          component={GameList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;


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
