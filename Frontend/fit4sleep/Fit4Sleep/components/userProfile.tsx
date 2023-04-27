import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

const UserProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState('JohnDoe');
    const [password, setPassword] = useState('password');
    const [email, setEmail] = useState('john.doe@gmail.com');

    const handleEditButtonPress = () => {
        setEditMode(true);
    };

    const handleSaveButtonPress = () => {
        setEditMode(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>My Profile</Text>
                {editMode ? (
                    <TouchableOpacity onPress={handleSaveButtonPress}>
                        <Text style={styles.headerButton}>Save</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleEditButtonPress}>
                        <Text style={styles.headerButton}>Edit</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username:</Text>
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                    ) : (
                        <Text style={styles.value}>{username}</Text>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password:</Text>
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    ) : (
                        <Text style={styles.value}>******</Text>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    ) : (
                        <Text style={styles.value}>{email}</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerButton: {
        fontSize: 18,
        color: '#007AFF',
    },
    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    value: {
        flex: 2,
        fontSize: 16,
    },
    buttonContainer: {
        marginLeft: 250,
        marginBottom: 20,
        width: 90,
        maxWidth: 200,
    },

    progressBar: {
        height: 50,
        backgroundColor: '#0E9CDA',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0E9CDA',
        borderRadius: 5
    },


});

export default UserProfile;
