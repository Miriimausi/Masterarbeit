import UserProfile from "./screens/userProfile";
import AllActivities from "./screens/activities/allActivities";
import Questionnaire from "./screens/questionnaire";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {appColorTheme} from "../../constants/colors";
import OnboardingSurvey from "./screens/onboardingSurvey/onboarding";
import {useContext} from "react";
import {AuthContext, AuthContextType} from "../../contexts/auth-context";
import {createStackNavigator} from "@react-navigation/stack";
import ActivitiesDetails from "./screens/activities/activitiesDetails";
import RecommendedActivities from "./screens/activities/recommendedActivities";


const RestrictedTab = createBottomTabNavigator();
const ActivitiesStack = createStackNavigator();

function RestrictedNavigationParent() {
    const {isOnBoarded} = useContext(AuthContext) as AuthContextType;



    function ActivitiesStackScreen() {
        return (
            <ActivitiesStack.Navigator>
                <ActivitiesStack.Screen name="RecommendedActivities" options={{title: 'Your Activities'}} component={RecommendedActivities} />
                <ActivitiesStack.Screen name="AllActivities" component={AllActivities} />
                <ActivitiesStack.Screen name="ActivitiesDetails" component={ActivitiesDetails} />
            </ActivitiesStack.Navigator>
        );
    }

    return (
        <>
            {
                isOnBoarded ?
                    <RestrictedTab.Navigator>
                        <RestrictedTab.Screen name="ActivityStack" options={{
                            tabBarShowLabel: false,
                            headerShown: false,
                            tabBarIcon: ({focused}) => {
                                return <MaterialCommunityIcons name="account-heart-outline" size={24}
                                                               color={focused ? appColorTheme.primaryColor : "black"}/>
                            },
                        }} component={ActivitiesStackScreen}/>
                        <RestrictedTab.Screen name="AllActivities" options={{
                            tabBarShowLabel: false,
                            title: "Explore",
                            tabBarIcon: ({focused}) => {
                                return <MaterialCommunityIcons name="basketball" size={24}
                                                               color={focused ? appColorTheme.primaryColor : "black"}/>
                            },
                        }} component={AllActivities}/>
                        <RestrictedTab.Screen name="Questionnaire" options={{
                            tabBarShowLabel: false,
                            title: "Questionnaire",
                            tabBarIcon: ({focused}) => {
                                return <MaterialCommunityIcons name="power-sleep" size={24}
                                                               color={focused ? appColorTheme.primaryColor : "black"}/>
                            },
                        }} component={Questionnaire}/>
                        <RestrictedTab.Screen name="User Profile" options={{
                            tabBarShowLabel: false,
                            title: "Sleep Profile",
                            tabBarIcon: ({focused}) => {
                                return <MaterialCommunityIcons name="account-circle" size={24}
                                                               color={focused ? appColorTheme.primaryColor : "black"}/>
                            },
                        }} component={UserProfile}/>
                    </RestrictedTab.Navigator> : <OnboardingSurvey></OnboardingSurvey>
            }
        </>

)
    ;
}

export default RestrictedNavigationParent;