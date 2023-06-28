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
import Collapsible from "react-native-collapsible";


interface Question {
    id: number;
    question: string;
    type: number;
}

const Questionnaire = () => {
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [questionsOne, setQuestionsOne] = useState<Question[]>([]);
    const [questionsTwo, setQuestionsTwo] = useState<Question[]>([]);
    const [questionsThree, setQuestionsThree] = useState<Question[]>([]);
    const [questionsFour, setQuestionsFour] = useState<Question[]>([]);
    const [questionsFive, setQuestionsFive] = useState<Question[]>([]);
    const [isCollapsibleOneOpen, setIsCollapsibleOneOpen] = useState<boolean>(false);
    const [isCollapsibleTwoOpen, setIsCollapsibleTwoOpen] = useState<boolean>(false);
    const [isCollapsibleThreeOpen, setIsCollapsibleThreeOpen] = useState<boolean>(false);
    const [isCollapsibleFourOpen, setIsCollapsibleFourOpen] = useState<boolean>(false);
    const [isCollapsibleFiveOpen, setIsCollapsibleFiveOpen] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typeone')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsOne(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typetwo')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsTwo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typethree')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsThree(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typefour')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsFour(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typefive')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsFive(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.collapsibleHeader}
                onPress={() => setIsCollapsibleOneOpen(!isCollapsibleOneOpen)}
            >
                <Text style={styles.collapsibleHeaderText}>Questions One</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isCollapsibleOneOpen}>
                <View style={styles.questionContainer}>
                    {questionsOne.map((question) => (
                        <View key={question.id}>
                            <Text style={styles.questionText}>{question.question}</Text>
                        </View>
                    ))}
                </View>
            </Collapsible>

            <TouchableOpacity
                style={styles.collapsibleHeader}
                onPress={() => setIsCollapsibleTwoOpen(!isCollapsibleTwoOpen)}
            >
                <Text style={styles.collapsibleHeaderText}>Questions Two</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isCollapsibleTwoOpen}>
                <View style={styles.questionContainer}>
                    {questionsTwo.map((question) => (
                        <View key={question.id}>
                            <Text style={styles.questionText}>{question.question}</Text>
                        </View>
                    ))}
                </View>
            </Collapsible>

            <TouchableOpacity
                style={styles.collapsibleHeader}
                onPress={() => setIsCollapsibleThreeOpen(!isCollapsibleThreeOpen)}
            >
                <Text style={styles.collapsibleHeaderText}>Questions Three</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isCollapsibleThreeOpen}>
                <View style={styles.questionContainer}>
                    {questionsThree.map((question) => (
                        <View key={question.id}>
                            <Text style={styles.questionText}>{question.question}</Text>
                        </View>
                    ))}
                </View>
            </Collapsible>
            <TouchableOpacity
                style={styles.collapsibleHeader}
                onPress={() => setIsCollapsibleFourOpen(!isCollapsibleFourOpen)}
            >
                <Text style={styles.collapsibleHeaderText}>Questions Four</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isCollapsibleFourOpen}>
                <View style={styles.questionContainer}>
                    {questionsFour.map((question) => (
                        <View key={question.id}>
                            <Text style={styles.questionText}>{question.question}</Text>
                        </View>
                    ))}
                </View>
            </Collapsible>

            <TouchableOpacity
                style={styles.collapsibleHeader}
                onPress={() => setIsCollapsibleFiveOpen(!isCollapsibleFiveOpen)}
            >
                <Text style={styles.collapsibleHeaderText}>Questions Five</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!isCollapsibleFiveOpen}>
                <View style={styles.questionContainer}>
                    {questionsFive.map((question) => (
                        <View key={question.id}>
                            <Text style={styles.questionText}>{question.question}</Text>
                        </View>
                    ))}
                </View>
            </Collapsible>

        </View>
        </ScrollView>
    );
};



