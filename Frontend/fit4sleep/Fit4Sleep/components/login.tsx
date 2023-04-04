import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import {  NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigator';

type LoginProps = {
    navigation: NavigationProp<RootStackParamList, 'Login'>
}

const Login = ({ navigation }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeToRegister = () => {
        navigation.navigate('Register');
    };
    const handleLogin = async () => {
        const response = await fetch('http://10.0.2.2:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            console.log('You just logged in');
        } else {
            console.log('You could not log in');
        }
    }





    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Login</Text>
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
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                    Have you not registered yet? Click here:
                    <TouchableOpacity onPress={changeToRegister}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </Text>
            </View>
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
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: '#2D3748',
        width: '90%',
    },
    input: {
        height: 50,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white'
    },
    loginButton: {
        width: '30%',
        backgroundColor: '#1874CD',
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
    registerText: {
        fontSize: 12,
        color: '#2D3748',
        width: 'auto',
        alignSelf: 'center',
        marginLeft: 10,
        marginTop:100,
        flexDirection: 'row',
    },

    loginButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },

    registerButtonText: {
        width: 'auto',
        alignSelf: 'center',
        marginLeft: 10,
        marginTop:110,
        flexDirection: 'row',
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        fontWeight:"bold",

    },
});

export default Login;
