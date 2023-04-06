import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "./navigator";


type RegisterProps = {
    navigation: NavigationProp<RootStackParamList, 'Register'>
}
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        const response = await fetch('http://10.0.2.2:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });
        const data = await response.json();
        if (data.success) {
            console.log('New User added');
        } else {
            console.log('No User was registerd');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Registration</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDF2F7',
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: '#2D3748',
        width: '90%',
    },

    input: {
        height: 50,
        width: '50%',
        borderColor: '#A0AEC0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },


    registerButton: {
        width: '30%',
        backgroundColor: '#0E9CDA',
        borderRadius: 5,
        paddingVertical: 15,
        marginVertical: 5,
        shadowColor: '#104E8B',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: '20%',
    },
    registerButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
});

export default Register;