//
//     const handleSubmit = () => {
//         const progress: number = 1 / (questions.length - 1);
//         setProgressInPercent(progressInPercent + progress);
//
//         if (questionStep < questions.length - 1) {
//             setQuestionStep(questionStep + 1);
//         }
//
//         if (questionStep === questions.length - 1) {
//             // Send the answers to the backend
//             console.log(answers);
//             axios
//                 .post('http://10.0.2.2:5000/Questionnaire/typeone', { answers })
//                 .then((response) => {
//                     // Handle the response if needed
//                     console.log('Answers saved successfully:', response.data);
//
//                     if (response.status === 308) {
//                         // Follow the redirect
//                         axios
//                             .post(response.headers.location, { answers })
//                             .then((redirectResponse) => {
//                                 console.log('Redirected response:', redirectResponse.data);
//                             })
//                             .catch((error) => {
//                                 console.log('Error in redirected request:', error);
//                             });
//                     }
//                 })
//                 .catch((error) => {
//                     // Handle the error if needed
//                     console.log('Error saving answers:', error);
//                 });
//
//             setQuestionStep(0);
//             setProgressInPercent(0);
//         }
//     };
//
//
//
//
//
//
//     const PickerQuestion = (question: Question) => {
//         if (question.id < 5) {
//             return (
//                 <View style={styles.questionContainer}>
//                     <View style={styles.center}>
//                     <Text style={styles.questionText}>{question.question}</Text>
//
//                     <View style={styles.answerContainer}>
//                         <TextInput
//                             placeholder="Type your answer here"
//                             onChangeText={(answer) => handleAnswer(question.id, answer)}
//                             value={answers[question.id] || ''}
//                         />
//                     </View>
//                     </View>
//                 </View>
//             );
//         } else if (question.id >= 5 && question.id <= 16 ) {
//             return (
//                 <View style={styles.questionContainer}>
//                 <View style={styles.center}>
//                     <Text style={styles.questionText}>{question.question}</Text>
//
//                     <View style={styles.answerContainer}>
//                         <View style={styles.picker}>
//                             <Picker
//                                 selectedValue={answers[question.id] || ''}
//                                 onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
//                             >
//                                 <Picker.Item label="Select" value="" />
//                                 <Picker.Item label="Not during the past month" value="0" />
//                                 <Picker.Item label="Less than once a week" value="1" />
//                                 <Picker.Item label="Once or twice a week" value="2" />
//                                 <Picker.Item label="Three or more times a week" value="3" />
//                             </Picker>
//                         </View>
//                     </View>
//                 </View>
//                 </View>
//             );
//         } else if (question.id == 17) {
//             return (
//                 <View style={styles.center}>
//                     <View style={styles.questionContainer}>
//                     <Text style={styles.questionText}>{question.question}</Text>
//
//                     <View style={styles.answerContainer}>
//                         <View style={styles.picker}>
//                             <Picker
//                                 selectedValue={answers[question.id] || ''}
//                                 onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
//                             >
//                                 <Picker.Item label="Select" value="" />
//                                 <Picker.Item label="Very good" value="0" />
//                                 <Picker.Item label="Fairly good" value="1" />
//                                 <Picker.Item label="Fairly bad" value="2" />
//                                 <Picker.Item label="Very bad" value="3" />
//                             </Picker>
//                         </View>
//                     </View>
//                     </View>
//                 </View>
//             );
//         } else if (question.id >= 18 && question.id <= 19) {
//         return (
//             <View style={styles.center}>
//                 <View style={styles.questionContainer}>
//                 <Text style={styles.questionText}>{question.question}</Text>
//
//                 <View style={styles.answerContainer}>
//                     <View style={styles.picker}>
//                         <Picker
//                             selectedValue={answers[question.id] || ''}
//                             onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
//                         >
//                             <Picker.Item label="Select" value="" />
//                             <Picker.Item label="Not during the past month" value="0" />
//                             <Picker.Item label="Less than once a week" value="1" />
//                             <Picker.Item label="Once or twice a week" value="2" />
//                             <Picker.Item label="Three or more times a week" value="3" />
//                         </Picker>
//                     </View>
//                 </View>
//                 </View>
//             </View>
//         );
//         } else if (question.id == 20) {
//             return (
//                 <View style={styles.center}>
//                     <View style={styles.questionContainer}>
//                     <Text style={styles.questionText}>{question.question}</Text>
//
//                     <View style={styles.answerContainer}>
//                         <View style={styles.picker}>
//                             <Picker
//                                 selectedValue={answers[question.id] || ''}
//                                 onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
//                             >
//                                 <Picker.Item label="Select" value="" />
//                                 <Picker.Item label="No Problem at all" value="0" />
//                                 <Picker.Item label="Only a very slight problem" value="1" />
//                                 <Picker.Item label="Somewhat of a problem" value="2" />
//                                 <Picker.Item label="A very big problem" value="3" />
//                             </Picker>
//                         </View>
//                     </View>
//                     </View>
//                 </View>
//             );
//         } else if (question.id >= 21) {
//             return (
//                 <View style={styles.center}>
//                     <View style={styles.questionContainer}>
//                     <Text style={styles.questionText}>{question.question}</Text>
//
//                     <View style={styles.answerContainer}>
//                         <View style={styles.picker}>
//                             <Picker
//                                 selectedValue={answers[question.id] || ''}
//                                 onValueChange={(answer) => handleAnswer(question.id, answer.toString())}
//                             >
//                                 <Picker.Item label="Select" value="" />
//                                 <Picker.Item label="Not during the past month" value="0" />
//                                 <Picker.Item label="Less than once a week" value="1" />
//                                 <Picker.Item label="Once or twice a week" value="2" />
//                                 <Picker.Item label="Three or more times a week" value="3" />
//                             </Picker>
//                         </View>
//                     </View>
//                     </View>
//                 </View>
//             );
//         } else {
//             return null; // Handle other question IDs or conditions if necessary
//         }
//     };
//
//
//     return (
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={styles.container}>
//                 <Text style={{fontWeight: "bold", fontSize: 16, marginBottom: 9}}>Question: <Text
//                     style={{fontSize: 15}}>{questionStep + 1} / {questions.length}</Text></Text>
//                 <Progress.Bar color={appColorTheme.primaryColor} borderWidth={0} unfilledColor={"#f1efef"}
//                               progress={progressInPercent}
//                               width={320}/>
//                 {
//                     currentQuestion &&
//                     <PickerQuestion id={currentQuestion.id} question={currentQuestion.question}/>
//                 }
//
//                 <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                     <Text
//                         style={styles.submitButtonText}>{questionStep === questions.length - 1 ? "Done" : "Next"}</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
//  };

const styles = StyleSheet.create({
        collapsibleHeader: {
            backgroundColor: '#eaeaea',
            paddingVertical: 10,
            paddingHorizontal: 16,
            marginBottom: 8,
        },
        collapsibleHeaderText: {
            fontSize: 16,
            fontWeight: 'bold',
        },
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
        height: '90%',

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
    nextButton: {
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
    nextButtonText: {
        color: appColorTheme.primaryColor,
        fontSize: 18,
        fontWeight: "500",
        textAlign: 'center',
    },
});

export default Questionnaire;
