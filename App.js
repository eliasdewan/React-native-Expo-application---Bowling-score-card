import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import CreateGame from './src/screens/componets/CreateGame';
import GameList from './src/screens/componets/GameList';
import IndexScreen from './src/screens/componets/Indexscreen';
const Tab = createBottomTabNavigator();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={IndexScreen}
          options={{
            title: 'Awesome app', // Title at the top
            tabBarLabel: 'Tab name',// Home
            //tabBarIcon : () => { return (<Ionicons name="create" size={24} color="black" />) }
            tabBarIcon: () => (<Ionicons name="home" size={24} color="black" />)
          }}// Content and name are functional whats on the screen and name for naviagion
        />

        <Tab.Screen
          name="Add"
          component={CreateGame}
          options={{
            title: 'New Game',
            tabBarLabel: 'Add new game',
            //tabBarIcon : () => { return (<Ionicons name="create" size={24} color="black" />) }
            tabBarIcon: () => (<Ionicons name="create" size={24} color="black" />)
          }}
        />
        <Tab.Screen name="List"
          options={{
            title: "Games Played",
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