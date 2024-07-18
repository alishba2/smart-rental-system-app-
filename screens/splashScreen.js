import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        // Automatically navigate to 'selectRole' after 3 seconds
        const timer = setTimeout(() => {
            navigation.replace('selectRole');
            // navigation.replace('property');
        }, 3000); // 3000 milliseconds = 3 seconds

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/home.png')} // Replace with your image path
                    style={styles.image}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5585b5',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default SplashScreen;
