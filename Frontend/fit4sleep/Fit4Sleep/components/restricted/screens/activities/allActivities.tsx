import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigator";
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ActivityItem from "./activityItem";
import Swiper from "react-native-swiper";

export type Activity = {
    id: number,
    name: string,
    description: string,
    type: string,

    intensity: string,
    imageUrl?: string
}

type ActivitiesProps = {
    navigation: NavigationProp<RootStackParamList, 'AllActivities'>
}


const AllActivities = ({navigation}: ActivitiesProps) => {
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
                        <View style={styles.tilesContainer}>
                            {activities.map((activity: Activity, index: number) => (
                                <ActivityItem
                                    imageHeight={150}
                                    width={"47.0%"}
                                    key={index}
                                    navigation={navigation}
                                    activity={activity}
                                ></ActivityItem>
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
        paddingHorizontal: 3
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    tilesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    tileContainerRecommended: {
        flex: 1,
        flexDirection: 'column',
        width: 400,
        alignItems: 'center',
        alignSelf: 'center', // Zentrierung der Aktivitäten
    },
    tile: {
        width: '90%', // Breite der Tiles anpassen
        height: 150, // Höhe der Tiles anpassen
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    tileImage: {
        width: '100%',
        height: 100,
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


export default AllActivities;
