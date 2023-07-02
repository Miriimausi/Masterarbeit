import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigator";
import {View, StyleSheet, ScrollView} from 'react-native';
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
    

    return (
        <View style={styles.slide}>
            <ScrollView style={styles.ActivitiesContainer}>
                <View style={styles.container}>
                    <View style={styles.tileContainerRecommended}>
                        {activities.map((activity: Activity, index: number) => (
                            <ActivityItem
                                imageHeight={250}
                                width={"100%"}
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
        backgroundColor: '#fff',
        paddingHorizontal: 2,
        paddingTop: 2,
    },
    ActivitiesContainer: {
        flex: 1,
        backgroundColor: '#eee',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    tileContainerRecommended: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
});

export default RecommendedActivities;
