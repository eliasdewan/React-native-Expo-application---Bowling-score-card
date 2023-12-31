import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CreateGame from './src/screens/componets/CreateGame';
import GameList from './src/screens/componets/GameList';
import IndexScreen from './src/screens/componets/Indexscreen';
import EditGame from './src/screens/componets/EditGame';
import EndScore from './src/screens/componets/EndsScore';
import CameraScreen from './src/screens/CameraScreen';
import PhotoScreen from './src/screens/PhotoScreen';
import GameContext, { GameProvider } from './src/contexts/GameContext';
const Tab = createBottomTabNavigator();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function GameListNav({ navigation }) {
  const { state } = useContext(GameContext);
  useEffect(() => { navigation.setOptions({ tabBarBadge: state.length > 0 ? state.length : null }) }, [state])
  return (
    <Stack.Navigator initialRouteName='ListView'>
      <Stack.Screen name="ListView" component={GameList} options={{ title: "Game Screen" }} />
      <Stack.Screen name="EditGame" component={EditGame} />
      <Stack.Screen name="EndScore" component={EndScore} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
    </Stack.Navigator>)

}

const App = () => {
  //const {state} = useContext(GameContext);
  return (
    <GameProvider>

      <NavigationContainer >
        <StatusBar style="auto" />
        <Tab.Navigator >


          { /*
          <Tab.Screen
            name="Home"
            component={IndexScreen}
            options={{
              title: 'Awesome app', // Title at the top
              tabBarLabel: 'Tab name',// Home
              //tabBarIcon : () => { return (<Ionicons name="create" size={24} color="black" />) }
              tabBarIcon: () => (<Ionicons name="tennisball" size={24} color="black" />)
            }}// Content and name are functional whats on the screen and name for naviagion
          />
          */ }

          <Tab.Screen name="List"

            options={{
              title: "Game window",
              headerShown: false,
              tabBarLabel: " List of Games",
              tabBarIcon: () => (<Ionicons name="tennisball" size={24} color="black" />)
            }}
            component={GameListNav} />

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

        </Tab.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}


export default App;