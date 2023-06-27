import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import axios from 'axios';

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

    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire')
            .then((response) => {
                setQuestions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get('http://10.0.2.2:5000/Questionnaire/answers')
            .then((response) => {
                const fetchedAnswers = response.data;
                const updatedQuestions = questions.map((question) => {
                    const fetchedAnswer = fetchedAnswers.find((answer: any) => answer.questionId === question.id);
                    if (fetchedAnswer) {
                        return { ...question, answer: fetchedAnswer.answerText };
                    } else {
                        return question;
                    }
                });
                setQuestions(updatedQuestions);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (

        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.headerTitle}>My Sleep Profile</Text>
                <ScrollView style={styles.scrollContainer}>
                    <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
                        <Text style={styles.expandButtonText}>{expanded ? 'Collapse All' : 'Your Sleepquality Questions'}</Text>
                    </TouchableOpacity>
                    {expanded && (
                        <View style={styles.questionContainer}>
                            {questions.map((question) => (
                                <View key={question.id} style={styles.questionContainer}>
                                    <TouchableOpacity>
                                        <Text style={styles.questionText}>
                                            {`Question ${question.id}: ${question.question}`}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.answerText}>{`Answer: ${question.answer || '-'}`}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#fff',
        },
        profileContainer: {
            flex: 1,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
        },
        scrollContainer: {
            flex: 1,
        },
        expandButton: {
            backgroundColor: '#293e7d',
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginVertical: 16,
            borderRadius: 8,
            height: 60,
        },
        expandButtonText: {
            fontSize: 16,
            fontWeight: 'bold',
            color:'white'
        },
    questionContainer: {
        marginBottom: 16,
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    answerText: {
        fontSize: 14,
        color: '#555',
    },
});

export default SleepProfile;
