import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Register from "./register";
import Login from "./login";
type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
}

export { RootStackParamList,  AppNavigator };
