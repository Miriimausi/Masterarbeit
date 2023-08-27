import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Activity} from "./allActivities";

export interface IActivityItemProps {
    navigation: any,
    width: string,
    imageHeight: number,
    activity: Activity,
}


const ActivityItem = (props: IActivityItemProps) => {


    return (
        <TouchableOpacity style={[styles.tile, {width: props.width}]}
                          onPress={() => props.navigation.navigate('ActivitiesDetails', {activity: props.activity})}>
            <Image source={{uri: props.activity.imageUrl}} style={[styles.tileImage, {height: props.imageHeight}]}/>
            <View style={styles.tileDetails}>
                <Text style={styles.tileTitle}>{props.activity.name}</Text>
                <Text style={styles.tileDescription}>{props.activity.description}</Text>
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
        // paddingHorizontal: 20,
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
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4
    },
    tileImage: {
        width: '100%',
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