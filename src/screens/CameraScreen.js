import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

const CameraScreen = ({ navigation, route }) => {
    const { id } = route.params;
    const [uri, setUri] = useState(route.params.uri);

    console.log(route.params)
    console.log(id);
    console.log(route)
    console.log("console logging")
    useEffect(() => {
        if (uri === "NONE") { console.log("As expected no image uri") }
        else { navigation.navigate('PhotoScreen', { id, uri }) }
    });


    const [permission, setPermission] = useState();

    const getPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status === 'granted');
    };
    useEffect(() => {
        getPermission();
    }, []);

    if (permission === null) {
        return <Text>Awaiting Permission</Text>
    }

    if (permission === false) {
        return (
            <View >
                <Text>Acess Denied! Go to phone setting,  permissions, expo app,enable camera acess </Text>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 50 }}>
                        PRESS HERE TO GO BACK
                    </Text>
                </Pressable>
            </View>
        )
    }

    let camera;
    const getPicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            console.log(photo);
            navigation.navigate('PhotoScreen', { id, uri: photo.uri });
            //navigation.goBack();
        }
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={() => navigation.goBack()}>
                    <MaterialIcons name="exit-to-app" size={40} color="red" />
                </Pressable >
            )
        })
    })

    return (

        <View style={styles.container}>
            <Camera style={styles.subContainer} ref={(ref) => { camera = ref }}>
                <Pressable style={styles.buttonStyle} onPress={() => { getPicture() }}>
                    <MaterialIcons name="camera" size={100} color="white" />
                </Pressable>
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
        alignItems: 'flex-end',


    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center'

    },
    textStyle: {
        fontSize: 24,
        marginBottom: 15,
        color: 'yellow',
    }
});