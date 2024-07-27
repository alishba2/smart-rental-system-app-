import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

const SplashScreen = ({ navigation }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress < 1) {
                    return oldProgress + 0.01;
                } else {
                    clearInterval(interval);
                    navigation.replace('OnboardingScreen');
                    return oldProgress;
                }
            });
        }, 30); // Update progress every 30ms

        // Cleanup the timer on component unmount
        return () => clearInterval(interval);
    }, [navigation]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <Progress.Bar progress={progress} width={200} color="#007bff" borderRadius={5} />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d5def5',
    },
});

export default SplashScreen;
