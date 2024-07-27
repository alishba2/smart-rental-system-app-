import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { AppContext } from '../appContext';
import { API_BASE_URL } from '@env';
import moment from 'moment/moment';
import Icon from 'react-native-vector-icons/Ionicons';

const RentedProperties = () => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [error, setError] = useState(null);
    const [rentedProperties, setRentedProperties] = useState([]);
    const { loggedInUser } = useContext(AppContext);


    useEffect(() => {
        const fetchRentalDetails = async () => {
            if (loggedInUser?.uid) {
                try {
                    console.log(`${API_BASE_URL}/rentedProperties/${loggedInUser.uid}`);
                    const response = await fetch(`${API_BASE_URL}/rentedProperties/${loggedInUser.uid}`);
                    const data = await response.json();

                    console.log(data, "Fetched data");
                    let properties = [];
                    if (data) {
                        for (let a of data) {
                            try {
                                const res = await fetch(`${API_BASE_URL}/getPropertyById/${a.propertyId}`);
                                const propertyData = await res.json();

                                // Assuming the startDate can be obtained here or added directly
                                propertyData.startDate = moment(propertyData.startDate).format('YYYY-MM-DD')
                                properties.push(propertyData);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    setRentedProperties(properties);
                } catch (error) {
                    setError(error.message);
                }
            }
        };

        fetchRentalDetails();
    }, [loggedInUser]);

    const openPropertyDetail = (property) => {
        // Handle navigation or showing details
        Alert.alert('Property Details', `Details for ${property.propertyName}`);
    };

    return (
        <View style={styles.container}>
            {selectedProperty ? (
                // Handle showing selected property details
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>{selectedProperty.propertyName}</Text>
                    <Button title="Close" onPress={() => setSelectedProperty(null)} />
                </View>
            ) : (
                <View>
                    <Text style={styles.header}>Rented Properties</Text>
                    <FlatList
                        data={rentedProperties}
                        // keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                {item.images.length > 0 && (
                                    <Image
                                        source={{ uri: `data:${item.images[0].contentType};base64,${item.images[0].data}` }}
                                        style={styles.image}
                                    />
                                )}
                                <View style={styles.cardContent}>
                                    <Text style={styles.title}>{item.propertyName}</Text>
                                    <Text style={styles.price}>RS {item.price}/-</Text>
                                    <View style={styles.dateContainer}>
                                        <Icon name="calendar-outline" size={15} color="#000" />
                                        <Text style={styles.date}> {item.startDate}</Text>
                                    </View>

                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 120
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        elevation: 2,
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    cardContent: {
        flex: 1,
        marginLeft: 16, // Space between image and text
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textTransform: "capitalize"
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
    },
    detailsContainer: {
        padding: 16,
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    dateContainer: {
        flexDirection: "row"
    },

});

export default RentedProperties;
