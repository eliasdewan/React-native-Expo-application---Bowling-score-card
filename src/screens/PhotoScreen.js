import React from "react";
import { View, Image, StyleSheet } from "react-native";

const PhotoScreen = ({ route }) => {
    const { uri } = route.params;
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: uri }} />
        </View>
    )
}

export default PhotoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        flex: 1,
        alignSelf: 'stretch'
    }
});