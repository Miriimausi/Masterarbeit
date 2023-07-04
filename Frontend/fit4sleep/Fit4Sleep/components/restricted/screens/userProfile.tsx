import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import axios from "axios";
import {AuthContext, AuthContextType} from "../../../contexts/auth-context";
import {appColorTheme} from "../../../constants/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Question {
    id: number;
    question: string;
    type: number;
    answer: string | null;

}

const UserProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const {userId, username, password, email} = useContext(AuthContext) as AuthContextType;
    const [questions, setQuestions] = useState<Question[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [scoreExpanded, setScoreExpanded] = useState(false);
    const [preferencesExpanded, setPreferencesExpanded] = useState(false);
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [sleepScore, setSleepScore] = useState<number | null>(null);
    const [timeAvailability, setTimeAvailability] = useState<number | null>(null);
    const [trainingPreference, setTrainingPreference] = useState<number | null>(null);
    const [intensityPreference, setIntensityPreference] = useState<number | null>(null);
    const [durationPreference, setDurationPreference] = useState<number | null>(null);
    const [skillPreference, setSkillPreference] = useState<number | null>(null);
    const [socialPreference, setSocialPreference] = useState<number | null>(null);
    const [locationPreference, setLocationPreference] = useState<number | null>(null);
    const [emotionalPreference, setEmotionalPreference] = useState<number | null>(null);

    const handleEditButtonPress = () => {
        setEditMode(true);
    };

    const handleSaveButtonPress = () => {
        setEditMode(false);
    };

    const handleSelectImage = () => {
        const options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };


    };

    useEffect(() => {
        axios
            .get(`http://10.0.2.2:5000/UserProfile/${userId}`)
            .then((response) => {
                setUserProfile(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://10.0.2.2:5000/Antecedents/getPreferences/${userId}`)
            .then((response) => {
                setIntensityPreference(response.data.intensityPreference);
                setTrainingPreference(response.data.trainingPreference);
                setTimeAvailability(response.data.timeAvailability);
                setDurationPreference(response.data.durationPreference);
                setSkillPreference(response.data.skillPreference);
                setSocialPreference(response.data.socialPreference);
                setLocationPreference(response.data.locationPreference);
                setEmotionalPreference(response.data.emotionalPreference);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/all')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`http://10.0.2.2:5000/Antecedents/getScore/${userId}`)
            .then((response) => {
                setSleepScore(response.data.sleepScore);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const toggleScoreExpand = () => {
        setScoreExpanded(!scoreExpanded);
    };
    const togglePreferencesExpand = () => {
        setPreferencesExpanded(!preferencesExpanded);
    };
    const showInfo = () => {
        alert('Heart rate zone limits indicate in which heart rate zone the training is most effective. The values vary from very light to maximum depending on the training intensity.');
    };

    return (


        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileHeaderContainer}>
                    <Text style={styles.headerTitle}>My Profile</Text>
                    {editMode ? (
                        <TouchableOpacity onPress={handleSaveButtonPress}>
                            <Text style={styles.headerButton}>Save</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleEditButtonPress}>
                            <Text style={styles.headerButton}>Edit</Text>
                        </TouchableOpacity>
                    )}

                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username:</Text>


                    <Text style={styles.value}>{username}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password:</Text>

                    <Text style={styles.value}>******</Text>

                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>

                    <Text style={styles.value}>{email}</Text>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="schedule" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{timeAvailability}</Text>
                        </View>
                    </View>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="directions-run" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{trainingPreference}</Text>
                        </View>
                    </View>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="bolt" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{intensityPreference}</Text>
                        </View>
                    </View>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="more-time" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{durationPreference}</Text>
                        </View>
                    </View>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="call-made" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{skillPreference}</Text>
                        </View>
                    </View>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="groups" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{socialPreference}</Text>
                        </View>
                    </View>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="person-pin" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{locationPreference}</Text>
                        </View>
                    </View>
                    <View style={styles.preferencesContainer}>
                        <View style={styles.preferenceItem}>
                            <Icon name="sentiment-satisfied" size={30} color="#0E9CDA"/>
                            <Text style={styles.preferenceText}>{emotionalPreference}</Text>
                        </View>
                    </View>
                </View>


                <TouchableOpacity style={styles.headerContainer} onPress={toggleScoreExpand}>
                    <Text style={styles.headerText}>Sleep Score</Text>
                    <Icon
                        name={scoreExpanded ? 'close' : 'add'}
                        color="white"
                        size={16}
                    />
                </TouchableOpacity>

                {scoreExpanded && (

                    <View style={styles.contentContainer}>
                        <Text style={styles.scoreText}> Your Score {sleepScore}</Text>
                        <Text style={styles.preferenceText}>
                            The index combines seven component scores to create a global score ranging from 0 to 21.
                            A global score of 0 represents no difficulties, while a score of 21 indicates severe
                            difficulties across all areas.
                        </Text>


                    </View>
                )}


                <TouchableOpacity style={styles.headerContainer} onPress={toggleExpand}>
                    <Text style={styles.headerText}>Questions</Text>
                    <Icon
                        name={scoreExpanded ? 'close' : 'add'}
                        color="white"
                        size={16}
                    />
                </TouchableOpacity>

                {expanded && (
                    <View style={styles.contentContainer}>
                        <Text style={styles.preferenceText}>
                            The Pittsburgh Sleep Quality Index (PSQI) consists of 19 self-rated questions.
                            The scoring is based only on the self-rated questions.
                            The 19 self-rated items and 5 adittional questions are grouped into seven "component"
                            scores, each ranging from 0 to 3
                            points.
                        </Text>
                        {questions.map((question) => (
                            <View key={question.id} style={styles.questionContainer}>
                                <Text style={styles.questionText}>{question.question}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>


        </ScrollView>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        width: '100%',
    },
    profileHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerButton: {
        fontSize: 14,
        color: '#0E9CDA',
    },
    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },


    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,

    },
    label: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',

    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
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


    sectionContainer: {
        backgroundColor: 'white',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
        backgroundColor: '#0E9CDA',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 50,
        elevation: 2,
    },
    headerText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',


    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom:50,
    },
    sectionInfoText: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        marginBottom: 16,
    },
    questionContainer: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 4,
    },

    answerContainer: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    answerText: {
        fontSize: 14,
        color: '#555',
    },
    scoreText: {
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 16,
        textAlign: 'left',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 50,
        elevation: 5,
    },


    preferencesContainer: {
        width: '45%', // Adjust the width as needed
        backgroundColor: 'white',
        height: '25%',
        padding: 10,
        borderRadius: 5,
        elevation: 5, // Add elevation for a light shadow effect
        marginBottom: 10, // Add margin bottom to create space between rows
    },

    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    preferenceText: {
        marginLeft: 15,

    },
});

export default UserProfile;
