import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./navigator";
import { Text, View } from 'react-native';

type Activity = {
    id: number,
    name: string,
    description: string,
    liked: boolean
}

type ActivitiesProps = {
    navigation: NavigationProp<RootStackParamList, 'Activities'>
}

const Activities = ({ navigation }: ActivitiesProps) => {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:5000/activity/activities');
                setActivities(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <View>
            <Text>Activities</Text>
            {activities.map(activity => (
                <View key={activity.id}>
                    <Text>{activity.name}</Text>
                </View>
            ))}
        </View>
    );
};

export default Activities;
