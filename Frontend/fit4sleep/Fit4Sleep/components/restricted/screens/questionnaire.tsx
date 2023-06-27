import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView, TextInput,
} from 'react-native';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import {appColorTheme} from "../../../constants/colors";
import CustomNumericScale from "./onboardingSurvey/customNumericScale";
import {Picker} from "@react-native-picker/picker";


interface Question {
    id: number;
    question: string;
    type: number;
}

const Questionnaire = () => {
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [type, setType] = useState<Question[]>([]);
    const [questionStep, setQuestionStep] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
    const [progressInPercent, setProgressInPercent] = useState<number>(0)
    const [activityLevel, setActivityLevel] = useState(3);
    const [QuestionsType, setQuestionsType] = useState();


    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire')
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
        console.log(answer);
    };


    const handleSubmit = () => {
        const progress: number = 1 / (questions.length - 1);
        setProgressInPercent(progressInPercent + progress);

        if (questionStep < questions.length - 1) {
            setQuestionStep(questionStep + 1);
        }

        if (questionStep === questions.length - 1) {
            // Send the answers to the backend
            console.log(answers);
            axios
                .post('http://10.0.2.2:5000/Questionnaire', { answers })
                .then((response) => {
                    // Handle the response if needed
                    console.log('Answers saved successfully:', response.data);

                    if (response.status === 308) {
                        // Follow the redirect
                        axios
                            .post(response.headers.location, { answers })
                            .then((redirectResponse) => {
                                console.log('Redirected response:', redirectResponse.data);
                            })
                            .catch((error) => {
                                console.log('Error in redirected request:', error);
                            });
                    }
                })
                .catch((error) => {
                    // Handle the error if needed
                    console.log('Error saving answers:', error);
                });

            setQuestionStep(0);
            setProgressInPercent(0);
        }
    };






    const PickerQuestion = (question: Question) => {
        if (question.id < 5) {
            return (
                <View style={styles.questionContainer}>
                    <View style={styles.center}>
                    <Text style={styles.questionText}>{question.question}</Text>

                    <View style={styles.answerContainer}>
                        <TextInput
                            placeholder="Type your answer here"
                            onChangeText={(answer) => handleAnswer(question.id, answer)}
                            value={answers[question.id] || ''}
                        />
                    </View>
                    </View>
                </View>
            );
        } else if (question.id >= 5 && question.id <= 16 ) {
            return (
                <View style={styles.questionContainer}>
                <View style={styles.center}>
                    <Text style={styles.questionText}>{question.question}</Text>

                    <View style={styles.answerContainer}>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={answers[question.id] || ''}
                                onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
                            >
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Not during the past month" value="option1" />
                                <Picker.Item label="Less than once a week" value="option2" />
                                <Picker.Item label="Once or twice a week" value="option3" />
                                <Picker.Item label="Three or more times a week" value="option4" />
                            </Picker>
                        </View>
                    </View>
                </View>
                </View>
            );
        } else if (question.id == 17) {
            return (
                <View style={styles.center}>
                    <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.question}</Text>

                    <View style={styles.answerContainer}>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={answers[question.id] || ''}
                                onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
                            >
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Very good" value="option1" />
                                <Picker.Item label="Fairly good" value="option2" />
                                <Picker.Item label="Fairly bad" value="option3" />
                                <Picker.Item label="Very bad" value="option3" />
                            </Picker>
                        </View>
                    </View>
                    </View>
                </View>
            );
        } else if (question.id >= 18 && question.id <= 19) {
        return (
            <View style={styles.center}>
                <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.question}</Text>

                <View style={styles.answerContainer}>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={answers[question.id] || ''}
                            onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
                        >
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="Not during the past month" value="option1" />
                            <Picker.Item label="Less than once a week" value="option2" />
                            <Picker.Item label="Once or twice a week" value="option3" />
                            <Picker.Item label="Three or more times a week" value="option4" />
                        </Picker>
                    </View>
                </View>
                </View>
            </View>
        );
        } else if (question.id == 20) {
            return (
                <View style={styles.center}>
                    <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.question}</Text>

                    <View style={styles.answerContainer}>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={answers[question.id] || ''}
                                onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
                            >
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="No Problem at all" value="option1" />
                                <Picker.Item label="Only a very slight problem" value="option2" />
                                <Picker.Item label="Somewhat of a problem" value="option3" />
                                <Picker.Item label="A very big problem" value="option4" />
                            </Picker>
                        </View>
                    </View>
                    </View>
                </View>
            );
        } else if (question.id >= 21) {
            return (
                <View style={styles.center}>
                    <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{question.question}</Text>

                    <View style={styles.answerContainer}>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={answers[question.id] || ''}
                                onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
                            >
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Not during the past month" value="option1" />
                                <Picker.Item label="Less than once a week" value="option2" />
                                <Picker.Item label="Once or twice a week" value="option3" />
                                <Picker.Item label="Three or more times a week" value="option4" />
                            </Picker>
                        </View>
                    </View>
                    </View>
                </View>
            );
        } else {
            return null; // Handle other question IDs or conditions if necessary
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 9}}>Question: <Text
                    style={{fontSize: 15}}>{questionStep + 1} / {questions.length}</Text></Text>
                <Progress.Bar color={appColorTheme.primaryColor} borderWidth={0} unfilledColor={"#f1efef"}
                              progress={progressInPercent}
                              width={320}/>
                {
                    currentQuestion &&
                    <PickerQuestion id={currentQuestion.id} question={currentQuestion.question}/>
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
        marginTop: 24,
        height: "60%",

    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#fff',
    },
    center:{
        justifyContent: "center",
        alignItems: "center",
    },
    field: {
        width: '80%',
        marginTop: 5,
        marginBottom: 5,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#293e7d'
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
        justifyContent: "center"
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
