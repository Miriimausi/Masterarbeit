import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {NavigationProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigator";
import {
    View,
    StyleSheet,
    ScrollView,
    Button,
    SafeAreaView,
    StatusBar,
    Animated,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';
import {AuthContext, AuthContextType} from "../../../../contexts/auth-context";
import ActivityItem from "./activityItem";
import { MaterialIcons } from '@expo/vector-icons';

export type Activity = {
    id: number,
    name: string,
    description: string,
    type: string,
    intensity: string,
    imageUrl?: string
}

type ActivitiesProps = {
    navigation: NavigationProp<RootStackParamList>
}

const RecommendedActivities = ({navigation}: ActivitiesProps) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isInitialised, setIsInitialised] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const {userId} = useContext(AuthContext) as AuthContextType;

    useEffect(() => {
        calculate();
    }, []);


    const calculate = async () => {
        setIsRefreshing(true);
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
            setIsRefreshing(false);
            setIsInitialised(true);
        } catch (error) {
            // Handle the error
            setIsRefreshing(false);
            setIsInitialised(true);
            console.error(error);
        }
    };

    const renderItem = ({item}: { item: Activity }) => {

        return (
            <ActivityItem
                imageHeight={250}
                width="100%"
                key={item.id}
                navigation={navigation}
                activity={item}
            />

        );
    };

    if (!isInitialised) {
        return (
            <View>
                <ActivityIndicator style={{marginTop: 24}} size="large" color={"#000000"} />
            </View>
        )

    }

    return (
        <SafeAreaView>
            {
                activities.length > 0 ?
                    <FlatList renderItem={renderItem} data={activities}
                              contentContainerStyle={{paddingTop: 12, paddingHorizontal: 12}}
                              ItemSeparatorComponent={
                                  () => <View style={{height: 9}}></View>
                              }
                              refreshing={isRefreshing}
                              onRefresh={calculate}
                    >
                    </FlatList> :
                    <View style={{width: "80%", backgroundColor:"white", alignSelf:"center", marginTop: 21, paddingVertical: 30, paddingHorizontal: 30, borderRadius: 10, elevation: 2, justifyContent:"center", alignItems:"center"}}>
                        <Text style={{color: "grey", textAlign:"center"}}>Unfortunately we could not find any fitting activities for you.</Text>
                        <MaterialIcons style={{marginTop: 30}} name="search-off" size={48} color="grey" />
                    </View>
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    slide: {
        flex: 1,
        // Add your desired styles here
    },
    ActivitiesContainer: {
        padding: 20
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
