import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelectRole = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Role</Text>

            <TouchableOpacity
                style={[styles.button, styles.buttonAlt]}
                onPress={() => navigation.navigate('register')}
            >
                <Text style={styles.buttonText}>Owner</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonAlt]} // Apply additional style for the second button
                onPress={() => navigation.navigate('RentOutPropertyScreen')}
            >
                <Text style={styles.buttonText}>Tenant</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonAlt: {
        backgroundColor: '#bbe4e9', // Different color for the second button
    },
    buttonText: {
        color: '#00204a',
        fontSize: 16,
    }
});

export default SelectRole;
