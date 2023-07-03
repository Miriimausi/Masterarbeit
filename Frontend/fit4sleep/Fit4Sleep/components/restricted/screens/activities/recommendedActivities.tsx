import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigator";
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import ActivityItem from "./activityItem";

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
    const [topScoresTraining, setTopScoresTraining] = useState([]);
    const [topScoresTime, setTopScoresTime] = useState([]);
    const [topScoresDuration, setTopScoresDuration] = useState([]);
    const [topScoresIntensity, setTopScoresIntensity] = useState([]);
    const [activityDetails, setActivityDetails] = useState<any[]>([]);
    const [sortedActivityIds, setSortedActivityIds] = useState([]);


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
        const url = 'http://10.0.2.2:5000/Antecedents/calculateSimilarity';

        const requestData = {
            id: 1,
            age: 25,
            height: 180,
            weight: 75,
            bmi: 23.5,
            timeAvailability: 'Evenings',
            trainingPreference: 'Strength training',
            durationPreference: '30 minutes',
            intensityPreference: 'Moderate',
            sleepScore: 8,
            userId: 12345,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            // Handle the response data
            const topN = 3;

            if (data.success && data.similarity_scores_training && data.similarity_scores_time && data.similarity_scores_intensity && data.similarity_scores_duration) {
                // Sort the similarity scores in descending order
                const sortedScoresTraining = data.similarity_scores_training.sort((a: { similarity_score: number }, b: { similarity_score: number }) => b.similarity_score - a.similarity_score);
                const sortedScoresTime = data.similarity_scores_time.sort((a: { similarity_score: number }, b: { similarity_score: number }) => b.similarity_score - a.similarity_score);
                const sortedScoresDuration = data.similarity_scores_duration.sort((a: { similarity_score: number }, b: { similarity_score: number }) => b.similarity_score - a.similarity_score);
                const sortedScoresIntensity = data.similarity_scores_intensity.sort((a: { similarity_score: number }, b: { similarity_score: number }) => b.similarity_score - a.similarity_score);

                // Select the top N activities from each category
                const topActivitiesTraining = sortedScoresTraining.slice(0, topN).map((score: { activity_id: number }) => score.activity_id);
                const topActivitiesTime = sortedScoresTime.slice(0, topN).map((score: { activity_id: number }) => score.activity_id);
                const topActivitiesDuration = sortedScoresDuration.slice(0, topN).map((score: { activity_id: number }) => score.activity_id);
                const topActivitiesIntensity = sortedScoresIntensity.slice(0, topN).map((score: { activity_id: number }) => score.activity_id);

                console.log('Training scores:', topActivitiesTraining);
                console.log('Time scores:', topActivitiesTime);
                console.log('Duration scores:', topActivitiesDuration);
                console.log('Intensity scores:', topActivitiesIntensity);

                // Combine all the top activity IDs
                const combinedActivities = [
                    ...topActivitiesTraining,
                    ...topActivitiesTime,
                    ...topActivitiesDuration,
                    ...topActivitiesIntensity,
                ];

                // Get the unique set of activity IDs
                const uniqueActivityIds = [...new Set(combinedActivities)];
                console.log('Scores:', combinedActivities);

                // Count the occurrences of each activity ID
                const activityIdCounts = uniqueActivityIds.reduce(
                    (counts, activityId) => {
                        counts[activityId] = (counts[activityId] || 0) + 1;
                        return counts;
                    },
                    {}
                );

                // Sort the activity IDs based on their occurrence count in descending order
                const sortedActivityIds = Object.keys(activityIdCounts).sort(
                    (a, b) => activityIdCounts[b] - activityIdCounts[a]
                );

                console.log('Sorted Activity IDs:', sortedActivityIds);

                // // Fetch activity details for the sorted activity IDs
                // const fetchActivityDetails = async () => {
                //     const activityDetails = [];
                //     for (const activityId of sortedActivityIds) {
                //         const activityUrl = `http://10.0.2.2:5000/Antecedents/getActivityDetails/${activityId}`;
                //         try {
                //             const activityResponse = await fetch(activityUrl);
                //             const activityData = await activityResponse.json();
                //             if (activityData.success && activityData.activity) {
                //                 activityDetails.push(activityData.activity);
                //             }
                //         } catch (error) {
                //             console.error(error);
                //         }
                //     }
                //     return activityDetails;
                // };
                //
                // const fetchedActivityDetails = await fetchActivityDetails();
                // setActivityDetails(fetchedActivityDetails);
                //
                //
                // console.log('Activity Details:', fetchedActivityDetails);
            }
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
                <Button title="Refresh" onPress={calculate} />
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
        // Add your desired styles here
    },
    topScoresContainer: {
        // Add your desired styles here
    },
});

export default RecommendedActivities;
