import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigator";

interface CalendarProps {
    selectedDate?: Date;
    onDateSelect: (date: Date) => void;
    navigation: NavigationProp<RootStackParamList, 'Calendar'>;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [editedDate, setEditedDate] = useState<string>('');

    const renderCalendar = (): JSX.Element => {
        // Logic to generate calendar UI
        // You can customize this based on your requirements
        const weekDates = getWeekDates();

        return (
            <View>
                <View style={styles.calendarGrid}>
                    {weekDates.map((date: Date, index: number) => (
                        <TouchableOpacity key={index} onPress={() => handleDatePress(date)}>
                            <View style={[styles.calendarDay, { width: getDayWidth() }]}>
                                <Text style={styles.dayText}>{date.getDate()}</Text>
                                <TextInput
                                    style={styles.dayInput}
                                    value={date.toDateString() === editedDate ? editedDate : ''}
                                    onChangeText={(text) => handleDateChange(text)}
                                    onBlur={() => handleDateBlur(date)}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    const handlePrevWeek = (): void => {
        const prevWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
    };

    const handleNextWeek = (): void => {
        const nextWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const getWeekDates = (): Date[] => {
        // Logic to generate an array of dates for the current week
        // You can customize this based on your requirements
        const weekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
        const weekDates: Date[] = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    };

    const handleDatePress = (date: Date): void => {
        setEditedDate(date.toDateString());
    };

    const handleDateChange = (text: string): void => {
        setEditedDate(text);
    };

    const handleDateBlur = (date: Date): void => {
        setEditedDate('');
        // Logic to handle saving the edited date
        // You can customize this based on your requirements
        // Call the onDateSelect function with the updated date value
        onDateSelect(date);
    };

    const getDayWidth = (): string => {
        const { width } = Dimensions.get('window');
        return `${width / 7 - 10}px`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePrevWeek}>
                <Text style={styles.navigationText}>Previous Week</Text>
            </TouchableOpacity>
            {renderCalendar()}
            <TouchableOpacity onPress={handleNextWeek}>
                <Text style={styles.navigationText}>Next Week</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    calendarDay: {
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 2,
    },
    dayText: {
        fontSize: 16,
    },
    dayInput: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingVertical: 2,
    },
    navigationText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Calendar;
