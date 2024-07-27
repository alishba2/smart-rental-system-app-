import React, { useState, useContext } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../appContext';
import { loginWithEmailAndPassword } from '../../firebase'; // Import your custom function

const EmailPasswordLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const { updateLoggedIn, updateRole, setLoggedInUser } = useContext(AppContext);

    const handleLogin = async () => {
        const result = await loginWithEmailAndPassword(email, password);
        if (result) {
            console.log(result, "=================resultttttttttttttttttttt");
            Alert.alert('Success', 'Login successful!');
            Alert.alert(result.role);
            await AsyncStorage.setItem('isLoggedIn', 'true');
            setLoggedInUser(result);

            updateRole(result.role);

            updateLoggedIn();
            navigation.navigate('Home');
        } else {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const googleLogin = () => {
        navigation.navigate('googleLogin');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOG IN</Text>

            <View style={styles.bg}>
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
                {/* <TouchableOpacity style={styles.googleButton} onPress={googleLogin}>
                    <Text style={styles.googleButtonText}>Login with Google</Text>
                </TouchableOpacity> */}
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('register')}>
                    <Text style={styles.linkText}>Don't have an account? Register</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00204a',
        // paddingHorizontal: 30,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 50,
        color: "#005792",
        textTransform: "uppercase",
        color: "white",
        marginTop: 40,
        marginVertical: 20,
        letterSpacing: 7,
        marginLeft: 260

    },
    input: {
        height: 50,
        borderBottomColor: '#005792',
        borderBottomWidth: 1,
        marginBottom: 30,
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: '#ffc93c',
        paddingVertical: 16,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    googleButton: {
        backgroundColor: '#ff9a3c',
        paddingVertical: 16,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    googleButtonText: {
        color: 'black',
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
    bg: {
        backgroundColor: "#fff",
        padding: 30,
        margin: 0,
        borderTopStartRadius: 50,
        paddingBottom: 70,
        borderBottomRightRadius: 50,
    },
});

export default EmailPasswordLoginScreen;
