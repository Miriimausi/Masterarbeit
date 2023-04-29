import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import {appColorTheme} from "../../../constants/colors";


interface Question {
    id: number;
    question: string;
}

const Questionnaire = () => {
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionStep, setQuestionStep] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
    const [progressInPercent, setProgressInPercent] = useState<number>(0)


    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typeone')
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
        setCurrentQuestion(questions[questionStep]);
    }, [questionStep, questions])


    const handleAnswer = (index: number, answer: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const progress: number = 1 / (questions.length - 1);
        setProgressInPercent(progressInPercent + progress)

        if (questionStep < questions.length - 1) {
            setQuestionStep(questionStep + 1);
        }

        if (questionStep === questions.length -1) {
            setQuestionStep(0);
            setProgressInPercent(0);
        }


    };


    const Question = (question: Question) => {
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.question}</Text>
                <View style={styles.answerContainer}>
                    <TouchableOpacity
                        style={
                            {
                                backgroundColor: appColorTheme.primaryColor,
                                borderRadius: 5,
                                width: 120,
                                height: 42,
                                justifyContent:"center",
                                alignItems:"center"
                            }
                        }
                    >
                        <Text style={{color: "white", fontSize: 16, fontWeight:"bold" }}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={
                            {
                                marginLeft: 12,
                                borderWidth: 1,
                                borderColor:appColorTheme.primaryColor,
                                borderRadius: 5,
                                width: 120,
                                height: 42,
                                justifyContent:"center",
                                alignItems:"center"
                            }
                        }
                    >
                        <Text style={{color: appColorTheme.primaryColor, fontSize: 16, fontWeight:"bold" }}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 9}}>Question: <Text
                    style={{fontSize: 15}}>{questionStep + 1} / {questions.length}</Text></Text>
                <Progress.Bar color={appColorTheme.primaryColor} borderWidth={0} unfilledColor={"#f1efef"} progress={progressInPercent}
                              width={320}/>
                {
                    currentQuestion &&
                    <Question id={currentQuestion.id} question={currentQuestion.question}/>
                }

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text
                        style={styles.submitButtonText}>{questionStep === questions.length - 1 ? "Done" : "Next"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F4F4F4',
        alignItems: "center",
    },
    container: {
        marginTop: 18,
        borderRadius: 10,
        width: "95%",
        padding: 24,
        backgroundColor: '#ffffff',
        elevation: 2,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    questionContainer: {
        marginTop: 24

    },
    questionText: {
        fontSize: 18,
        marginBottom: 16,
        color: '#555',
    },
    answerContainer: {
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center"
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
        borderRadius: 8,
        paddingVertical: 16,
        marginTop: 18,
    },
    submitButtonText: {
        color: appColorTheme.primaryColor,
        fontSize: 18,
        fontWeight: "500",
        textAlign: 'center',
    },
});

export default Questionnaire;
