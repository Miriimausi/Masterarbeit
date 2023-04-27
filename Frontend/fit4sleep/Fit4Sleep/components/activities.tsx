import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "./navigator";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ActivityItem from "./activityItem";

export type Activity = {
    id: number,
    name: string,
    description: string,
    liked: number,
    imageUrl?: string
}

type ActivitiesProps = {
    navigation: NavigationProp<RootStackParamList, 'Activities'>
}


const Activities = ({navigation}: ActivitiesProps) => {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        setActivities([
            {
                id: 1,
                name: "Test",
                description: "TestBeschreibung",
                liked: 3,
                imageUrl: "https://picsum.photos/200/100"
            },
            {
                id: 2,
                name: "Test",
                description: "TestBeschreibung",
                liked: 3,
                imageUrl: "https://picsum.photos/200/400"
            },
            {
                id: 3,
                name: "Test",
                description: "TestBeschreibung",
                liked: 3,
                imageUrl: "https://picsum.photos/200/600"
            },
            {
                id: 4,
                name: "Test",
                description: "TestBeschreibung",
                liked: 3,
                imageUrl: "https://picsum.photos/200/300"
            },
            {
                id: 5,
                name: "Test",
                description: "TestBeschreibung",
                liked: 3,
                imageUrl: "https://picsum.photos/200/800"
            },


        ])
    }, [])

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

    const likeActivity = async (activityId: number) => {
        try {
            console.log(activityId);
            const response = await axios.put(`http://10.0.2.2:5000/activities/like/${activityId}`);
            const updatedActivity = response.data;
            setActivities(prevActivities => prevActivities.map(a => a.id === updatedActivity.id ? updatedActivity : a));
            console.log("liked");
        } catch (error) {
            console.error(error);
        }
    };


    const dislikeActivity = async (activityId: number) => {
        try {
            console.log(activityId);
            const response = await axios.put(`http://10.0.2.2:5000/activities/dislike/${activityId}`);
            const updatedActivity = response.data;
            setActivities(prevActivities => prevActivities.map(a => a.id === updatedActivity.id ? updatedActivity : a));
            console.log("disliked");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.ActivitiesContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Activities</Text>
                <View style={styles.tilesContainer}>
                    {activities.map((activity: Activity, index: number) => (
                       <ActivityItem
                           key={index}
                           navigation={navigation}
                           activity={activity}
                           likeFun={likeActivity(activity.id)}
                           dislikeFun={dislikeActivity(activity.id)}
                       ></ActivityItem>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
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
    },
    tilesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    tile: {
        width: '48%',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    tileImage: {
        width: '100%',
        height: 150,
    },
    tileDetails: {
        padding: 10,
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
    tileActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    actionButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
});


export default Activities;
