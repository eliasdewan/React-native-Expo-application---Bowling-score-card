import React, { useEffect } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const PhotoScreen = ({ navigation, route }) => {
    const { id } = route.params
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => {
                    navigation.popToTop();
                    navigation.navigate("CameraScreen", { id, uri: "NONE" });
                }}>
                    <MaterialIcons  name="refresh" size={40} color="red" />
                </Pressable >
            )
        })
    })


    const { uri } = route.params;
    console.log(route);
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: uri }} />
            <View style={styles.options}>
                <MaterialIcons name="cancel" size={100} color="red" onPress={() => {
                    console.log("Pressed remove photo");
                    navigation.popToTop();
                    //navigation.pop()
                    navigation.navigate("EndScore", { id, uri: "NONE" })

                }} />
                <MaterialIcons name="add-to-photos" size={100} color="green"
                    onPress={() => {
                        console.log("Pressed add");
                        navigation.popToTop();
                        //navigation.pop()
                        navigation.navigate("EndScore", { id, uri })

                    }} />

            </View>
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
    },
    options: {
        flexDirection: "row",
        alignSelf: "center"

    }
});