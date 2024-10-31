import { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const handleLogin = () => {
        console.log('username:', username);
        console.log('password:', password);
        console.log('remember:', remember);
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username,
                    password
                })
            ).catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) =>
                console.log('Could not delete user info', error)
            );
        }
    };

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.password);
                setRemember(true);
            }
        });
    }, []);

    const getImageFromCamera = async () => {
        const cameraPermissions = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermissions.granted) {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!capturedImage.canceled) {
                processImage(capturedImage.assets[0].uri);
            }
        }
    };

    const getImageFromGallery = async () => {
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryPermissions.granted) {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!capturedImage.canceled) {
                console.log(capturedImage.assets[0]);
                processImage(capturedImage.assets[0].uri);
            }
        }
    };

    const processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri,
            [{ resize: { width: 400, height: 400 } }],
            { format: ImageManipulator.SaveFormat.PNG }
        );
        console.log(processedImage);
        setImageUrl(processedImage.uri);

        // Bonus Task: Save to media library
        await MediaLibrary.saveToLibraryAsync(processedImage.uri);
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(text) => setUsername(text)}
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox
                title='Remember Me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title='Login'
                    color='#5637DD'
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => getImageFromCamera()}
                    title='Camera'
                    color='#5637DD'
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => getImageFromGallery()}
                    title='Gallery'
                    color='#5637DD'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    }
});

export default LoginScreen;
