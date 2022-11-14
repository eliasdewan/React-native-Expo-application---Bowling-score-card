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

    const deleteGame = (gameName, callback) => {
        dispatch({ type: "remove", payload: { gameName: gameName } });
        // dispatch({ type: actionTypes.save });
        if (callback) callback();
    }

    return (
        <GameContext.Provider
            value={{
                state: state,
                create: addGame,
                remove: deleteGame

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
            console.log("Create PAyload =", action.payload);
            //console.log(action.payload.gameName.match(/[%[^"]+]/))

            //let number = 0;
            state.find((game) => {
                (

                    game.gameName === action.payload.gameName,
                    action.payload.gameName += 1
                    //     number = (parseInt(action.payload.gameName.match(/[0-9]+$/)[0], 10)),
                    //  number ++,
                    //  console.log(number++),
                    //console.log("number is +1=", number),
                    // action.payload.gameName = action.payload.gameName.match(/[A-Z a-z]+/)[0],
                    //  action.payload.gameName += number,
                    //console.log("number is =", number),
                    // console.log(action.payload.gameName.match(/[A-Z a-z]+/)[0] + number),
                    //   console.log(action.payload.gameName.match(/[A-Z a-z]+/)[0]),
                    // console.log(parseInt(action.payload.gameName.match(/[0-9]+$/)[0], 10) + 1),
                    //     console.log(action.payload.gameName)

                );
            })
            //console.log(parseInt(action.payload.gameName.match(/[0-9]+$/)[0], 10)+1);
            console.log("after find no duplicate");
            return [
                ...state,
                {
                    //gameName, date, rink, numberOfPlayers, setTeamName,
                    gameName: action.payload.gameName,// Math.floor(Math.random() * 99999),// implement uuid
                    date: action.payload.date,
                    rink: action.payload.rink,
                    numberOfPlayers: action.payload.numberOfPlayers,
                    teamName: action.payload.teamName
                }

            ];

        case "remove":
            return state.filter((game) => game.gameName !== action.payload.gameName);


        //case action: return

    }
}


// use states to create and collect text boxes
//Import context
// Item context needs item provider because it does have it function body - so is a return inside itemprovidr and provider wraps app.js
// Provider children gets passed to provider function parameter and used in item context tags when returning from provider function
// Everything using the use context will re render . anything that updates in the item provider will make evrytjing in the item context provider will rerender