import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Swiper from 'react-native-swiper';
import CustomNumericScale from "./customNumericScale";
import {AuthContext, AuthContextType} from "../../../../contexts/auth-context";


interface SurveyResponse {
    id: number;
    age: number;
    height: number;
    weight: number;
    bmi: number;
    timeAvailability: String;
    durationPreference: String;
    trainingPreference: String;
    intensityPreference: String;
    socialPreference: String;
    skillPreference: String;
    locationPreference: String;
    emotionalPreference: String;

}

const OnboardingSurvey = () => {
    const {userId, setIsOnBoarded} = useContext(AuthContext) as AuthContextType;

    const [response, setResponse] = useState<SurveyResponse>({
        id: 0,
        age: 0,
        height: 0,
        weight: 0,
        bmi: 0,
        timeAvailability: '',
        durationPreference: '',
        trainingPreference: '',
        intensityPreference: '',
        socialPreference: '',
        skillPreference: '',
        locationPreference: '',
        emotionalPreference: '',


    });

    const handleAgeChange = (age: string) => {
        setResponse({
            ...response,
            age: parseInt(age),
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

    const handleTimeChange = (timeAvailability: string) => {
        setResponse({...response, timeAvailability: timeAvailability});
    };

    const handleTrainingPreferenceChange = (trainingPreference: string) => {
        setResponse({...response, trainingPreference: trainingPreference});
    };

    const handleDurationChange = (durationPreference: string) => {
        setResponse({...response, durationPreference: durationPreference});
    };
    const handleIntensityChange = (intensityPreference: string) => {
        setResponse({...response, intensityPreference: intensityPreference});
    };


    const handleSubmit = async () => {
        const requestBody = {
            age: response.age,
            height: response.height,
            weight: response.weight,
            bmi: response.bmi,
            timeAvailability: response.timeAvailability,
            trainingPreference: response.trainingPreference,
            durationPreference: response.durationPreference,
            intensityPreference: response.intensityPreference,
            skillPreference: response.skillPreference,
            socialPreference: response.socialPreference,
            locationPreference: response.locationPreference,
            emotionalPreference: response.emotionalPreference,

            userId: userId,
        };

        console.log(requestBody);

        try {
            const response = await fetch('http://10.0.2.2:5000/Antecedents/onboarding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            if (response.ok) {
                setIsOnBoarded(data.success);  // Success response
            } else {
                console.log(`[ERROR]: ${data.error}`);
            }
        } catch (error) {
            console.log('An error occurred:', error);  // Error handling
        }

    };


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

            < View style={styles.slide}>
                <Text style={styles.headerText}>Activity Assessment</Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Time Availability</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.timeAvailability}
                            onValueChange={(value) =>
                                setResponse({...response, timeAvailability: value})
                            }
                        >
                            <Picker.Item label="Select" value=""/>
                            <Picker.Item label="Morning" value="morning"/>
                            <Picker.Item label="Midday" value="midday"/>
                            <Picker.Item label="Afternoon" value="afternoon"/>
                            <Picker.Item label="Evening" value="evening"/>
                        </Picker>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Workout Intensity Preference</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.intensityPreference}
                            onValueChange={(value) =>
                                setResponse({...response, intensityPreference: value})
                            }
                        >
                            <Picker.Item label="Select" value=""/>
                            <Picker.Item label="Moderate" value="Moderate"/>
                            <Picker.Item label="Intensive" value="Itensive"/>
                        </Picker>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Duration Availability</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.durationPreference}
                            onValueChange={(value) =>
                                setResponse({...response, durationPreference: value})
                            }
                        >
                            <Picker.Item label="Select" value=""/>
                            <Picker.Item label="between 15-30 Minutes" value="short_duration"/>
                            <Picker.Item label="between 30-60 Minutes" value="medium_duration"/>
                            <Picker.Item label="more than 60 Minutes" value="long_duration"/>
                        </Picker>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.label}>Activity Preference</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.trainingPreference}
                            onValueChange={(value) =>
                                setResponse({...response, trainingPreference: value})
                            }
                        >
                            <Picker.Item label="Select" value=""/>
                            <Picker.Item label="HIIT" value="hiit"/>
                            <Picker.Item label="Endurance Training" value="endurance"/>
                            <Picker.Item label="Strength Training " value="strength"/>
                        </Picker>
                    </View>
                </View>
            </View>
            < View style={styles.slide}>
                <Text style={styles.headerText}>Activity Assessment</Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Social Preference</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={response.socialPreference}
                            onValueChange={(value) =>
                                setResponse({...response, socialPreference: value})
                            }
                        >
                            <Picker.Item label="Select" value=""/>
                            <Picker.Item label="I want to workout alone" value="single"/>
                            <Picker.Item label="I want to workout in a group" value="group"/>

                        </Picker>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Your Skill Level</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={response.skillPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, skillPreference: value})
                                }
                            >
                                <Picker.Item label="Select" value=""/>
                                <Picker.Item label="I'm at a beginner level" value="beginner"/>
                                <Picker.Item label="I'm at a intermediate level" value="intermediate"/>

                            </Picker>
                        </View>
                    </View>


                    <View style={styles.field}>
                        <Text style={styles.label}>Location Preference</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={response.locationPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, locationPreference: value})
                                }
                            >
                                <Picker.Item label="Select" value=""/>
                                <Picker.Item label="I like to workout outdoors" value="outdoor"/>
                                <Picker.Item label="I like to workout indoors" value="indoor"/>

                            </Picker>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Emotional Preference</Text>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={response.emotionalPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, emotionalPreference: value})
                                }
                            >
                                <Picker.Item label="Select" value=""/>
                                <Picker.Item label="I like workouts that relax me" value="relaxing"/>
                                <Picker.Item label="I like workouts that make me sweat!" value="exciting"/>

                            </Picker>
                        </View>
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
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
    },
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
        backgroundColor: 'white',

    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 9,
        color: 'black'
    },

    field: {
        width: '80%',
        marginTop: 5,
        marginBottom: 5,
        elevation: 2

    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        fontSize: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        elevation: 2
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
        backgroundColor: '#0E9CDA',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
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
