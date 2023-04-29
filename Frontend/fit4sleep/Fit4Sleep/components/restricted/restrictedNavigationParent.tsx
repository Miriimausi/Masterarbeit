import UserProfile from "./screens/userProfile";
import SleepProfile from "./screens/sleepProfile";
import Activities from "./screens/activities/activities";
import Questionnaire from "./screens/questionnaire";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {appColorTheme} from "../../constants/colors";
import OnboardingSurvey from "./screens/onboardingSurvey/onboarding";


const RestrictedTab = createBottomTabNavigator();

function RestrictedNavigationParent() {
    return (
        <RestrictedTab.Navigator>

            <RestrictedTab.Screen name="OnboardingSurvey" options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused}) => {
                    return <FontAwesome5 name="walking" size={24} color={focused ? "#44607c" : "black"}/>
                },
            }} component={OnboardingSurvey}/>

            <RestrictedTab.Screen name="Activities" options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused}) => {
                    return <FontAwesome5 name="walking" size={24} color={focused ? "#44607c" : "black"}/>
                },
            }} component={Activities}/>
            <RestrictedTab.Screen name="Questionnaire" options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused}) => {
                    return <MaterialIcons name="question-answer" size={24} color={focused ? appColorTheme.primaryColor : "black"}/>
                },
            }} component={Questionnaire}/>
            <RestrictedTab.Screen name="Sleepprofile" options={{
                tabBarShowLabel: false,
                title: "Sleep Profile",
                tabBarIcon: ({focused}) => {
                    return <MaterialCommunityIcons name="power-sleep" size={24} color={focused ? appColorTheme.primaryColor : "black"}/>
                },
            }} component={SleepProfile}/>
            <RestrictedTab.Screen name="Profile" options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused}) => {
                    return <MaterialIcons name="settings" size={24} color={focused ? appColorTheme.primaryColor : "black"}/>
                },
            }} component={UserProfile}/>
        </RestrictedTab.Navigator>
    );
}

export default RestrictedNavigationParent;