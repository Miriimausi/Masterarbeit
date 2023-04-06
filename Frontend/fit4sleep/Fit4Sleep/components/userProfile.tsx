import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, LayoutAnimation,Animated  } from 'react-native';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "./navigator";

type UserProps = {
    navigation: NavigationProp<RootStackParamList, 'UserProfile'>
}
const UserProfile = ({ navigation }: UserProps) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpandedActivties, setIsExpandedActivities] = useState(false);
    const [isExpandedSleep, setIsExpandedSleep] = useState(false);
    const [isExpandedQuest, setIsExpanedQuest] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState('JohnDoe');
    const [password, setPassword] = useState('password');
    const [email, setEmail] = useState('john.doe@gmail.com');
    const profileRef = useRef<View>(null);
    const [progress, setProgress] = useState(0);


    const handleHeaderPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

   const handleHeaderPressActivities= () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpandedActivities(!isExpandedActivties);
    };

    const handleHeaderPressSleep= () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpandedSleep(!isExpandedSleep);
    };
    const handleHeaderPressQuest= () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanedQuest(!isExpandedQuest);
    };

    const handleEditButtonPress = () => {
        setEditMode(true);
    };

    const handleSaveButtonPress = () => {
        setEditMode(false);
    };



    const changeToActivities = () => {
        navigation.navigate('Activities');
    };

    return (
        <View style={styles.userProfileContainer}>
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.headerContainer} onPress={handleHeaderPress}>
                    <Text style={styles.headerTitle}>User Profile</Text>
                    {isExpanded ? (
                        <Text style={styles.headerIcon}>-</Text>
                    ) : (
                        <Text style={styles.headerIcon}>+</Text>
                    )}
                </TouchableOpacity>
                <View
                    ref={profileRef}
                    style={[
                        styles.container,
                        { height: isExpanded ? undefined : 0, opacity: isExpanded ? 1 : 0 },
                    ]}
                >
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username:</Text>
                        {editMode ? (
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                            />
                        ) : (
                            <Text style={styles.value}>{username}</Text>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password:</Text>
                        {editMode ? (
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                        ) : (
                            <Text style={styles.value}>******</Text>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email:</Text>
                        {editMode ? (
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                secureTextEntry={true}
                            />
                        ) : (
                            <Text style={styles.value}>{email}</Text>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        {editMode ? (
                            <Button title="Save" onPress={handleSaveButtonPress} />
                        ) : (
                            <Button title="Edit" onPress={handleEditButtonPress} />
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.profileContainer}>
                <TouchableOpacity
                    style={styles.headerContainer}
                    onPress={handleHeaderPressActivities}
                >
                    <Text style={styles.headerTitle}>Activities</Text>
                    {isExpandedActivties ? (
                        <Text style={styles.headerIcon}>-</Text>
                    ) : (
                        <Text style={styles.headerIcon}>+</Text>
                    )}
                </TouchableOpacity>
                <View
                    ref={profileRef}
                    style={[
                        styles.container,
                        { height: isExpandedActivties ? undefined : 0, opacity: isExpandedActivties ? 1 : 0 },
                    ]}
                >
                    <View style={styles.inputContainer}>
                        <Text style={{ fontSize: 14,}}>
                            Physical activities are any movements that require energy expenditure and engage the body's muscles. Regular physical activity can improve overall health, including reducing the risk of chronic diseases, improving mood and mental health, and increasing overall fitness.
                        </Text>
                        <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                            <Button title="Show Activities" onPress={changeToActivities} />
                        </View>
                    </View>
                </View>
            </View>


            <View style={styles.profileContainer}>
                <TouchableOpacity
                    style={styles.headerContainer}
                    onPress={handleHeaderPressSleep}
                >
                    <Text style={styles.headerTitle}>Sleep</Text>
                    {isExpandedSleep ? (
                        <Text style={styles.headerIcon}>-</Text>
                    ) : (
                        <Text style={styles.headerIcon}>+</Text>
                    )}
                </TouchableOpacity>
                <View
                    ref={profileRef}
                    style={[
                        styles.container,
                        { height: isExpandedSleep ? undefined : 0, opacity: isExpandedSleep ? 1 : 0 },
                    ]}
                >
                    <View style={styles.inputContainer}>

                        <Text style={{ fontSize: 14 }}>Sleep is a vital process that gives the body time to rest and rejuvenate, promoting optimal health and performance.</Text>

                        <View style={{ position: 'absolute', bottom: 0, right: 10 }}>
                            <Button title="Show Sleep" onPress={changeToActivities} />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.profileContainer}>
                <TouchableOpacity
                    style={styles.headerContainer}
                    onPress={handleHeaderPressQuest}
                >
                    <Text style={styles.headerTitle}>Questionnaire</Text>
                    {isExpandedQuest ? (
                        <Text style={styles.headerIcon}>-</Text>
                    ) : (
                        <Text style={styles.headerIcon}>+</Text>
                    )}
                </TouchableOpacity>
                <View
                    ref={profileRef}
                    style={[
                        styles.container,
                        { height: isExpandedQuest ? undefined : 0, opacity: isExpandedQuest ? 1 : 0 },
                    ]}
                >
                    <View style={styles.inputContainer}>

                        <Text style={{ fontSize: 14 }}>The personalized sleep questionnaire is a comprehensive tool designed to help individuals assess their sleep quality and identify potential areas for improvement. By gathering detailed information about sleep habits, patterns, and behaviors, the questionnaire provides customized recommendations to help individuals achieve better sleep.</Text>

                        <View style={{ position: 'absolute', bottom: 0, right: 10 }}>
                            <Button title="Show Questionnaire" onPress={changeToActivities} />
                        </View>
                    </View>
                </View>
            </View>


            <View>
                <View style={styles.progressBar}>
                    <View style={styles.progressBarFill} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    userProfileContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#EDF2F7',
    },

    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcon: {
        fontSize: 20,
    },
    container: {
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        fontSize: 16,
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
    },
    value: {
        flex: 2,
        fontSize: 16,
    },
    buttonContainer: {
        marginLeft: 250,
        marginBottom: 20,
        width: 90,
        maxWidth: 200,
    },

    progressBar: {
        height: 50,
        backgroundColor: '#0E9CDA',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0E9CDA',
        borderRadius: 5
    },


});

export default UserProfile;
