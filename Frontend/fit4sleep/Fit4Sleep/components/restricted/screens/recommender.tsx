import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Image, SafeAreaView, ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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
    accessories: String;

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
            accessories: '',
        });
        const ActivityItem = (props: any) => {
            return (
                <TouchableOpacity style={{width: "100%", height: "100%", borderRadius: 15}}
                                  onPress={() => props.navigation.navigate('ActivitiesDetails', {activity: props.activity})}>
                    <Image source={{uri: props.activity.imageUrl}}
                           style={{width: "100%", height: "100%", resizeMode: "cover", borderRadius: 15}}/>
                </TouchableOpacity>
            )

        }

        const {userId} = useContext(AuthContext) as AuthContextType;
        const [timeAvailability, setTimeAvailability] = useState<number | null>(null);
        const [trainingPreference, setTrainingPreference] = useState<number | null>(null);
        const [intensityPreference, setIntensityPreference] = useState<number | null>(null);
        const [durationPreference, setDurationPreference] = useState<number | null>(null);
        const [skillPreference, setSkillPreference] = useState<number | null>(null);
        const [socialPreference, setSocialPreference] = useState<number | null>(null);
        const [locationPreference, setLocationPreference] = useState<number | null>(null);
        const [emotionalPreference, setEmotionalPreference] = useState<number | null>(null);
        const [accessories, setAccessories] = useState<number | null>(null);
        const [activities, setActivities] = useState<Activity[]>([]);
        const [showRecommendedActivity, setShowRecommendedActivity] = useState(false);
        const [isEditingPreferences, setIsEditingPreferences] = useState<boolean>(false);

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
                    setAccessories(response.data.accessories);

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
                } catch (error) {
                    // Handle the error
                    console.error(error);
                }
            };

            fetchActivities();
        }, [userId]);

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
                accessories: response.accessories
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
            <>
                {
                    !isEditingPreferences &&
                    <SafeAreaView style={{backgroundColor: "white", height: "100%"}}>
                        <View
                            style={{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 24}}>
                            <Text style={styles.headerText}>Which workout should we do today?</Text>
                            <View style={{
                                height: 180,
                                width: 180,
                                backgroundColor: "#e8e3e3",
                                borderRadius: 15,
                                borderColor: "#8d8a8a",
                                elevation: 1
                            }}>
                                {
                                    activities.length > 0 &&
                                    <ActivityItem activity={response.timeAvailability === 'evening'
                                        ? activities.find(activity => activity.intensity === 'Moderate') || activities[0]
                                        : activities[0]} navigation={navigation}/>
                                }
                                {
                                    activities.length <= 0 &&
                                    <View style={{
                                        width: "100%",
                                        paddingHorizontal: 18,
                                        alignSelf: "center",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <Text style={{fontSize: 18, textAlign: "center", color: "#8d8a8a"}}>Press the
                                            recommend
                                            button to get an activity recommended based on your
                                            preferences.</Text>
                                    </View>
                                }

                            </View>
                            {
                                activities.length > 0 &&
                                <View style={styles.tileDetails}>
                                    <Text style={[styles.tileTitle]}>{activities[0].name}</Text>
                                    <Text style={[styles.tileDescription]}>{activities[0].description}</Text>
                                </View>
                            }
                        </View>
                        <View>
                            <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Recommend</Text>
                            </TouchableOpacity>
                            <View style={{
                                alignSelf: "center",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <View style={{backgroundColor: "#9a9898", height: 1, width: 100}}/>
                                <Text style={{
                                    marginHorizontal: 15,
                                    marginVertical: 6,
                                    color: "#9a9898",
                                    fontSize: 15
                                }}>or</Text>
                                <View style={{backgroundColor: "#9a9898", height: 1, width: 100}}/>

                            </View>
                            <TouchableOpacity style={[styles.outlinedButton]} onPress={() => {
                                setIsEditingPreferences(true);
                            }}>
                                <Text style={styles.outlinedButtonText}>Change Preferences</Text>
                            </TouchableOpacity>
                        </View>

                    </SafeAreaView>
                }
                {
                    isEditingPreferences &&
                    <ScrollView style={{paddingHorizontal: "2.5%", height: "100%", backgroundColor: "white"}}>


                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 24, marginBottom: 9}}> <Icon
                            name="schedule" size={24} color="#0E9CDA"/> Preferred
                            Time</Text>
                        <View style={styles.newPicker}>
                            <Picker
                                placeholder={"Select Time"}
                                selectedValue={response.timeAvailability}
                                onValueChange={(value) =>
                                    setResponse({...response, timeAvailability: value})
                                }
                            >

                                <Picker.Item label="Morning" value="morning"/>
                                <Picker.Item label="Midday" value="midday"/>
                                <Picker.Item label="Afternoon" value="afternoon"/>
                                <Picker.Item label="Evening" value="evening"/>
                            </Picker>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 9}}> <Icon
                            name="trending-up" size={24} color="#0E9CDA"/>Skill
                            Level</Text>
                        <View style={styles.newPicker}>

                            <Picker
                                selectedValue={response.skillPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, skillPreference: value})
                                }
                            >
                                <Picker.Item label="I am a beginner" value="beginner"/>
                                <Picker.Item label="I want a challenge" value="intermediate"/>

                            </Picker>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 9}}> <Icon
                            name="more-time" size={30} color="#0E9CDA"/> Preferred
                            Duration</Text>
                        <View style={styles.newPicker}>
                            <Picker
                                selectedValue={response.durationPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, durationPreference: value})
                                }
                            >
                                <Picker.Item label="between 15-30 Minutes" value="short_duration"/>
                                <Picker.Item label="between 30-60 Minutes" value="medium_duration"/>
                                <Picker.Item label="more than 60 Minutes" value="long_duration"/>
                            </Picker>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 9}}> <Icon
                            name="directions-run" size={30} color="#0E9CDA"/> Preferred
                            Workout Type</Text>
                        <View style={styles.newPicker}>
                            <Picker
                                selectedValue={response.trainingPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, trainingPreference: value})
                                }
                            >
                                <Picker.Item label="HIIT" value="hiit"/>
                                <Picker.Item label="Endurance Training" value="endurance"/>
                                <Picker.Item label="Strength Training " value="strength"/>
                            </Picker>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 9}}> <Icon
                            name="groups" size={30} color="#0E9CDA"/> Social
                            Preference </Text>
                        <View style={styles.newPicker}>
                            <Picker
                                selectedValue={response.emotionalPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, emotionalPreference: value})
                                }
                            >
                                <Picker.Item label="I want to workout alone" value="single"/>
                                <Picker.Item label="I want to workout in a group" value="group"/>
                            </Picker>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 9}}> <Icon
                            name="pin-drop" size={30} color="#0E9CDA"/>Preferred
                            Location</Text>
                        <View style={styles.newPicker}>
                            <Picker
                                selectedValue={response.locationPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, locationPreference: value})
                                }
                            >
                                <Picker.Item label="I want to workout outdoors" value="outdoor"/>
                                <Picker.Item label="I want to workout indoors" value="indoor"/>
                            </Picker>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 9}}> <Icon
                            name="sports-tennis" size={24}
                            color="#0E9CDA"/>Preferred
                            Equipment</Text>
                        <View style={styles.newPicker}>
                            <Picker
                                selectedValue={response.accessories}
                                onValueChange={(value) =>
                                    setResponse({...response, accessories: value})
                                }
                            >
                                <Picker.Item label="I want to use Equipment" value="with_accessories"/>
                                <Picker.Item label="I do not want to use Equipment" value="without_accessories"/>
                            </Picker>
                        </View>

                        <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 18, marginBottom: 9}}> <Icon
                            name="sentiment-satisfied" size={30}
                            color="#0E9CDA"/> Emotional
                            Preference</Text>
                        <View style={styles.newPicker}>
                            <Picker
                                selectedValue={response.emotionalPreference}
                                onValueChange={(value) =>
                                    setResponse({...response, emotionalPreference: value})
                                }
                            >
                                <Picker.Item label="I want a workout that relaxes me" value="relaxing"/>
                                <Picker.Item label="I want a workout that make me sweat!" value="exciting"/>

                            </Picker>
                        </View>
                        <TouchableOpacity style={[styles.preferencesButton]} onPress={() => {
                            setIsEditingPreferences(false);
                        }}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                    </ScrollView>
                }

            </>

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
        maxWidth: "80%",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 24,
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
        borderRadius: 30,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 5,
    },
    newPicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 2,
    },
    picker2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        width: '125%',
        backgroundColor: '#fff',
        elevation: 5,
    },
    surveyContainer: {
        alignItems: 'center',
        height: '70%',
        marginBottom: 30,
        backgroundColor: 'white',
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
        width: '80%',
        alignSelf: "center"
    },
    preferencesButton: {
        backgroundColor: '#0E9CDA',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        marginTop: 24,
        alignSelf: "center"
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    outlinedButton: {
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '80%',
        alignSelf: "center",
        borderColor: "#0E9CDA",
        borderWidth: 1,
        justifyContent: "center", alignItems: "center"
    },
    outlinedButtonText: {
        color: "#0E9CDA",
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
    tile: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 5,
        overflow: 'hidden',
    },
    tileImage: {
        width: '100%',
    },
    tileDetails: {
        marginTop: 32,
        maxWidth: "85%"
    },
    tileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tileDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    textCentered: {
        textAlign: "center"
    }
});
export default Recommender;
