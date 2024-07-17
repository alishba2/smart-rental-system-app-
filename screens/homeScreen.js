// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Icon } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [propertyData, setPropertyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/property');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPropertyData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const filtered = propertyData.filter(property => {
            return (
                property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        setFilteredData(filtered);
    };

    const handleRentNowClick = (property) => {
        Alert.alert('Rent Now', `Do you want to rent ${property.type}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: () => navigation.navigate('BookingForm', { propertyId: property._id, ownerId: property.ownerId }) },
        ]);
    };

    const navigateToSingleProperty = (item) => {
        navigation.navigate('PropertyDetails', { propertyId: item._id });
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by city, type, or description"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button title="Search" onPress={handleSearch} color="#5585b5" />
            </View>

            {/* Property List */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.propertyCard}>
                        <TouchableOpacity onPress={() => navigateToSingleProperty(item)}>
                            {item.images.length > 0 && (
                                <Image
                                    source={{ uri: `data:${item.images[0].contentType};base64,${item.images[0].data}` }}
                                    style={styles.propertyImage}
                                />
                            )}
                        </TouchableOpacity>
                        <View style={styles.cardDescription}>
                            <View style={styles.descriptionContent}>
                                <Text style={styles.propertyType}>{item.type}</Text>
                                <Text style={styles.propertyDescription}>{item.description}</Text>
                                <TouchableOpacity style={styles.rentNowButton} onPress={() => handleRentNowClick(item)}>
                                    <Text style={styles.rentNowText}>Rent Now +</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.propertyDetails}>
                                <Icon name="location-pin" size={24} color="#005792" />
                                <Text style={styles.propertyLocation}>{item.location.city}</Text>
                                <Text style={styles.propertyPrice}>${item.price}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginTop: 60
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 3,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    propertyCard: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 15,
        elevation: 3,
    },
    propertyImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    cardDescription: {
        padding: 10,
    },
    descriptionContent: {
        marginBottom: 10,
    },
    propertyType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005792',
    },
    propertyDescription: {
        marginVertical: 5,
        color: '#333',
    },
    rentNowButton: {
        backgroundColor: '#5585b5',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    rentNowText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    propertyDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    propertyLocation: {
        marginLeft: 5,
        color: '#005792',
    },
    propertyPrice: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#005792',
    },
});

export default HomeScreen;
