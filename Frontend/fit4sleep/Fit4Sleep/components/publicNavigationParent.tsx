import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Register from "./register";
import Login from "./login";

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