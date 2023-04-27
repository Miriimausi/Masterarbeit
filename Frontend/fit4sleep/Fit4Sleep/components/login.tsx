import React, {useContext, useRef, useState} from 'react';
import {Animated, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from './navigator';
import {AntDesign} from '@expo/vector-icons';
import {KeyboardAvoidingView} from 'react-native';
import {AuthContext, AuthContextType} from "../contexts/auth-context";

type Login = {
    username: string;
    password: string;
}

type LoginProps = {
    navigation: NavigationProp<RootStackParamList, 'Login'>
}


const Login = ({navigation}: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useContext(AuthContext) as AuthContextType;

    const inputScale = useRef(new Animated.Value(1)).current;
    const changeToRegister = () => {
        navigation.navigate('Register');
    };

    const handleLogin = async () => {
        const loggedIn: boolean = login(username, password);
    }

    const handleFocus = () => {
        Animated.timing(inputScale, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleBlur = () => {
        Animated.timing(inputScale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Animated.View style={styles.container}>
                <Animated.View style={[styles.inputContainer, {transform: [{scale: inputScale}]}]}>
                    <AntDesign name="user" size={24} color="#bfbfbf"/>
                    <TextInput
                        placeholder="username"
                        value={username}
                        onChangeText={setUsername}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </Animated.View>
                <Animated.View style={[styles.inputContainer, {transform: [{scale: inputScale}]}]}>
                    <AntDesign name="lock" size={24} color="#bfbfbf"/>
                    <TextInput
                        placeholder="password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </Animated.View>
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
            </Animated.View>
        </KeyboardAvoidingView>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white'
    },
    inputIcon: {
        marginRight: 10,
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
    loginButton: {
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
    registerText: {
        fontSize: 12,
        color: '#2D3748',
        width: 'auto',
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 100,
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
        marginTop: 110,
        flexDirection: 'row',
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "bold",

    },
});

export default Login;
