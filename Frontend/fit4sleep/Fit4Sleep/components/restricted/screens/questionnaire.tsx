import React, {useContext, useEffect, useState} from 'react';
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
import Swiper from 'react-native-swiper';
import {AuthContext, AuthContextType} from "../../../contexts/auth-context";


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
    const [questionsSix, setQuestionsSix] = useState<Question[]>([]);
    const [questionsSeven, setQuestionsSeven] = useState<Question[]>([]);
    const [questionsEight, setQuestionsEight] = useState<Question[]>([]);
    const [questionsNine, setQuestionsNine] = useState<Question[]>([]);
    const [questionsTen, setQuestionsTen] = useState<Question[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const {userId} = useContext(AuthContext) as AuthContextType;


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
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typesix')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsSix(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typeseven')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsSeven(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typeeight')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsEight(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typenine')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsNine(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://10.0.2.2:5000/Questionnaire/typeten')
            .then((response) => {
                const newAnswers = new Array(response.data.length).fill(null);
                setAnswers(newAnswers);
                setQuestionsTen(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleAnswer = (question: Question, answer: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[question.id] = answer;
            return updatedAnswers;
        });
    };

    const ComponentCalculation = () => {
        // Question 1
        const answerOne = answers[1] !== null ? parseInt(answers[1]!) : 0;
        // Question 2
        const answerTwo = answers[2];
        // Question 3
        const answerThree = answers[3] !== null ? parseInt(answers[3]!) : 0;
        // Question 4
        const answerFour = answers[4] !== null ? parseInt(answers[4]!) : 0;
        // Question 5
        const answerFive = answers[5] !== null ? parseInt(answers[5]!) : 0;
        const answerSix = answers[6] !== null ? parseInt(answers[6]!) : 0;
        const answerSeven = answers[7] !== null ? parseInt(answers[7]!) : 0;
        const answerEight = answers[8] !== null ? parseInt(answers[8]!) : 0;
        const answerNine = answers[9] !== null ? parseInt(answers[9]!) : 0;
        const answerTen = answers[10] !== null ? parseInt(answers[10]!) : 0;
        const answerEleven = answers[11] !== null ? parseInt(answers[11]!) : 0;
        const answerTwelve = answers[12] !== null ? parseInt(answers[12]!) : 0;
        const answerThirteen = answers[13] !== null ? parseInt(answers[13]!) : 0;
        const answerFourteen = answers[14] !== null ? parseInt(answers[14]!) : 0;


        // Question 6 &  Calculation
        const answerFifteen = answers[15] !== null ? parseInt(answers[15]!) : 0;
        //Question 7
        const answerSixteen = answers[16] !== null ? parseInt(answers[16]!) : 0;

        //Question 8
        const answerSeventeen = answers[17] !== null ? parseInt(answers[17]!) : 0;

        //Question 9
        const answerEighteen = answers[18] !== null ? parseInt(answers[18]!) : 0;

        //Question 10
        const answerNineteen = answers[19] !== null ? parseInt(answers[19]!) : 0;

        let score1: number;
        let score2: number;
        let score3: number;
        let score4: number;
        let score5: number = 0;

        let score6: number = 0;

        // Calculation of Answer 2
        if (answerTwo !== null) {
            const answerTwoValue = parseInt(answerTwo, 10);

            if (answerTwoValue <= 15) {
                score1 = 0;
            } else if (answerTwoValue >= 16 && answerTwoValue <= 30) {
                score1 = 1;
            } else if (answerTwoValue >= 31 && answerTwoValue <= 60) {
                score1 = 2;
            } else {
                score1 = 3;
            }
        } else {
            score1 = -1; // or any other default score value
        }

        console.log('the score is', score1);

        // Calculation of Question 5a
        const sum = answerFive;


        //Caluclation of 2 + 5
        const componentSum = score1 + sum;

        if (componentSum == 0) {
            score2 = 0;
        } else if (componentSum >= 1 && componentSum <= 2) {
            score2 = 1;
        } else if (componentSum >= 3 && componentSum <= 4) {
            score2 = 2;
        } else {
            score2 = 3;
        }

        // Calculation of Question 4
        if (answerFour !== null) {

            if (answerFour >= 7) {
                score3 = 0;
            } else if (answerFour >= 6 && answerFour <= 7) {
                score3 = 1;
            } else if (answerFour >= 5 && answerFour <= 6) {
                score3 = 2;
            } else {
                score3 = 3;
            }
        } else {
            score3 = -1;
        }


        // number of hours spent in bed
        let hoursInBed = answerThree - answerOne;
        if (hoursInBed < 0) {
            hoursInBed += 24;
        }
        // HSE (Number of hours slept/ (divided by) Number of hours spent in bed) X (multiplied by) 100 = HSE (%)
        let result = (answerFour / hoursInBed) * 100;
        console.log(result);

        if (result !== null) {
            if (result >= 85) {
                score4 = 0;
            } else if (result >= 75 && result <= 84) {
                score4 = 1;
            } else if (result >= 65 && result <= 74) {
                score4 = 2;
            } else {
                score4 = 3;
            }
        } else {
            score4 = -1;
        }


        //Calculation of 5b - 5j
        const sumOf5 = answerSix + answerSeven + answerEight + answerNine + answerTen + answerEleven + answerTwelve + answerThirteen + answerFourteen;


        if (sumOf5 !== null) {
            switch (true) {
                case sumOf5 == 0:
                    score5 = 0;
                    break;
                case sumOf5 >= 1 && sumOf5 <= 9:
                    score5 = 1;
                    break;
                case sumOf5 >= 10 && sumOf5 <= 18:
                    score5 = 2;
                    break;
                case sumOf5 >= 19 && sumOf5 <= 27:
                    score5 = 3;
                    break;
                default:
                    console.log('score is false');
                    break;
            }
        } else {
            score5 = -1;
        }


        //Calculation of Component 7
        const sumOf8and9 = answerSeventeen + answerEighteen;


        if (sumOf8and9 !== null) {
            switch (sumOf8and9) {
                case 0:
                    score6 = 0;
                    break;
                case 1:
                case 2:
                    score6 = 1;
                    break;
                case 3:
                case 4:
                    score6 = 2;
                    break;
                case 5:
                case 6:
                    score6 = 3;
                    break;
                default:
                    score6 = -1;
                    break;
            }
        }

        //Component Scores
        const component1Score = answerFifteen;
        const component2Score = score2;
        const component3Score = score3;
        const component4Score = score4;
        const component5Score = score5;
        const component6Score = answerSixteen;
        const component7Score = score6;


        console.log('Component 1 Score is:', component1Score);
        console.log('Component 2 Score is:', component2Score);
        console.log('Component 3 Score is:', component3Score);
        console.log('Component 4 Score is:', component4Score);
        console.log('Component 5 Score is:', component5Score);
        console.log('Component 6 Score is:', component6Score);
        console.log('Component 7 Score is:', component7Score);


        return {
            component1Score,
            component2Score,
            component3Score,
            component4Score,
            component5Score,
            component6Score,
            component7Score
        };
    };


    const handleSubmit = () => {
        const {
            component1Score,
            component2Score,
            component3Score,
            component4Score,
            component5Score,
            component6Score,
            component7Score
        } = ComponentCalculation();

        const allComponentScores =
            component1Score +
            component2Score +
            component3Score +
            component4Score +
            component5Score +
            component6Score +
            component7Score;

        console.log(userId);
        console.log('USer id ist:', userId);
        axios
            .put('http://10.0.2.2:5000/Antecedents/putScore', {sleepScore: allComponentScores, userId: userId ?? 1})
            .then((response) => {
                console.log(response.data);  // Success message
            })
            .catch((error) => {
                console.log(error);
            });

        setScore(allComponentScores);
        setSubmitted(true);
    };


    return (
        <Swiper showsButtons={true} loop={false}>
            <View style={styles.slide}>
                <View style={styles.container}>
                    <Text style={styles.HeaderText}>Pittsburgh Sleep Quality Index</Text>
                    <Text>The following questions relate to your usual sleep
                        habits during the past month only.
                        Your answers should indicate the most accurate reply
                        for the majority of days and nights in the past month. </Text>
                    <Text style={styles.sectionInfoText}>Please answer all questions.</Text>
                </View>
            </View>
            <View style={styles.slide}>
                <View style={styles.container}>
                    <Text style={styles.HeaderText}>Component: Habitual sleep efficiency</Text>
                    <View style={styles.questionContainer}>
                        {questionsOne.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <TextInput
                                        placeholder="Type your answer here"
                                        onChangeText={(answer) => handleAnswer(question, answer)}
                                        value={answers[question.id] || ''}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.slide}>
                <View style={styles.container}>
                    <Text style={styles.HeaderText}>Component: Sleep latency</Text>
                    <View style={styles.questionContainer}>
                        {questionsTwo.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <TextInput
                                        placeholder="Type your answer here"
                                        onChangeText={(answer) => handleAnswer(question, answer)}
                                        value={answers[question.id] || ''}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.slide}>
                <View style={styles.container}>
                    <Text style={styles.HeaderText}>Component: Habitual sleep efficiency</Text>
                    <View style={styles.questionContainer}>
                        {questionsThree.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <TextInput
                                        placeholder="Type your answer here"
                                        onChangeText={(answer) => handleAnswer(question, answer)}
                                        value={answers[question.id] || ''}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

            </View>
            <View style={styles.slide}>
                <View style={styles.container}>
                    <Text style={styles.HeaderText}>Component: Sleep duration</Text>
                    <View style={styles.questionContainer}>
                        {questionsFour.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <TextInput
                                        placeholder="Type your answer here"
                                        onChangeText={(answer) => handleAnswer(question, answer)}
                                        value={answers[question.id] || ''}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.slide}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.HeaderText}>Component: Sleep disturbances</Text>
                        <View style={styles.questionContainer}>
                            {questionsFive.map((question) => (
                                <View key={question.id}>
                                    <Text style={styles.questionText}>{question.question}</Text>
                                    <View style={styles.answerContainer}>
                                        <View style={styles.picker}>
                                            <Picker
                                                selectedValue={answers[question.id] || ''}
                                                onValueChange={(answer) => handleAnswer(question, answer.toString())}
                                            >
                                                <Picker.Item label="Select" value=""/>
                                                <Picker.Item label="Not during the past month" value="0"/>
                                                <Picker.Item label="Less than once a week" value="1"/>
                                                <Picker.Item label="Once or twice a week" value="2"/>
                                                <Picker.Item label="Three or more times a week" value="3"/>
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                    </View>
                </ScrollView>
            </View>
            <View style={styles.slide}>
                <View style={styles.container}>
                    <Text style={styles.HeaderText}>Component: Subjective sleep quality</Text>
                    <View style={styles.questionContainer}>
                        {questionsSix.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <View style={styles.picker}>
                                        <Picker
                                            selectedValue={answers[question.id] || ''}
                                            onValueChange={(answer) => handleAnswer(question, answer.toString())}
                                        >
                                            <Picker.Item label="Select" value=""/>
                                            <Picker.Item label="Very good" value="0"/>
                                            <Picker.Item label="Fairly good" value="1"/>
                                            <Picker.Item label="Fairly bad" value="2"/>
                                            <Picker.Item label="Very bad" value="3"/>
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.slide}>

                <View style={styles.container}>

                    <Text style={styles.HeaderText}>Component: Use of sleeping medication</Text>
                    <View style={styles.questionContainer}>
                        {questionsSeven.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <View style={styles.picker}>
                                        <Picker
                                            selectedValue={answers[question.id] || ''}
                                            onValueChange={(answer) => handleAnswer(question, answer.toString())}
                                        >
                                            <Picker.Item label="Select" value=""/>
                                            <Picker.Item label="Not during the past month" value="0"/>
                                            <Picker.Item label="Less than once a week" value="1"/>
                                            <Picker.Item label="Once or twice a week" value="2"/>
                                            <Picker.Item label="Three or more times a week" value="3"/>
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                </View>

            </View>
            <View style={styles.slide}>

                <View style={styles.container}>

                    <Text style={styles.HeaderText}>Component: Daytime dysfunction</Text>


                    <View style={styles.questionContainer}>
                        {questionsEight.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <View style={styles.picker}>
                                        <Picker
                                            selectedValue={answers[question.id] || ''}
                                            onValueChange={(answer) => handleAnswer(question, answer.toString())}
                                        >
                                            <Picker.Item label="Select" value=""/>
                                            <Picker.Item label="Not during the past month" value="0"/>
                                            <Picker.Item label="Less than once a week" value="1"/>
                                            <Picker.Item label="Once or twice a week" value="2"/>
                                            <Picker.Item label="Three or more times a week" value="3"/>
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                </View>

            </View>
            <View style={styles.slide}>

                <View style={styles.container}>

                    <Text style={styles.HeaderText}>Component: Daytime dysfunction</Text>


                    <View style={styles.questionContainer}>
                        {questionsNine.map((question) => (
                            <View key={question.id}>
                                <Text style={styles.questionText}>{question.question}</Text>
                                <View style={styles.answerContainer}>
                                    <View style={styles.picker}>
                                        <Picker
                                            selectedValue={answers[question.id] || ''}
                                            onValueChange={(answer) => handleAnswer(question, answer.toString())}
                                        >
                                            <Picker.Item label="Select" value=""/>
                                            <Picker.Item label="No Problem at all" value="0"/>
                                            <Picker.Item label="Only a very slight problem" value="1"/>
                                            <Picker.Item label="Somewhat of a problem" value="2"/>
                                            <Picker.Item label="A very big problem" value="3"/>
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                </View>

            </View>
            <View style={styles.slide}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>

                        <Text style={styles.HeaderText}>Other Questions</Text>


                        <View style={styles.questionContainer}>
                            {questionsTen.map((question) => (
                                <View key={question.id}>
                                    <Text style={styles.questionText}>{question.question}</Text>
                                    <View style={styles.answerContainer}>
                                        <View style={styles.picker}>
                                            <Picker
                                                selectedValue={answers[question.id] || ''}
                                                onValueChange={(answer) => handleAnswer(question, answer.toString())}
                                            >
                                                <Picker.Item label="Select" value=""/>
                                                <Picker.Item label="Not during the past month" value="0"/>
                                                <Picker.Item label="Less than once a week" value="1"/>
                                                <Picker.Item label="Once or twice a week" value="2"/>
                                                <Picker.Item label="Three or more times a week" value="3"/>
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>

                    </View>
                </ScrollView>
            </View>
            <View style={styles.slide}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.HeaderText}>Your Sleep Quality Score</Text>
                        <View style={styles.questionContainer}>
                            {submitted ? (
                                <Text style={styles.submitDescription}>
                                    Your form has been submitted. Thank you!

                                    Your Score is: {score}
                                </Text>

                            ) : (
                                <Text style={styles.submitDescription}>
                                    If you have finished all your questions please submit them. Your score will be
                                    calculated.
                                </Text>
                            )}
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Swiper>
    )
        ;
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
    HeaderText: {
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
    sectionInfoText: {

        fontSize: 18,
        color: 'white',
        backgroundColor: appColorTheme.primaryColor,
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderRadius: 15,
        marginBottom: 30,
        textAlign: 'center',

    },
    questionContainer: {
        marginTop: 24,
        height: '100%',

    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#fff',
    },
    center: {
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
        height: '20%',
    },
    nextButtonText: {
        color: appColorTheme.primaryColor,
        fontSize: 18,
        fontWeight: "500",
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: appColorTheme.primaryColor,
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    slide: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    submitDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
    },
});

export default Questionnaire;
