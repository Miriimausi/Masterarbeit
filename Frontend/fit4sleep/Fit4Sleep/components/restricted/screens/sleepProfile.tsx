import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import axios from 'axios';
import {Icon} from 'react-native-elements';
import {appColorTheme} from "../../../constants/colors";
import {AuthContext, AuthContextType} from "../../../contexts/auth-context";

interface Question {
    id: number;
    question: string;
    type: number;
    answer: string | null;

}

const SleepProfile = () => {
    const [hoursSlept, setHoursSlept] = useState(8);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [expanded, setExpanded] = useState(false);
    const [scoreExpanded, setScoreExpanded] = useState(false);
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [sleepScore, setSleepScore] = useState<number | null>(null);
    const {userId} = useContext(AuthContext) as AuthContextType;

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


    return (
        <ScrollView style={styles.container}>
            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.headerContainer} onPress={toggleExpand}>
                    <Text style={styles.headerText}>Questions</Text>
                    <Icon
                        name={expanded ? 'minus' : 'plus'}
                        type="font-awesome"
                        color="white"
                        size={16}
                    />
                </TouchableOpacity>

                {expanded && (
                    <View style={styles.contentContainer}>
                        <Text style={styles.sectionInfoText}>
                            The Pittsburgh Sleep Quality Index (PSQI) consists of 19 self-rated questions.
                            The scoring is based only on the self-rated questions.
                            The 19 self-rated items and 5 adittional questions and are grouped into seven "component" scores, each ranging from 0 to 3
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

            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.headerContainer} onPress={toggleScoreExpand}>
                    <Text style={styles.headerText}>Sleep Score</Text>
                    <Icon
                        name={scoreExpanded ? 'minus' : 'plus'}
                        type="font-awesome"
                        color="white"
                        size={16}
                    />
                </TouchableOpacity>

                {scoreExpanded && (

                    <View style={styles.contentContainer}>

                        <Text style={styles.sectionInfoText}>
                            The index combines seven component scores to create a global score ranging from 0 to 21.
                            A global score of 0 represents no difficulties, while a score of 21 indicates severe difficulties across all areas.
                            </Text>
                        <Text style={styles.scoreText}>Sleep Score: {sleepScore}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    },
    sectionContainer: {
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: appColorTheme.primaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 80
    },
    headerText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    contentContainer: {
        padding: 16,

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
        fontWeight: 'bold',
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
        color: 'white',
        backgroundColor: appColorTheme.primaryColor,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 16,
        textAlign: 'center',
    }
});



export default SleepProfile;
