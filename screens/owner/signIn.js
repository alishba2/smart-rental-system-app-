import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Picker } from '@react-native-picker/picker'; // Import Picker component
import { registerWithEmailAndPassword } from '../../firebase'; // Import your custom function
import { Picker } from '@react-native-picker/picker';
const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('tenant'); // Default role
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigation = useNavigation();

    const handleRegister = async () => {
        const result = await registerWithEmailAndPassword(email, password, confirmPassword, firstName, lastName, role, '');
        if (result) {
            setSuccess('Registration successful! Please verify your email.');
            setError('');
        } else {
            setError('Registration failed. Please check your details and try again.');
            setSuccess('');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>REGISTER</Text>

            <View style={styles.bg}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={role}
                        style={styles.picker}
                        onValueChange={(itemValue) => setRole(itemValue)}
                    >
                        <Picker.Item label="Tenant" value="tenant" />
                        <Picker.Item label="Owner" value="owner" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                {success ? <Text style={styles.success}>{success}</Text> : null}
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('login')}>
                    <Text style={styles.linkText}>Already have an account? Log In</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#00204a',
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
        marginLeft: 200

        // textAlign: 'center'
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
        textTransform: "capitalize",
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
    bg: {
        backgroundColor: "#fff",
        padding: 30,
        margin: 0,
        borderTopStartRadius: 50,
        paddingBottom: 70,
        borderBottomRightRadius: 50,
    },
    pickerContainer: {
        borderBottomColor: '#005792',
        borderBottomWidth: 1,
        marginBottom: 30,
    },
    picker: {
        height: 50,
        width: '100%',
    }
});

export default RegisterScreen;
