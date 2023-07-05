import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Swiper from 'react-native-swiper';
import {white} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import {AuthContext, AuthContextType} from "../../../contexts/auth-context";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "../../navigator";
import {Activity} from "./activities/recommendedActivities";

interface RecommenderInterface {
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

type RecommenderProps = {
    navigation: NavigationProp<RootStackParamList>
}

const Recommender = ({navigation}: RecommenderProps) => {
        const [response, setResponse] = useState<RecommenderInterface>({
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


        const {userId, username, password, email} = useContext(AuthContext) as AuthContextType;
        const [answers, setAnswers] = useState<(string | null)[]>([]);
        const [timeAvailability, setTimeAvailability] = useState<number | null>(null);
        const [trainingPreference, setTrainingPreference] = useState<number | null>(null);
        const [intensityPreference, setIntensityPreference] = useState<number | null>(null);
        const [durationPreference, setDurationPreference] = useState<number | null>(null);
        const [skillPreference, setSkillPreference] = useState<number | null>(null);
        const [socialPreference, setSocialPreference] = useState<number | null>(null);
        const [locationPreference, setLocationPreference] = useState<number | null>(null);
        const [emotionalPreference, setEmotionalPreference] = useState<number | null>(null);
        const [activities, setActivities] = useState<Activity[]>([]);
        const [showRecommendedActivity, setShowRecommendedActivity] = useState(false);

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


        useEffect(() => {
            axios
                .get(`http://10.0.2.2:5000/Antecedents/getPreferences/${userId}`)
                .then((response) => {
                    setIntensityPreference(response.data.intensityPreference);
                    setTrainingPreference(response.data.trainingPreference);
                    setTimeAvailability(response.data.timeAvailability);
                    setDurationPreference(response.data.durationPreference);
                    setSkillPreference(response.data.skillPreference);
                    setSocialPreference(response.data.socialPreference);
                    setLocationPreference(response.data.locationPreference);
                    setEmotionalPreference(response.data.emotionalPreference);

                })
                .catch((error) => {
                    console.log(error);
                });
        }, []);


        useEffect(() => {
            const fetchActivities = async () => {
                const url = `http://10.0.2.2:5000/Antecedents/calculateSimilarity/${userId}`;

                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const data = await response.json();
                    setActivities(data.activities);
                    setShowRecommendedActivity(true);
                    console.log(data);
                } catch (error) {
                    // Handle the error
                    console.error(error);
                }
            };

            fetchActivities();
        }, [userId]);

        const handleSubmit = async () => {
            if (response.timeAvailability === 'afternoon' || response.timeAvailability === 'evening') {
                setResponse({...response, intensityPreference: 'Moderate'});
            } else {
                setResponse({...response});
            }


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
            };

            console.log(requestBody);
            const url = `http://10.0.2.2:5000/Antecedents/calculateRecommendation/${userId}`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                const data = await response.json();
                setActivities(data.activities);
            } catch (error) {
                console.error(error);
            }
        };


        return (
            <Swiper showsButtons={true} loop={false}>

                <View style={styles.slide}>
                    <Text style={styles.headerText}>Which workout should we do today? </Text>
                    <View style={styles.field}>
                        <Text style={styles.label}> <Icon name="schedule" size={24} color="#0E9CDA"/> Time
                            Availability: {timeAvailability}</Text>
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
                        <Text style={styles.label}> <Icon name="more-time" size={30} color="#0E9CDA"/> Duration
                            Availability: {durationPreference}</Text>
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
                        <Text style={styles.label}> <Icon name="directions-run" size={30} color="#0E9CDA"/> Activity
                            Preference: {trainingPreference} </Text>
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
                <View style={styles.slide}>
                    <View style={styles.field}>
                        <Text style={styles.label}> <Icon name="groups" size={30} color="#0E9CDA"/> Social
                            Preference: {socialPreference}</Text>
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
                            <Text style={styles.label}> <Icon name="person-pin" size={30} color="#0E9CDA"/> Location
                                Preference: {locationPreference}</Text>
                            <View style={styles.picker2}>
                                <Picker
                                    selectedValue={response.locationPreference}
                                    onValueChange={(value) =>
                                        setResponse({...response, locationPreference: value})
                                    }
                                >
                                    <Picker.Item label="Select" value=""/>
                                    <Picker.Item label="I want to workout outdoors" value="outdoor"/>
                                    <Picker.Item label="I want to workout indoors" value="indoor"/>

                                </Picker>
                            </View>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}> <Icon name="sentiment-satisfied" size={30}
                                                              color="#0E9CDA"/> Emotional
                                Preference: {emotionalPreference} </Text>
                            <View style={styles.picker2}>
                                <Picker
                                    selectedValue={response.emotionalPreference}
                                    onValueChange={(value) =>
                                        setResponse({...response, emotionalPreference: value})
                                    }
                                >
                                    <Picker.Item label="Select" value=""/>
                                    <Picker.Item label="I want a workout that relax me" value="relaxing"/>
                                    <Picker.Item label="I want a workout that make me sweat!" value="exciting"/>

                                </Picker>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={styles.slide}>
                    <View style={styles.surveyContainer}>
                        <Text style={styles.surveyText}>
                            The best Workout for you will be selected.
                        </Text>
                        {showRecommendedActivity && activities.length > 0 && (
                            <View>
                                <Text >{activities[0].name}</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.field}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Swiper>

        )
            ;


    }
;


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
        elevation: 2
    },

    picker2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '125%',
        backgroundColor: '#fff',
        elevation: 2
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
        width: '45%',
        alignSelf: "flex-end"
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
export default Recommender;
