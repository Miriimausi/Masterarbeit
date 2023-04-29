import React, {useContext, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigator';
import {AntDesign} from '@expo/vector-icons';
import {AuthContext, AuthContextType} from "../../../contexts/auth-context";
import {ImageBackground} from 'react-native';

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

    const changeToRegister = () => {
        navigation.navigate('Register');
    };

    const handleLogin = async () => {
        const loggedIn: boolean = login(username, password);
    }


    return (
        <ImageBackground
            source={require('../../../assets/background-image.png')}
            style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.inputContainer}>
                        <AntDesign name="user" size={24} color="#bfbfbf" />
                        <TextInput
                            placeholder="username"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <AntDesign name="lock" size={24} color="#bfbfbf" />
                        <TextInput
                            placeholder="password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
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
            </ScrollView>
        </ImageBackground>
    );
}

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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'white'
    },
    registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginButton: {
        width: '80%',
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

    },
    registerText: {
        fontSize: 12,
        color: 'white',
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
        color: 'white',
        alignSelf: 'center',
        marginLeft: 10,
        marginTop: 110,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "bold",

    },
});

export default Login;
