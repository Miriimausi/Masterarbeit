import { createStackNavigator } from '@react-navigation/stack';
import Overview from "./overview";
import UserProfile from "./userProfile";
import SleepProfile from "./sleepProfile";
import Activities from "./activities";
import ActivitiesDetails from "./activitiesDetails";

const RestrictedStack = createStackNavigator();

function RestrictedNavigationParent() {
    return (
        <RestrictedStack.Navigator>
            <RestrictedStack.Screen name="Overview" component={Overview}/>
            <RestrictedStack.Screen name="UserProfile" component={UserProfile}/>
            <RestrictedStack.Screen name="SleepProfile" component={SleepProfile}/>
            <RestrictedStack.Screen name="Activities" component={Activities}/>
            <RestrictedStack.Screen name="ActivitiesDetails" component={ActivitiesDetails}/>
        </RestrictedStack.Navigator>
    );
}

export default RestrictedNavigationParent;