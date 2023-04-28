import { createStackNavigator } from '@react-navigation/stack';
import Register from "./screens/register";
import Login from "./screens/login";

const PublicStack = createStackNavigator();

function PublicNavigationParent() {
    return (
        <PublicStack.Navigator>
            <PublicStack.Screen options={{headerShown:false}} name="Login" component={Login} />
            <PublicStack.Screen name="Register" component={Register} />
        </PublicStack.Navigator>
    );
}

export default PublicNavigationParent ;