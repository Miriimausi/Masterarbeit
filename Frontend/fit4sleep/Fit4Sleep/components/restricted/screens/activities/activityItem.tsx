import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {Activity} from "./activities";
import axios from "axios";

export interface IActivityItemProps {
    navigation: any,
    activity: Activity,
}



const ActivityItem = (props: IActivityItemProps) => {

    const likeActivity = async (activityId: number) => {
        try {
            console.log(activityId);
            const response = await axios.put(`http://10.0.2.2:5000/activities/like/${activityId}`);
            const updatedActivity = response.data;
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
            console.log("disliked");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <TouchableOpacity style={styles.tile}
                          onPress={() => props.navigation.navigate('ActivitiesDetails', {activity: props.activity})}>
            <Image source={{uri: props.activity.imageUrl}} style={styles.tileImage}/>
            <View style={styles.tileDetails}>
                <Text style={styles.tileTitle}>{props.activity.name}</Text>
                <Text style={styles.tileDescription}>{props.activity.description}</Text>
            </View>
            <View style={styles.tileActions}>
                <TouchableOpacity onPress={() => likeActivity(props.activity.id)} style={styles.actionButton}>
                    <Icon name="thumb-up" size={30} color="#0E9CDA"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dislikeActivity(props.activity.id)} style={styles.actionButton}>
                    <Icon name="thumb-down" size={30} color="#0E9CDA"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

}



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

export default ActivityItem;