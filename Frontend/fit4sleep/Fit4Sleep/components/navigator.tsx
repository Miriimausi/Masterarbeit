import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
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
