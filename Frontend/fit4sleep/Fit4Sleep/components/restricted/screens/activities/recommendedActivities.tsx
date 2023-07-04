import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigator";
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import ActivityItem from "./activityItem";
import {AuthContext, AuthContextType} from "../../../../contexts/auth-context";

export type Activity = {
    id: number,
    name: string,
    description: string,
    type: string,
    intensity: string,
    imageUrl?: string
}

type ActivitiesProps = {
    navigation: NavigationProp<RootStackParamList, 'RecommendedActivities'>
}

const RecommendedActivities = ({navigation}: ActivitiesProps) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [calculateResponse, setCalculateResponse] = useState<any>(null);
    const {userId} = useContext(AuthContext) as AuthContextType;

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:5000/activities/');
                setActivities(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchActivities();
    }, []);

    const calculate = async () => {
        const url = `http://10.0.2.2:5000/Antecedents/calculateSimilarity/${userId}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setActivities(data.activities); // Update the state with 'data.activities' instead
            console.log(data);
        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };

    useEffect(() => {
        calculate();
    }, []);

    return (
        <View style={styles.slide}>
            <View style={styles.buttonContainer}>
                <Button title="Refresh" onPress={calculate}/>
            </View>
            <ScrollView style={styles.ActivitiesContainer}>
                <View style={styles.container}>
                    <View style={styles.tileContainerRecommended}>
                        {activities.map((activity, index) => (
                            <ActivityItem
                                imageHeight={250}
                                width="100%"
                                key={index}
                                navigation={navigation}
                                activity={activity}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        // Add your desired styles here
    },
    ActivitiesContainer: {
        // Add your desired styles here
    },
    container: {
        // Add your desired styles here
    },
    tileContainerRecommended: {
        // Add your desired styles here
    },
    buttonContainer: {
        marginBottom: 20,
        color: '#0E9CDA'

        // Add your desired styles here
    },
    topScoresContainer: {
        // Add your desired styles here
    },
});

export default RecommendedActivities;
