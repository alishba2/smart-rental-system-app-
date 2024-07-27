import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './HomeScreenStyles'; // Import the styles from the new file
import Sidebar from './sidenavbar'; // Import the Sidebar component
import { API_BASE_URL } from '@env';

const HomeScreen = ({ navigation }) => {
    const [propertyData, setPropertyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false); // State to toggle sidebar

    useEffect(() => {
        const fetchLoginStatus = async () => {
            const status = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(status === 'true');
        };

        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/property`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setPropertyData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error fetching property data:', error);
                Alert.alert('Error', `Error fetching property data: ${error.message}`);
            }
        };

        fetchData();
        fetchLoginStatus();
    }, []);

    useEffect(() => {
        const filtered = propertyData.filter(property => {
            return (
                property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        setFilteredData(filtered);
    }, [searchQuery, propertyData]);

    const handleRentNowClick = (property) => {
        if (!isLoggedIn) {
            navigation.navigate('login');
        } else {
            Alert.alert('Rent Now', `Do you want to rent ${property.type}?`, [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => navigation.navigate('bookingForm', { propertyId: property._id, ownerId: property.ownerId }) },
            ]);
        }
    };

    const navigateToSingleProperty = (item) => {
        navigation.navigate('PropertyDetails', { propertyId: item._id });
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const closeSidebar = () => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={styles.container}>
                {/* Sidebar */}
                {sidebarVisible && <Sidebar navigation={navigation} />}

                {/* Toggle Sidebar Button */}
                {!sidebarVisible && (
                    <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
                        <Icon name="menu" size={30} color="#005792" />
                        <Text style={styles.Logo}>LEASE CONNECT</Text>

                    </TouchableOpacity>
                )}

                {/* Main Content */}
                <View style={styles.content}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by city, type, or description"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Property List */}
                    {filteredData.length === 0 ? (
                        <Text style={styles.noPropertyText}>No property found</Text>
                    ) : (
                        <FlatList
                            data={filteredData}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <View style={styles.propertyCard}>
                                    <TouchableOpacity onPress={() => navigateToSingleProperty(item)}>
                                        {item.images?.length > 0 && (
                                            <Image
                                                source={{ uri: `data:${item.images[0].contentType};base64,${item.images[0].data}` }}
                                                style={styles.propertyImage}
                                            />
                                        )}
                                    </TouchableOpacity>
                                    <View style={styles.cardDescription}>
                                        <View style={styles.descriptionContent}>
                                            <View style={styles.heading}>
                                                <>
                                                    <Text style={styles.propertyName}>{item.propertyName}</Text>
                                                    <Text style={styles.propertyPrice}>{item.price}/- Per Month</Text>
                                                </>
                                            </View>
                                            <View style={styles.propertyDetails}>
                                                <Icon name="location" size={15} color="#005792" />
                                                <Text style={styles.propertyLocation}>{item.location.city}</Text>
                                                <Text style={styles.propertyLocation}>| {item.areaSize} Marla</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;
