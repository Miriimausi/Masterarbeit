import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Register from "./register";
import Login from "./login";
import Activities from "./activities";
import Overview from "./overview";
import UserProfile from "./userProfile";
import ActivitiesDetails from "./activitiesDetails";
import SleepProfile from "./sleepProfile";
import {useContext} from "react";
import {AuthContext, AuthContextType} from "../contexts/auth-context";
import RestrictedNavigationParent from "./restrictedNavigationParent";
import PublicNavigationParent from "./publicNavigationParent";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Activities: undefined;

    ActivitiesDetails: undefined;
    UserProfile: undefined;
    Overview: undefined;

    SleepProfile : undefined;
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

export type SleepProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SleepProfile'>;
export type SleepProfileScreenRouteProp = RouteProp<RootStackParamList, 'SleepProfile'>;


const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
    const {isLoggedIn} = useContext(AuthContext) as AuthContextType;

    return (

        <>
            {
                isLoggedIn ?
                    <RestrictedNavigationParent />: <PublicNavigationParent />
            }
        </>
    );
}

export { RootStackParamList,  AppNavigator };
