import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

interface Props {}

const UserProfile: React.FC<Props> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetch('http://10.0.2.2:5000/UserProfile/')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUsername(data.user_data.username);
                    setPassword(data.user_data.password);
                } else {
                    console.log('Failed to fetch user profile');
                }
            })
            .catch(error => console.error(error));
    }, []);


    const handleEditButtonPress = () => {
        setEditMode(true);
    };

    const handleSaveButtonPress = () => {
        setEditMode(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username:</Text>
                {editMode ? (
                    <TextInput style={styles.input} value={username} onChangeText={setUsername} />
                ) : (
                    <Text style={styles.value}>{username}</Text>
                )}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                {editMode ? (
                    <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true} />
                ) : (
                    <Text style={styles.value}>******</Text>
                )}
            </View>
            <View style={styles.buttonContainer}>
                {editMode ? (
                    <Button title="Save" onPress={handleSaveButtonPress} />
                ) : (
                    <Button title="Edit" onPress={handleEditButtonPress} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        fontSize: 18,
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        fontSize: 18,
    },
    value: {
        flex: 2,
        fontSize: 18,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        maxWidth: 200,
    },
});

export default UserProfile;
