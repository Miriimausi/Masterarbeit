import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import axios from 'axios';


interface Question {
    id: number;
    question: string;
}
const Questionnaire = () => {
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleAnswer = (index, answer) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        console.log('Answers:', answers);
    };
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Survey</Text>
                {questions.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{question.question}</Text>
                        <View style={styles.answerContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    answers[index] === 'yes' && styles.selectedAnswer,
                                ]}
                                onPress={() => handleAnswer(index, 'yes')}
                            >
                                <Text style={styles.answerText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    answers[index] === 'no' && styles.selectedAnswer,
                                ]}
                                onPress={() => handleAnswer(index, 'no')}
                            >
                                <Text style={styles.answerText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F4F4F4',
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    questionContainer: {
        marginBottom: 32,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 16,
        color: '#555',
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    answerText: {
        fontSize: 18,
        color: '#555',
    },
    selectedAnswer: {
        backgroundColor: '#E5E5E5',
        borderColor: '#C4C4C4',
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        marginBottom: 16,
        flex: 1,
        marginHorizontal: 8,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 16,
        marginTop: 24,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Questionnaire;
