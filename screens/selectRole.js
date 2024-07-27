import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import build from "../assets/buid.png"; // Image to be placed above content

const { height, width } = Dimensions.get('window');

const SelectRole = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Image placed at the top */}
            <Image source={build} style={styles.image} resizeMode="cover" />

            {/* Content area */}
            <View style={styles.content}>
                {/* Sign In Button */}
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Continue Without Sign In Text */}
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Continue Without Sign In</Text>
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
        backgroundColor: 'white', // Background color of the container
    },
    image: {
        width: '100%',
        height: height * 0.5, // Adjusted height based on preference
        marginBottom: 20, // Space between image and content
        marginTop: 120
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    continueButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100, // Rounded corners for button
        backgroundColor: '#fdb44b', // Background color
        marginVertical: 10,
        shadowColor: '#000', // Shadow effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Elevation for Android
        paddingVertical: 15,
        paddingHorizontal: 50
    },
    buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: "uppercase",
        textAlign: 'center',
    },
});

export default SelectRole;
