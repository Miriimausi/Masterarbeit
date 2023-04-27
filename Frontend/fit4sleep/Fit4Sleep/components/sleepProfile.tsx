import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const SleepProfile = () => {
    const [hoursSlept, setHoursSlept] = useState(8);

    const handleIncreaseHours = () => {
        setHoursSlept(hoursSlept + 1);
    };

    const handleDecreaseHours = () => {
        if (hoursSlept > 0) {
            setHoursSlept(hoursSlept - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.headerTitle}>My Sleep Profile</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statContainer}>
                        <Text style={styles.statTitle}>Hours Slept</Text>
                        <View style={styles.statValueContainer}>
                            <TouchableOpacity onPress={handleDecreaseHours}>
                                <Image source={require('../assets/minus.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Text style={styles.statValue}>{hoursSlept}</Text>
                            <TouchableOpacity onPress={handleIncreaseHours}>
                                <Image source={require('../assets/plus.png')} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.statTitle}>Sleep Quality</Text>
                        <View style={styles.statValueContainer}>
                            <Text style={styles.statValue}>80%</Text>
                        </View>
                    </View>
                    <View style={styles.statContainer}>
                        <Text style={styles.statTitle}>Sleep Questionnaire Result</Text>
                        <View style={styles.statValueContainer}>
                            <Text style={styles.statValue}>85%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    profileContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    statContainer: {
        alignItems: 'center',
    },
    statTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    statValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default SleepProfile;
