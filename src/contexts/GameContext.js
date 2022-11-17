import { useState } from "react";
import React, { useReducer } from "react";

const GameContext = React.createContext();
let gmaList = [];

export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, gmaList);

    const addGame = (gameName, date, rink, numberOfPlayers, teamName, callback) => {
        console.log("Add game Received = ", gameName, date, rink, numberOfPlayers, teamName, callback);
        dispatch({ type: "create", payload: { gameName, date, rink, numberOfPlayers, teamName } });
        //dispatch({ type: actionTypes.create, payload: { gameName, date, rink, numberOfPlayers, setTeamName } });
        //dispatch({ type: actionTypes.save });
        if (callback) { callback(); }
    }

    const deleteGame = (id, callback) => {
        dispatch({ type: "remove", payload: { id: id } });
        // dispatch({ type: actionTypes.save });
        if (callback) callback();
    }

    const editGame = (id, gameName, date, rink, numberOfPlayers, teamName, end, callback) => {
        console.log("In editing context");
        console.log(gameName, date, rink, numberOfPlayers, teamName, callback);

        dispatch({ type: "edit", payload: { id, gameName, date, rink, numberOfPlayers, teamName, end } })
        if (callback) { callback(); }
    }
    const addScoreEnd = (id, teamIndex, score, callback) => {
        console.log({ type: "addScore", payload: { id, teamIndex, score } });
        dispatch({ type: "addScore", payload: { id, teamIndex, score } })
        if (callback) { callback(); }

    }


    return (
        <GameContext.Provider
            value={{
                state: state,
                create: addGame,
                remove: deleteGame,
                update: editGame,
                addEnd: addScoreEnd

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

        case "create":
            state.find((game) => {
                (

                    action.payload.gameName += game.gameName === action.payload.gameName ? 1 : ""
                );
            })
            return [
                ...state,
                {
                    //gameName, date, rink, numberOfPlayers, setTeamName,
                    id: Math.floor(Math.random() * 99999),
                    gameName: action.payload.gameName,
                    date: action.payload.date,
                    rink: action.payload.rink,
                    numberOfPlayers: action.payload.numberOfPlayers,
                    teamName: action.payload.teamName,
                    end: [
                        { endScore: [2, 0], photos: ["photos printed"] },
                        { endScore: [0, 1], photos: ["photos printed 2"] }
                    ]
                }

            ];

        case "remove":
            return state.filter((game) => game.id !== action.payload.id);

        case "edit":
            console.log("Edit");
            console.log(action);
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
            console.log(">>>>>" );
            const score = [0,0]
            score.splice(action.payload.teamIndex, 1, action.payload.score)
            console.log(score);

            state.find((game) => game.id === action.payload.id).end = [
                ...state.find((game) => game.id === action.payload.id).end,
                { endScore: score, photos: ["photos printed 3"] }
            ];
            console.log(state);
            return state;


        //case action: return

    }
}


// use states to create and collect text boxes
//Import context
// Item context needs item provider because it does have it function body - so is a return inside itemprovidr and provider wraps app.js
// Provider children gets passed to provider function parameter and used in item context tags when returning from provider function
// Everything using the use context will re render . anything that updates in the item provider will make evrytjing in the item context provider will rerender