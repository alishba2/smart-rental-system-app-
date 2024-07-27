import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation
import { API_BASE_URL } from '@env';
const { width: screenWidth } = Dimensions.get('window');

// Function to filter amenities
const filterAmenities = (amenities) => {
    const filtered = {};
    for (const category in amenities) {
        filtered[category] = {};
        for (const key in amenities[category]) {
            const value = amenities[category][key];
            if (value !== null && value !== 0 && value !== false && value !== "") {
                filtered[category][key] = value;
            }
        }
    }
    return filtered;
};

export default function PropertyDetails({ route }) {
    const { propertyId } = route.params;
    const [property, setProperty] = useState({});
    const [images, setImages] = useState([]);
    const [amenities, setAmenities] = useState({});
    const [region, setRegion] = useState({
        latitude: 33.738045,
        longitude: 73.084488,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [showFullDescription, setShowFullDescription] = useState(false);

    const navigation = useNavigation(); // Initialize useNavigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/getPropertyById/${propertyId}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();

                setProperty(data);

                // Extract images from property data
                const propertyImages = data?.images.map((image) => (
                    `data:${image.contentType};base64,${image.data}`
                ));
                setImages(propertyImages);

                // Update amenities state
                if (data?.amenities) {
                    const filteredAmenities = filterAmenities(JSON.parse(data.amenities));
                    setAmenities(filteredAmenities);
                }

                // Update map region based on property location
                if (data?.location) {
                    setRegion({
                        ...region,
                        latitude: data.location.lat,
                        longitude: data.location.lng,
                    });
                }
            } catch (error) {
                console.error("Error fetching property data:", error);
            }
        };

        fetchData();
    }, [propertyId]);

    const handleRentNowClick = () => {
        // Navigate to the BookingForm screen and pass propertyId as a parameter
        console.log("Rent Now clicked!");
        navigation.navigate('bookingForm', { propertyId });
    };


    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const descriptionText = showFullDescription ? property?.description : `${property?.description?.substring(0, 100)}...`;

    // Separate key-value pairs from other amenities
    const keyValuePairs = Object.entries(amenities).flatMap(([category, items]) =>
        Object.entries(items).filter(([key, value]) => typeof value !== 'boolean').map(([key, value]) => ({ key, value }))
    );

    const simpleAmenities = Object.entries(amenities).flatMap(([category, items]) =>
        Object.entries(items).filter(([key, value]) => typeof value === 'boolean').map(([key]) => ({ key }))
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
            >
                {images.map((image, index) => (
                    <View style={styles.carouselItem} key={index}>
                        <Image source={{ uri: image }} style={styles.carouselImage} />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.detailsContainer}>
                <Text style={styles.header}>{property?.propertyName}</Text>

                {/* Description Card */}
                <TouchableOpacity onPress={toggleDescription} style={styles.descriptionCard}>
                    <Text style={styles.cardContent}>{descriptionText}</Text>
                    <Icon
                        name={showFullDescription ? "expand-less" : "expand-more"}
                        size={24}
                        color="#007BFF"
                        style={styles.toggleIcon}
                    />
                </TouchableOpacity>

                {/* City and Address Cards */}
                <View style={styles.infoSection}>
                    <View style={styles.infoCard}>
                        <Icon name="location-city" size={24} color="#007BFF" style={styles.infoIcon} />
                        <Text style={styles.cardContent}>{property?.location?.city}</Text>
                    </View>
                    <View style={styles.infoCard}>
                        <Icon name="home" size={24} color="#007BFF" style={styles.infoIcon} />
                        <Text style={styles.cardContent}>{property?.location?.address}</Text>
                    </View>
                </View>

                <View style={styles.amenitiesSection}>
                    {/* Key-Value Pairs Card */}
                    <View style={styles.amenitiesCard}>
                        <Text style={styles.amenitiesHeader}>Amenities with Details</Text>
                        {keyValuePairs.map(({ key, value }) => (
                            <View style={styles.amenityItem} key={key}>
                                <Text style={styles.amenityKey}>{key}:</Text>
                                <Text style={styles.amenityValue}>{value.toString()}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Simple Amenities Card */}
                    <View style={styles.amenitiesCard}>
                        <Text style={styles.amenitiesHeader}>Simple Amenities</Text>
                        {simpleAmenities.map(({ key }) => (
                            <View style={styles.amenityItem} key={key}>
                                <Text style={styles.amenityText}>{key}</Text>
                                <Icon name="check-circle" size={20} color="#8dc6ff" style={styles.checkIcon} />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={region}
                        onRegionChangeComplete={setRegion}
                    >
                        <Marker
                            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                            title="Property Location"
                        />
                    </MapView>
                </View>

                <View style={styles.rentButtonContainer}>
                    <TouchableOpacity style={styles.rentBtn} onPress={handleRentNowClick}>
                        <Text style={styles.rentBtnText}>Rent Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 14,
        margin: 5,

    },
    carousel: {
        marginBottom: 16,
        marginTop: 100
    },
    carouselItem: {
        width: screenWidth,
        height: 300,
    },
    carouselImage: {
        width: '102%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: "capitalize",
        marginLeft: 7
    },
    descriptionCard: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        fontSize: 16,
        flex: 1,
    },
    toggleIcon: {
        marginLeft: 10,
    },
    infoSection: {
        marginBottom: 16,
    },
    infoCard: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        marginRight: 8,
    },
    amenitiesSection: {
        marginBottom: 16,
    },
    amenitiesCard: {
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    amenitiesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    amenityItem: {
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    amenityKey: {
        fontWeight: 'bold',
    },
    amenityValue: {
        fontSize: 16,
    },
    amenityText: {
        fontSize: 16,
    },
    checkIcon: {
        marginLeft: 10,
    },
    mapContainer: {
        height: 300,
        marginBottom: 16,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    rentButtonContainer: {
        marginTop: 20,
        marginBottom: 17
    },
    rentBtn: {
        backgroundColor: '#8dc6ff',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rentBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
