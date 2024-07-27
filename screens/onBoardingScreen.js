import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import img1 from "../assets/house.png";
import img2 from "../assets/splash1.png";
import home from "../assets/welcome.png";
import Search from "../assets/SearchProperty.png";

const { width } = Dimensions.get('window');

const onboardingData = [
    {
        text: "Welcome!",
        image: home,
        description: "Explore the features of the app and see how it can help you manage your properties efficiently.",
    },
    {
        text: "Search Properties",
        image: Search,
        description: "Join us and experience the convenience of our app. Start managing your properties better today!",
    },
    {
        text: "Manage Properties",
        image: img2,
        description: "Keep track of all your properties and tenants in one place. Organize your rental business with ease.",
    },
    {
        text: "Track Payments",
        image: img1,
        description: "Monitor rent payments and tenant requests effortlessly. Stay on top of your rental transactions.",
    },

];

const OnboardingScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.replace('selectRole');
        }
    };

    const handleSkip = () => {
        navigation.replace('selectRole');
    };

    return (
        <View style={styles.container}>
            <Image
                source={onboardingData[currentIndex].image}
                style={styles.image}
            />
            <Text style={styles.text}>{onboardingData[currentIndex].text}</Text>
            <Text style={styles.description}>{onboardingData[currentIndex].description}</Text>
            <View style={styles.indicatorsContainer}>
                {onboardingData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentIndex === index && styles.activeIndicator
                        ]}
                    />
                ))}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>{currentIndex < onboardingData.length - 1 ? 'Next' : 'Get Started'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    image: {
        width: width * 0.8,
        height: width * 0.8 * 0.8, // Adjust height as needed
        marginBottom: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
    },
    description: {
        fontSize: 19,
        textAlign: 'center',
        color: '#666',
        marginHorizontal: 20,
        marginBottom: 40,
        lineHeight: 26,
    },
    indicatorsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
        marginVertical: 10

    },
    activeIndicator: {
        backgroundColor: '#606470',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    skipButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    skipButtonText: {
        color: '#007bff',
        fontSize: 16,
    },
    nextButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffc93c',
        borderRadius: 5,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default OnboardingScreen;
