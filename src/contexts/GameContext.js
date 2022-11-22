import { useState } from "react";
import React, { useReducer ,useEffect} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = "my_super_secret_key";

const GameContext = React.createContext();
let gmaList = [];

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, gmaList);

    useEffect(() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && state.length === 0) {
                gmaList = JSON.parse(storage);
                gmaList.forEach(element => {
                    dispatch({ type: "load", payload: element });
                })
            }
        }
        loadStorage();
    }, [STORAGE_KEY])

    const addGame = (gameName, date, rink, playerNames, teamName, callback) => {
        console.log("Add game Received = ", gameName, date, rink, playerNames, teamName, callback);
        dispatch({ type: "create", payload: { gameName, date, rink, playerNames, teamName } });
        //dispatch({ type: actionTypes.create, payload: { gameName, date, rink, playerNames, setTeamName } });
        dispatch({ type: "save" });
        if (callback) { callback(); }
    }

    const deleteGame = (id, callback) => {
        dispatch({ type: "remove", payload: { id: id } });
        dispatch({ type: "save" });
        if (callback) callback();
    }

    const editGame = (id, gameName, date, rink, playerNames, teamName, end, callback) => {
        console.log("In editing context");
        console.log(gameName, date, rink, playerNames, teamName, callback);

        dispatch({ type: "edit", payload: { id, gameName, date, rink, playerNames, teamName, end } })
        dispatch({ type: "save" });
        if (callback) { callback(); }
    }
    const addScoreEnd = (id, teamIndex, score, callback) => {
        console.log({ type: "addScore", payload: { id, teamIndex, score } });
        dispatch({ type: "addScore", payload: { id, teamIndex, score } })
        dispatch({ type: "save" });
        if (callback) { callback(); }

    }
    const editScoreEnd = (id, teamIndex, score, index, callback) => {
        dispatch({ type: "editEnd", payload: { id, teamIndex, score, index } })
        dispatch({ type: "save" });
        if (callback) { callback(); }
    }
    const removeScoreEnd = (id, index, callback) => {

        dispatch({ type: "removeEnd", payload: { id, index } })
        dispatch({ type: "save" });
        if (callback) { callback(); }

    }


    return (
        <GameContext.Provider
            value={{
                state: state,
                create: addGame,
                remove: deleteGame,
                update: editGame,
                addEnd: addScoreEnd,
                editEnd: editScoreEnd,
                removeEnd: removeScoreEnd

            }}>
            {children}

        </GameContext.Provider>
    );
}

export default GameContext;

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;

        case "save":
            try {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (error) {
                console.log(error);
            } finally {
                return state;
            }
        case "load":
            return [
                ...state, {
                    id: action.payload.id,
                    gameName: action.payload.gameName,
                    date: action.payload.date,
                    rink: action.payload.rink,
                    playerNames: action.payload.playerNames,
                    teamName: action.payload.teamName,
                    end: action.payload.end
                }
            ]

        case "create":
            state.find((game) => {
                (

                    action.payload.gameName += game.gameName === action.payload.gameName ? 1 : ""
                );
            })
            return [
                ...state,
                {
                    //gameName, date, rink, playerNames, setTeamName,
                    id: Math.floor(Math.random() * 99999),
                    gameName: action.payload.gameName,
                    date: action.payload.date,
                    rink: action.payload.rink,
                    playerNames: action.payload.playerNames,
                    teamName: action.payload.teamName,
                    end: [
                    ]
                }

            ];

        case "remove":
            return state.filter((game) => game.id !== action.payload.id);

        case "edit":
            console.log("Edit");
            console.log(action);
            console.log(state);
            return state.map((game) => {
                if (game.id === action.payload.id) {
                    return action.payload;
                } else {
                    return game;
                }
            });
        case "addScore":

            console.log("printing payload");
            console.log(action);
            console.log(">>>>>");
            let score = [0, 0]
            score.splice(action.payload.teamIndex, 1, action.payload.score)
            console.log(score);

            state.find((game) => game.id === action.payload.id).end = [
                ...state.find((game) => game.id === action.payload.id).end,
                { endScore: score, photos: ["photos printed 3"] }
            ];
            console.log(state);
            return state;
        case "editEnd":
            score = [0, 0]
            score.splice(action.payload.teamIndex, 1, action.payload.score)
            console.log("the score is here" + score)
            console.log(action.payload)
            //console.log(state.find((game) => game.id === action.payload.id).end.splice(1,1,{endScore: [9,0], photos: ["photos printed 3"]}))
            state.find((game) => game.id === action.payload.id).end.splice(action.payload.index, 1, { endScore: score, photos: ["photos printed 3"] })
            return state;

        case "removeEnd":
            state.find((game) => game.id === action.payload.id).end.splice(action.payload.index, 1);
            console.log("called remove")
            return state;

        //case action: return

    }
}


// use states to create and collect text boxes
//Import context
// Item context needs item provider because it does have it function body - so is a return inside itemprovidr and provider wraps app.js
// Provider children gets passed to provider function parameter and used in item context tags when returning from provider function
// Everything using the use context will re render . anything that updates in the item provider will make evrytjing in the item context provider will rerender