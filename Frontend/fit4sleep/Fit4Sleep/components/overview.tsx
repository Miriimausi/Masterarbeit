import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    TouchableOpacity,
    LayoutAnimation,
    Animated,
    Easing, ImageBackground
} from 'react-native';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "./navigator";
import {AntDesign} from "@expo/vector-icons";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {AuthContext, AuthContextType} from "../contexts/auth-context";
type OverviewProps = {
    navigation: NavigationProp<RootStackParamList, 'Overview'>
}
const Overview = ({navigation}: OverviewProps) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedActivties, setIsExpandedActivities] = useState(false);
    const [isExpandedUserProfile, setIsExpandedUserProfile] = useState(false);
    const [isExpandedSleep, setIsExpandedSleep] = useState(false);
    const [isExpandedQuest, setIsExpanedQuest] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));
    const {isLoggedIn, login, logout} = useContext(AuthContext) as AuthContextType;

    const handleHeaderPressUserProfile = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpandedUserProfile(!isExpandedUserProfile);
        changetoUserProfile();
    };
    const handleHeaderPressActivities = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpandedActivities(!isExpandedActivties);
        changeToActivities()
    };

    const handleHeaderPressSleep = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpandedSleep(!isExpandedSleep);
    };
    const handleHeaderPressQuest = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanedQuest(!isExpandedQuest);
    };

    const changeToActivities = () => {
        navigation.navigate('Activities');
    };

    const changetoUserProfile = () => {
        navigation.navigate('UserProfile');
    };


    const runAnimation = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(runAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.profileContainer}
                onPress={handleHeaderPressUserProfile}
            >
                <View style={styles.headerContainer} >
                    <AntDesign name="user" size={30} color="#bfbfbf"/>
                    <Text style={styles.headerTitle}>User Profile</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        This section includes your personal information.
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.profileContainer}
                onPress={handleHeaderPressActivities}
            >
                <View style={styles.headerContainer}>
                    <AntDesign name="rocket1" size={30} color="#bfbfbf"/>
                    <Text style={styles.headerTitle}>Activities</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        This section shows all your activities.
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.profileContainer}
                onPress={handleHeaderPressSleep}
            >
                <View style={styles.headerContainer}>
                    <MaterialCommunityIcons name="sleep" size={30} color="#bfbfbf"/>
                    <Text style={styles.headerTitle}>Sleep Profile</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        This section shows all your sleep parameters.
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.profileContainer}
                onPress={handleHeaderPressQuest}
            >
                <View style={styles.headerContainer}>
                    <Entypo name="open-book" size={30} color="#bfbfbf"/>

                    <Text style={styles.headerTitle}>Diary</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        This diary is a written record of your personal experiences.
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.profileContainer}
                onPress={handleHeaderPressQuest}
            >
                <View style={styles.headerContainer}>
                    <MaterialCommunityIcons name="file-question-outline" size={30} color="#bfbfbf"/>

                    <Text style={styles.headerTitle}>Questionnaire</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                        Take a questionnaire to assess your sleep quality.
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    profileContainer: {
        flex: 1,
        width:'100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: 16,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    headerTitle: {
        textAlign: "left",
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        paddingRight:20
    },
    descriptionContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    descriptionText: {
        fontSize: 16,
        color: '#555',
    },
});


export default Overview;
