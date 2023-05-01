import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigator";
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"  ;
import { TouchableOpacity } from "react-native-gesture-handler";
import Collapsible from 'react-native-collapsible';
import axios from "axios";
import React, {useEffect, useState} from "react";
import {  ScrollView } from 'react-native';




type Activity = {
    id: number,
    name: string,
    description: string,
    tracked: number,
    liked: number,
}


type ActivitiesDetailsProps = {
    navigation: NavigationProp<RootStackParamList, 'ActivitiesDetails'>,
    route: RouteProp<RootStackParamList, 'ActivitiesDetails'>,
}

const ActivitiesDetails = ({ navigation, route }: {navigation: any, route: any}) => {
    const { activity } = route.params;
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isTableCollapsed, setIsTableCollapsed] = useState(true);
    const [trackingCount, setTrackingCount] = useState(0);
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
            const response = await axios.put(`http://10.0.2.2:5000/activities/like/${activityId}`);
            const updatedActivity = response.data;
            setActivities(prevActivities => prevActivities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity));
        } catch (error) {
            console.error(error);
        }
    };

    const dislikeActivity = async (activityId: number) => {
        try {
            const response = await axios.put(`http://10.0.2.2:5000/activities/dislike/${activityId}`);
            const updatedActivity = response.data;
            setActivities(prevActivities => prevActivities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity));
        } catch (error) {
            console.error(error);
        }
    };

    const trackActivity = async (activityId: number, count: number) => {
        try {
            const response = await axios.put(`http://10.0.2.2:5000/activities/tracked/${activityId}`);
            const updatedActivity = response.data;
            setActivities(prevActivities => prevActivities.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity));
        } catch (error) {
            console.error(error);
        }
    };

        const toggleTable = () => {
            setIsTableCollapsed(!isTableCollapsed);
        };

    const showInfo = () => {
        alert('Heart rate zone limits indicate in which heart rate zone the training is most effective. The values vary from very light to maximum depending on the training intensity.' );
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{activity.name}</Text>
                    <Text style={styles.description}>{activity.description}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => likeActivity(activity.id)} style={styles.actionButton}>
                            <Icon name="thumb-up" size={30} color="#0E9CDA" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dislikeActivity(activity.id)} style={styles.actionButton}>
                            <Icon name="thumb-down" size={30} color="#0E9CDA" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <TouchableOpacity onPress={toggleTable}>
                        <View style={styles.tableTitleContainer}>
                            <Text style={styles.tableTitle}>Heart rate zone limits</Text>
                            <View style={styles.infoButtonContainer}>
                                <TouchableOpacity onPress={showInfo}>
                                    <Icon name="info" size={25} color="#0E9CDA" />
                                </TouchableOpacity>
                            </View>
                            <Icon name={isTableCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'} size={30} color="#0E9CDA" />
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={isTableCollapsed}>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableHeader]}>Intensity</Text>
                                <Text style={[styles.tableCell, styles.tableHeader]}>Heart rate zone</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableLabel, styles.red]}>Maximum</Text>
                                <Text style={[styles.tableCell, styles.tableData]}>177-197</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableLabel, styles.yellow]}>Hard</Text>
                                <Text style={[styles.tableCell, styles.tableData]}>158-176</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableLabel, styles.green]}>Medium</Text>
                                <Text style={[styles.tableCell, styles.tableData]}>138-157</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableLabel, styles.lightblue]}>Light</Text>
                                <Text style={[styles.tableCell, styles.tableData]}>118-137</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableLabel, styles.gray]}>Easy</Text>
                                <Text style={[styles.tableCell, styles.tableData]}>99-117</Text>
                            </View>
                        </View>
                    </Collapsible>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.trackedCountContainer}>
                        <Text style={styles.trackedCountText}>Track this activity</Text>
                        <TouchableOpacity onPress={() => trackActivity(activity.id, trackingCount)}>
                            <Icon name="add" size={40} color="#0E9CDA" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF2F7',
        padding: 20,
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 10,
        overflow: 'hidden',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        backgroundColor:'#EDF2F7'
    },
    description: {
        fontSize: 16,
        margin: 10,

    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
    },
    tableTitle: {
        fontSize: 16,
        fontWeight: 'bold',

    },

    tableTitleContainer: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: 'white',
        color: 'black',
    },

    infoText:{
        font:12,
        color: 'black',
    },
    infoButtonContainer: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        margin: 10,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tableCell: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    tableCellText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    tableHeader: {
        fontWeight: 'bold',
    },
    tableLabel: {
        textAlign: 'center',
    },
    tableData: {
        textAlign: 'center',
    },
    red: {
        backgroundColor: '#FF0000',
        color: 'white',
    },
    yellow: {
        backgroundColor: '#FF8000',
        color: 'white',
    },
    green: {
        backgroundColor: '#04B404',
        color: 'white',
    },
    lightblue: {
        backgroundColor: '#58D3F7',
        color:'white'
    },
    gray: {
        backgroundColor: '#D8D8D8',
        color: 'white',
    },
    trackedCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        margin: 10
    },
    trackedIcon: {
        marginRight: 5,
    },
    trackedCountText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    trackedCountPicker:{

    },

});

export default ActivitiesDetails;