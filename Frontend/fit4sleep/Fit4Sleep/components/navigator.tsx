import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Register from "./register";
import Login from "./login";
import Activities from "./activities";
import Overview from "./Overview";
import UserProfile from "./userProfile";
import ActivitiesDetails from "./activitiesDetails";
import sleepProfile from "./sleepProfile";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Activities: undefined;

    ActivitiesDetails: undefined;
    UserProfile: undefined;
    Overview: undefined;

    sleepProfile : undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

export type OverviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Overview'>;
export type OverviewScreenRouteProp = RouteProp<RootStackParamList, 'Overview'>;

export type UserProfilesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;
export type UserProfileScreenRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

export type ActivitiesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Activities'>;
export type ActivitiesScreenRouteProp = RouteProp<RootStackParamList, 'Activities'>;

export type ActivitiesDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ActivitiesDetails'>;
export type ActivitiesDetailScreenRouteProp = RouteProp<RootStackParamList, 'ActivitiesDetails'>;

export type sleepProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'sleepProfile'>;
export type sleepProfileScreenRouteProp = RouteProp<RootStackParamList, 'sleepProfile'>;


const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Overview" component={Overview}/>
            <Stack.Screen name="UserProfile" component={UserProfile}/>
            <Stack.Screen name="ActivitiesDetails" component={sleepProfile}/>
            <Stack.Screen name="Activities" component={Activities}/>
            <Stack.Screen name="ActivitiesDetails" component={ActivitiesDetails}/>

        </Stack.Navigator>
    );
}

export { RootStackParamList,  AppNavigator };
