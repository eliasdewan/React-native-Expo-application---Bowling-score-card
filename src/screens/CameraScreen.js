import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Camera } from 'expo-camera'

const { status } = await Camera.requestCameraPermissionsAsync()

const CameraScreen = ({ navigation }) => {
    const [permission, setPermission] = useState();

    const getPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        permission(status === 'granted');
    };
    useEffect(() => {
        getPermission();
    }, []);

    if (permission === null) {
        return <Text>Awaiting Permission</Text>
    }

    if (permission === false) {
        return <Text>Acess Denied!</Text>
    }

    let camera;
    const getPicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            console.log(photo);
            navigation.navigate('PhotoScreen', { uri: photo.uri })
        }
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.subContainer}>
                <Pressable style={styles.buttonStyle}> onPress={() => { getPicture() }}</Pressable>
                <Text style={styles.textStyle}> Touch to take Picture</Text>
            </Camera>
        </View>
    );
}
export default CameraScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end'

    },
    buttonStyle: {
        flex: 0.1,
        alignItems: 'flex-end'
    },
    textStyle: {
        fontSize: 24,
        marginBottom: 15,
        color: 'yellow',
    }
});