import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './components/navigator';
import {AuthProvider} from "./contexts/auth-context";

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <AppNavigator/>
            </AuthProvider>
        </NavigationContainer>

    );
}