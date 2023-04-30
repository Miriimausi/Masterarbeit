import React, {useRef, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Swiper from 'react-native-swiper';
import { ToggleButton } from 'react-native-paper';



interface SurveyResponse {
    id: number;
    age: number;
    height: number;
    weight: number;
    bmi: number;
    gender: string;
    smoking: String;
    alcohol: String;
    // sleepDuration: String;
    activityLevel: String;

    // favoriteActivities: string[];

}

const OnboardingSurvey = () => {
    const [response, setResponse] = useState<SurveyResponse>({
        id:0,
        age: 0,
        height: 0,
        weight: 0,
        bmi: 0,
        gender: '',
        smoking:'',
        alcohol: '',
        // sleepDuration: '',
        activityLevel:'',
        // favoriteActivities:[]

    });
    const [stressLevel, setStressLevel] = useState(3);



    const handleAgeChange = (age: string) => {
        setResponse({
            ...response,
            age: parseInt(age),
            bmi: calculateBmi(response.weight, response.height),
        });
    };
    const handleGenderChange = (gender: string) => {
        setResponse({
            ...response,
            gender: gender,
            bmi: calculateBmi(response.weight, response.height),
        });
    };
    const handleWeightChange = (weight: string) => {
        setResponse({
            ...response,
            weight: parseInt(weight),
            bmi: calculateBmi(parseInt(weight), response.height),
        });
    };
    const handleHeightChange = (height: string) => {
        setResponse({
            ...response,
            height: parseInt(height),
            bmi: calculateBmi(response.weight, parseInt(height)),
        });
    };

    const calculateBmi = (weight: number, height: number): number => {
        // Calculate BMI using the weight and height values and return the result
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi;
    };

    const handleSmokingChange = (smoking: string) => {
        setResponse({ ...response, smoking: smoking });
    };

    const handleAlcoholChange = (alcohol: string) => {
        setResponse({ ...response, alcohol: alcohol });
    };
    // const handleSleepDurationChange = (sleepDuration: string) => {
    //     setResponse({ ...response, sleepDuration: sleepDuration });
    // };

    const handleSubmit = async () => {
    //     const response = await fetch('http://10.0.2.2:5000/Antecedents', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ id, age, height, weight, bmi, gender , smoking, alcohol, activityLevel  })
    //     });
    //     const data = await response.json();
    //     if (data.success) {
            console.log(response);
    //     } else {
    //         console.log('No Information was submitted');
    //     }
    }


    // adding alcohol consumtion, smoking, sports, stress, depression?? - maybe divide the sleep parameters and the atenecedents
    return (
        <Swiper showsButtons={true} loop={false}>
            <View style={styles.slide}>
                <Text style={styles.headerText}>Personal Information </Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Age:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleAgeChange}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Gender:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.gender}
                            onValueChange={handleGenderChange}
                        >
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Height (cm):</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleHeightChange}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Weight (kg):</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={handleWeightChange}
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>BMI:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={response.bmi.toString()}
                        editable={false}
                    />
                </View>
            </View>

            < View style ={styles.slide}>
                <Text style={styles.headerText}>Health-assessment </Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Smoking</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.smoking}
                            onValueChange={(value) =>
                                setResponse({ ...response, smoking: value })
                            }
                        >
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="Not at all" value="not_at_all" />
                            <Picker.Item label="Occasional" value="occasional" />
                            <Picker.Item label ="Regular"  value="regular" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Alcohol Intake</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.alcohol}
                            onValueChange={(value) =>
                                setResponse({ ...response, alcohol: value })
                            }
                        >
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="Not at all" value="not_at_all" />
                            <Picker.Item label="Occasional" value="occasional" />
                            <Picker.Item label ="Regularly"  value="regular" />
                        </Picker>
                    </View>
                </View>
            </View>
            {/*ToggleButton will nicht :(*/}
            {/*    <View style={styles.field}>*/}
            {/*        <Text style={styles.label}>Stress Level</Text>*/}
            {/*        <View style={styles.container}>*/}
            {/*            {[1, 2, 3, 4, 5].map((level) => (*/}
            {/*                <View key={level} style={styles.radioButtonContainer}>*/}
            {/*                    <Text style={styles.radioButtonLabel}>{level}</Text>*/}
            {/*                    <ToggleButton*/}
            {/*                        value={level}*/}
            {/*                        status={stressLevel === level ? 'checked' : 'unchecked'}*/}
            {/*                        onPress={() => setStressLevel(level)}*/}
            {/*                        color="#008080"*/}
            {/*                    />*/}
            {/*                </View>*/}
            {/*            ))}*/}
            {/*        </View>*/}
            {/*    </View>*/}


            <View style={styles.slide}>
                <Text style={styles.headerText}>Activity Assessment</Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Level of Activity</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.activityLevel}
                            onValueChange={(value) => setResponse({ ...response, activityLevel: value })}
                        >
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="Low" value="low" />
                            <Picker.Item label="Moderate" value="moderate" />
                            <Picker.Item label="High" value="high" />
                            <Picker.Item label="Very High" value="very_high" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Favourite Activity</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.activityLevel}
                            onValueChange={(value) => setResponse({ ...response, activityLevel: value })}
                        >
                            <Picker.Item label="Select" value="" />
                            <Picker.Item  label="Circuit Training" value= "circuit_training"/>
                            <Picker.Item label="Yoga" value="yoga" />
                            <Picker.Item label="Jogging" value="jogging" />
                            <Picker.Item label="Weight Training" value="weight_training" />
                            <Picker.Item label="Swimming" value="swimming" />
                            <Picker.Item label="Cycling" value="cycling" />
                        </Picker>
                    </View>
                </View>
            </View>

            <View style={styles.slide}>
                <View style={styles.surveyContainer}>
                    <Text style={styles.surveyTitle}>Thank You!</Text>
                    <Text style={styles.surveyText}>
                        We appreciate your willingness to share your information with us.
                        By providing your information, an optimal experience can be created.
                    </Text>
                </View>
                <View style={styles.field}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit your Information</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Swiper>
    );




};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 9
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        fontSize: 16,
        backgroundColor: '#fff',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#fff',
    },
    surveyContainer: {
        alignItems: 'center',
        marginBottom: 30,
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    surveyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    surveySubtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    surveyText: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center'
    },

    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonLabel: {
        marginRight: 10,
        fontSize: 16,
    },
});
export default OnboardingSurvey;
