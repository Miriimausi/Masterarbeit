import {NavigationProp, RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigator";
import {View, Text, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"  ;
import {TouchableOpacity} from "react-native-gesture-handler";
import Collapsible from 'react-native-collapsible';
import axios from "axios";
import React, {useEffect, useState} from "react";
import {ScrollView} from 'react-native';
import Swiper from "react-native-swiper";


type Activity = {
    id: number,
    name: string,
    description: string,
    type: string,

    intensity: string,

    duration: number,
}


type ActivitiesDetailsProps = {
    navigation: NavigationProp<RootStackParamList, 'ActivitiesDetails'>,
    route: RouteProp<RootStackParamList, 'ActivitiesDetails'>,
}

const ActivitiesDetails = ({navigation, route}: { navigation: any, route: any }) => {
    const {activity} = route.params;
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


    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:5000/activities/${activitiesId}');
                setActivities(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchActivities();
    }, []);

    const toggleTable = () => {
        setIsTableCollapsed(!isTableCollapsed);
    };

    const showInfo = () => {
        alert('Heart rate zone limits indicate in which heart rate zone the training is most effective. The values vary from very light to maximum depending on the training intensity.');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Circuit training</Text>
                <Text style={styles.description}>Exercises are performed in sequence with little rest in between.</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Type:</Text>
                <Text style={styles.description}></Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Intensity:</Text>
                <Text style={styles.description}>Intensive</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Duration:</Text>
                <Text style={styles.description}>30 minutes</Text>
            </View>
            <View style={styles.detailsContainer}>
                <TouchableOpacity onPress={toggleTable}>
                    <View style={styles.tableTitleContainer}>
                        <Text style={styles.tableTitle}>Heart rate zone limits</Text>
                        <TouchableOpacity onPress={showInfo}>
                            <Icon name="info" size={25} color="#0E9CDA"/>
                        </TouchableOpacity>
                        <Icon
                            name={isTableCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                            size={30}
                            color="#0E9CDA"
                        />
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#EDF2F7',
        padding: 20,
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    description: {
        fontSize: 16,
        color: '#000',
    },
    tableTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    tableTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    tableCell: {
        flex: 1,
        padding: 5,
        textAlign: 'center',
    },
    tableHeader: {
        fontWeight: 'bold',
    },
    tableLabel: {
        backgroundColor: '#D8D8D8',
        color: 'white',
    },
    tableData: {
        backgroundColor: '#EDF2F7',
    },
    red: {
        backgroundColor: '#FF0000',
    },
    yellow: {
        backgroundColor: '#FF8000',
    },
    green: {
        backgroundColor: '#04B404',
    },
    lightblue: {
        backgroundColor: '#58D3F7',
    },
    gray: {
        backgroundColor: '#D8D8D8',
    },
});


export default ActivitiesDetails;
