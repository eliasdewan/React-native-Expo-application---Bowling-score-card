import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Image } from "react-native"
import { useContext, useState, useEffect } from "react"
import { ReactDOM } from "react"
import { MaterialIcons } from '@expo/vector-icons';
import GameContext from "../../contexts/GameContext"

const EndScore = ({ navigation, route }) => {
    const { state, addEnd, editEnd, removeEnd } = useContext(GameContext);
    const { id } = route.params;

    console.log("printing route : " + route.params)
    console.log(route.params.uri);
    console.log(route.params.id);
    let game = state.find((game) => game.id === id);
    console.log("game" + game);
    const [selectedTeam, setSelectedTeam] = useState(); // implement statr
    const [score, setScore] = useState(0);
    const [selectedEnd, setSelectedEnd] = useState();
    const [uri, setUri] = useState(route.params.uri) // NEEEEEEEEEEE
    if (route.params.uri === "NONE") { console.log("NO picture link") }
    else { console.log("heres the uri =================") }
    console.log(route.params.uri);
    console.log(selectedEnd);

    {/* Information window how editing works*/ }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => alert(
                    ">To EDIT/DELETE select an End line\n" +
                    "   While red selected \n" +
                    "   Select a team \n" +
                    "   Enter new score or keep the same \n" +
                    "   Press send from keyborad \n\n" +
                    ">To DELETE press the trash on the right while higlited\n\n" +
                    ">To CANCEL select the RED selected End\n\n"

                )}>
                    <MaterialIcons name="edit" size={40} color="red" />
                </Pressable >
            )
        })
    })

    const sendKeyboard = () => {
        console.log("pressed submit");
        console.log(game, selectedTeam, score);
        if (selectedTeam === (undefined)) {
            alert("Select a team");
        }
        else if (score === "" || !score > 0) { alert("Trype score again") }
        else {
            if (selectedEnd === undefined) {
                console.log("Score ADD !!!!!!!!!!!!!!!!!!!!!!!!!")
                addEnd(id, selectedTeam, score, uri);
                setUri("NONE");
            }
            else {
                console.log(selectedEnd);
                console.log("Score EDIT ============ !!!!!!!!!!!!!!!!!!!!!!!!!")

                console.log(id, selectedTeam, score, selectedEnd, uri);
                editEnd(id, selectedTeam, score, selectedEnd, uri);
                setSelectedEnd();
                setUri("NONE");
            }
            setScore(0);
            setSelectedTeam();
        }
    }

    return (
        <View style={styles.scoreBoxContainer}>
            <Text style={styles.scoreText}>{game.gameName}</Text>
            {/*<Text>{selectedEnd}</Text>*/}

            <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>Total</Text>
                <Text style={styles.scoreText}>Score</Text>
                <Text style={styles.scoreText}>Ends</Text>
                <Text style={styles.scoreText}>Score</Text>
                <Text style={styles.scoreText}>Total</Text>
            </View>
            <FlatList

                data={game.end}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <Pressable onPress={() => {
                                if (selectedEnd === index) {
                                    setSelectedEnd(null);
                                    setSelectedTeam();
                                    setScore(0);
                                }
                                else {
                                    console.log(index);
                                    setSelectedEnd(index);
                                    setScore(item.endScore.find(e => e > 0));
                                    setSelectedTeam(item.endScore[0] > item.endScore[1] ? 0 : 1);
                                    if (item.photos != "NONE") { setUri(item.photos) }
                                }
                            }}>{/* for editing end scores , higlights the team and  */}
                                <View style={[styles.scoreBox, selectedEnd === index ? { backgroundColor: "red" } : {}]}>
                                    <Text style={styles.scoreText}> {game.end.slice(0, index + 1).reduce((partSum, score) => partSum + score.endScore[0], 0)}</Text>
                                    <Text style={styles.scoreText}>{item.endScore[0]}</Text>
                                    <Text style={styles.scoreText}>end {index}<MaterialIcons name="image" size={game.end[index].photos === "NONE" ? 0 : 18} color="black" /></Text>
                                    <Text style={styles.scoreText}>{item.endScore[1]}</Text>
                                    <Text style={styles.scoreText}>{game.end.slice(0, index + 1).reduce((partSum, score) => partSum + score.endScore[1], 0)}</Text>
                                </View>
                            </Pressable>
                            <View style={[styles.scoreBox, { alignSelf: "center", display: selectedEnd === index ? "flex" : "none" }]}>
                                <Text style={styles.scoreText}> Image</Text>
                                <MaterialIcons name="image-not-supported" size={game.end[index].photos === "NONE" ? 0 : 48} color="black" onPress={() => { setUri("NONE"); alert("send from keyboard to condirm edit Image remove")}} />
                                <Text style={styles.scoreText}> Remove</Text>
                                <MaterialIcons onPress={() => { removeEnd(id, index); setScore(0); setSelectedTeam(); setSelectedEnd(); }} name="delete" size={48} color="black" />
                                <Text style={styles.scoreText}> End</Text>
                            </View>
                        </View>

                    )
                }}

            />
            { /*    Score total displayer*/}
            <View style={styles.scoreBox}>
                <Text style={styles.scoreText}>{game.end.reduce((partSum, score) => partSum + score.endScore[1], 0)}</Text>
                <Text style={styles.scoreText}>Total</Text>
                <Text style={styles.scoreText}>{game.end.reduce((partSum, score) => partSum + score.endScore[1], 0)}</Text>
            </View>
            <Text style={styles.scoreBox}>Select a scoring team , enter score , press end on keyboard</Text>
            <View style={styles.optionBoxContainer} >
                { /*    Team selector boxes */}
                <Text
                    onPress={() => { setSelectedTeam(0) }}
                    style={[styles.optionBox, { backgroundColor: selectedTeam === 0 ? 'green' : 'white' }]}>
                    {game.teamName[0]}
                </Text>
                <Text
                    onPress={() => { setSelectedTeam(1) }}
                    style={[styles.optionBox, { backgroundColor: selectedTeam === 1 ? 'green' : 'white' }]}>
                    {game.teamName[1]}
                </Text>
            </View>
            <View style={styles.optionBoxContainer}>
                { /*    Score input boxes   */}
                <TextInput
                    keyboardType="number-pad"
                    autoFocus={true}
                    placeholder={score.toString()}
                    returnKeyType="send"
                    maxLength={1}
                    onChangeText={text => setScore(Number(text))}
                    onSubmitEditing={() => { sendKeyboard() }}
                    style={[styles.TextInput, styles.inputScore]} />
                <MaterialIcons style={{ display: "flex" }} name={uri === "NONE" ? "camera" : "zoom-out-map"} size={70} color="black" onPress={() => navigation.navigate("CameraScreen", { id, uri })} />
                <Image style={styles.imageStyle} source={{ uri: uri }} />
                {/*  <Image source={{ uri }} /> */}
            </View>
        </View >


    )
}
export default EndScore;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInput: {
        padding: 10,
        borderWidth: 5,
        margin: 2,
    },
    optionBoxContainer: {
        flexDirection: "row",
        padding: 10,
        alignSelf: "center",

    },
    optionBox: {
        fontSize: 20,
        padding: 20,
        margin: 10,
        borderWidth: 5,
        borderColor: "lightblue",
        borderRadius: 10,
        flex: 1,
        textAlign: "center",


    },
    inputScore: {
        width: 200,
        alignSelf: "center",
        textAlign: "center"
    },
    scoreBox: {
        flexDirection: 'row',
        justifyContent: "space-evenly",



    },
    scoreText: {
        fontSize: 20,
        textAlign: "center",
    },
    scoreBoxContainer: {
        flex: 1,
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "black",
    },
    imageStyle: {
        flex: 1,
        alignSelf: 'stretch'
    },

});