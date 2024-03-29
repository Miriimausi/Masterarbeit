import React, {useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigator';

type RegisterProps = {
    navigation: NavigationProp<RootStackParamList, 'Register'>;
};

const Register = ({navigation}: RegisterProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const response = await fetch('http://10.0.2.2:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        const data = await response.json();
        if (data.success) {
            console.log('New User added');
        } else {
            console.log('No User was registered');
        }
    };

    return (
        <ImageBackground source={require('../../../assets/background-image_2.jpg')} style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>User Registration</Text>

                <TextInput
                    style={styles.inputContainer}
                    placeholder="username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.inputContainer}
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: 'white',
        width: '90%',
    },
    inputContainer: {
        flexDirection: 'row',
        height: 50,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        elevation: 7,
    },
    registerButton: {
        width: '50%',
        backgroundColor: '#0E9CDA',
        borderRadius: 5,
        paddingVertical: 15,
        marginVertical: 5,
        marginRight: 35,
        shadowColor: '#104E8B',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'flex-end',
    },
    registerButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Register;
