import { View, Text } from "react-native"
import { useContext } from "react"
import GameContext from "../../contexts/GameContext"

const EndScore = ({ navigation, route }) => {
    const { state, update } = useContext(GameContext);
    const { id } = route.params;
    const game = state.find((game) => game.id === id);
    console.log(game);
    return (
        <View>
            <Text>{game.gameName}</Text>
        </View>

    )
}
export default EndScore;