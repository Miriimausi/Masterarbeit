import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./navigator";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

type Activity = {
    id: number,
    name: string,
    description: string,
    liked: number
}

type ActivitiesProps = {
    navigation: NavigationProp<RootStackParamList, 'Activities'>
}

const Activities = ({ navigation }: ActivitiesProps) => {
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


    // Details gibt es momentan noch nicht
    return (
        <ScrollView style={styles.ActivitiesContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Activities</Text>
                <View style={styles.tilesContainer}>
                    {activities.map((activity: Activity) => (
                        <TouchableOpacity key={activity.id} style={styles.tile} onPress={() => navigation.navigate('Details', { activity })}>
                            <Image source={{ uri: 'https://picsum.photos/200/300' }} style={styles.tileImage} />
                            <View style={styles.tileDetails}>
                                <Text style={styles.tileTitle}>{activity.name}</Text>
                                <Text style={styles.tileDescription}>{activity.description}</Text>
                            </View>
                            <View style={styles.tileActions}>
                                <TouchableOpacity onPress={() => likeActivity(activity.id)} style={styles.actionButton}>
                                    <Icon name="thumb-up" size={30} color="#0E9CDA" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => dislikeActivity(activity.id)} style={styles.actionButton}>
                                    <Icon name="thumb-down" size={30} color="#0E9CDA" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    ActivitiesContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
        backgroundColor: '#eee',
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
