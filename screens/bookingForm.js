import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon library
import { API_BASE_URL } from '@env';

const BookingForm = () => {
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [numFamilyMembers, setNumFamilyMembers] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [installmentType, setInstallmentType] = useState('');
    const [userId, setUserId] = useState(null);
    const [property, setProperty] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { propertyId, ownerId } = route.params;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetchUserDataForCurrentUser(); // Replace with your function
                setUserId(res?.uid);
                setEmail(res.email);
                setName(res.firstName);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchPropertyData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/getPropertyById/${propertyId}`);
                if (!response.ok) throw new Error('Failed to fetch property');
                const propertyData = await response.json();

                setProperty(propertyData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
        fetchPropertyData();
    }, [propertyId]);

    const handleSubmit = async () => {
        if (userId) {
            const requestData = { userId, name, contactNo, email, numFamilyMembers, startDate, installmentType, ownerId, propertyId };

            try {
                await axios.post('http://192.168.10.5:3001/booking-request', requestData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setName('');
                setContactNo('');
                setEmail('');
                setNumFamilyMembers('');
                setStartDate(new Date());
                setInstallmentType('');
                Alert.alert('Success', 'Request submitted successfully');
                navigation.goBack(); // Navigate back or to another screen
            } catch (error) {
                console.error('Error submitting booking request:', error);
                Alert.alert('Error', 'Error submitting request');
            }
        } else {
            Alert.alert('Error', 'User ID is missing');
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowDatePicker(false);
        setStartDate(currentDate);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Icon name="info-circle" size={24} color="#007BFF" style={styles.icon} />
                <Text style={styles.header}>Submit Request For {property?.propertyName}</Text>
            </View>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Contact No"
                    value={contactNo}
                    onChangeText={setContactNo}
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Number of Family Members"
                    value={numFamilyMembers}
                    onChangeText={setNumFamilyMembers}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Start Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                    <Text style={styles.datePickerText}>{startDate.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Select Installment Type</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Installment Type"
                    value={installmentType}
                    onChangeText={setInstallmentType}
                />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 120
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    icon: {
        marginRight: 8,
        marginTop: 15
    },
    header: {
        fontSize: 16,
        textTransform: "capitalize",
        marginBottom: 15,
        marginTop: 30,
    },
    card: {
        backgroundColor: '#fff',
        padding: 5,
        marginBottom: 23,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
        borderRadius: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        paddingHorizontal: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    datePickerButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
    },
    datePickerText: {
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#8dc6ff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingForm;
