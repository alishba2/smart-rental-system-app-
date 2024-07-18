// EmailPasswordLoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const EmailPasswordLoginScreen = () => {
    const [email, setEmail] = useState('maryam.bsse4059@iiu.edu.pk');
    const [password, setPassword] = useState('qwerty');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Login successful!');
            navigation.navigate('Home');

        } catch (err) {
            setError(err.message);
        }
    };

    const googleLogin = () => {
        navigation.navigate('googleLogin');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOG IN</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} onPress={googleLogin}>
                <Text style={styles.googleButtonText}>Login with Google</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('register')}>
                <Text style={styles.linkText}>Don't have an account? Register</Text>
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
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderBottomColor: '#005792',
        borderBottomWidth: 1,
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
        fontSize: 18,
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
    error: {
        color: 'red',
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
});

export default EmailPasswordLoginScreen;
