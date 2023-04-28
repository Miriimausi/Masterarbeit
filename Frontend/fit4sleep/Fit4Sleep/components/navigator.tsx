import {useContext} from "react";
import {AuthContext, AuthContextType} from "../contexts/auth-context";
import RestrictedNavigationParent from "./restricted/restrictedNavigationParent";
import PublicNavigationParent from "./public/publicNavigationParent";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Activities: undefined;

    ActivitiesDetails: undefined;
    UserProfile: undefined;
    Overview: undefined;

    SleepProfile : undefined;
    Questionnaire: undefined;
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
