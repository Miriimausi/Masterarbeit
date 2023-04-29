import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SurveyResponse {
    age: number;
    height: number;
    weight: number;
    bmi: number;
    gender: string;
    sleepDuration: String;
}

const OnboardingSurvey = () => {
    const [response, setResponse] = useState<SurveyResponse>({
        age: 0,
        height: 0,
        weight: 0,
        bmi: 0,
        gender: '',
        sleepDuration: ''
    });


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

    const handleSleepDurationChange = (sleepDuration: string) => {
        setResponse({ ...response, sleepDuration: sleepDuration });
    };

    const calculateBmi = (weight: number, height: number): number => {
        // Calculate BMI using the weight and height values and return the result
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi;
    };


    const handleSubmit = () => {
        console.log(response);
        // Submit survey response here
    };


    // adding alcohol consumtion, smoking, sports, stress, depression?? - maybe divide the sleep parameters and the atenecedents
    return (
        <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
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
            <View style={styles.field}>
                <Text style={styles.label}>Sleep duration:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={response.sleepDuration}
                        onValueChange={(value) => setResponse({ ...response, sleepDuration: value })}
                    >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Less than 6 hours" value="less_than_6" />
                        <Picker.Item label="6-7 hours" value="6_7" />
                        <Picker.Item label="7-8 hours" value="7_8" />
                        <Picker.Item label="More than 8 hours" value="more_than_8" />
                    </Picker>

                </View>
            </View>


            <View style={styles.field}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#0E9CDA',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        marginVertical: 10,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',

    }
});
export default OnboardingSurvey;
