// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigation = useNavigation();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('Registration successful!');
            setError('');
        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTER</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} >
                <Text style={styles.googleButtonText}>Register with Google</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {success ? <Text style={styles.success}>{success}</Text> : null}
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('login')}>
                <Text style={styles.linkText}>Already have an account? Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        padding: 25,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 24,
        color: "#005792",
        // textAlign: 'center',
    },
    input: {
        height: 50,
        borderBottomColor: '#005792',
        borderBottomWidth: 1,  // Adds only the bottom border
        marginBottom: 30,
        paddingHorizontal: 12,
        // backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#5585b5',
        paddingVertical: 16,  // Increased height
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,  // Increased font size for better readability
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 12,
    },
    success: {
        color: 'green',
        textAlign: 'center',
        marginTop: 12,
    },
    link: {
        marginTop: 16,
        alignItems: 'center',
    },
    linkText: {
        color: '#5585b5',
        fontSize: 16,
    },
    googleButton: {
        backgroundColor: '#ff9a3c',  // Google blue
        paddingVertical: 16,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    googleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default RegisterScreen;
