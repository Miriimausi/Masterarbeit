import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Button, TouchableOpacity, LayoutAnimation, Animated} from 'react-native';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "./navigator";

type UserProps = {
    navigation: NavigationProp<RootStackParamList, 'SleepProfile'>
}
const SleepProfile = ({navigation}: UserProps) => {
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState('JohnDoe');
    const [password, setPassword] = useState('password');
    const [email, setEmail] = useState('john.doe@gmail.com');
    const profileRef = useRef<View>(null);


    const handleEditButtonPress = () => {
        setEditMode(true);
    };

    const handleSaveButtonPress = () => {
        setEditMode(false);
    };


    return (
        <View style={styles.userProfileContainer}>
        <View style={styles.profileContainer}>
        <Text style={styles.headerTitle}>My Profile</Text>
    <View style={styles.container}>
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
        secureTextEntry={true}
        />
    ) : (
        <Text style={styles.value}>{email}</Text>
    )}
    </View>
    <View style={styles.buttonContainer}>
        {editMode ? (
                <Button title="Save" onPress={handleSaveButtonPress}/>
) : (
        <Button title="Edit" onPress={handleEditButtonPress}/>
)}
    </View>
    </View>
    </View>
    <View>
    <View style={styles.progressBar}>
    <View style={styles.progressBarFill}/>
    </View>
    </View>
    </View>
);
};

const styles = StyleSheet.create({

    userProfileContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#eee',
    },

    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    headerIcon: {
        fontSize: 20,
    },
    container: {
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        fontSize: 16,
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
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

export default SleepProfile;
