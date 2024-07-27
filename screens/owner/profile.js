import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Button,
    StyleSheet,
    Alert,
    View,
    Modal
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
    const navigation = useNavigation();

    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        contactNumber: "123456789",
        email: "johndoe@example.com",
    });
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        contactNumber: false,
    });
    const [isEditModalVisible, setEditModalVisible] = useState(false);

    const handleChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = () => {
        handleUpload();

        const validationErrors = {
            firstName: !formData.firstName,
            lastName: !formData.lastName,
            contactNumber: !formData.contactNumber,
        };

        setErrors(validationErrors);

        if (Object.values(validationErrors).some((error) => error)) {
            return; // Exit early if there are validation errors
        }

        Alert.alert("Success", "Changes Saved Successfully");
        setEditModalVisible(false);
        getUserData();
    };

    const handleCancel = () => {
        setFormData(userData);
        setEditModalVisible(false);
    };

    const getUserData = async () => {
        const data = {
            firstName: "John",
            lastName: "Doe",
            contactNumber: "123456789",
            email: "johndoe@example.com",
        }; // Dummy data for user data

        setUserData(data);
        setFormData({
            firstName: data?.firstName,
            lastName: data?.lastName,
            contactNumber: data?.contactNumber,
            email: data?.email,
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (selectedImage) {
            const imageUrl = "dummyImageUrl"; // Dummy URL for uploaded image
            Alert.alert("Success", "Image uploaded successfully");
            setPreviewImage(imageUrl);
        } else {
            Alert.alert("Error", "No Image selected!");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const SignOut = () => {
        navigation.navigate("Login"); // Assuming you have a 'Login' screen in your navigation stack
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBackground}>
                <Image
                    source={previewImage ? { uri: previewImage } : require("../../assets/profile.png")} // Dummy profile image
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{formData.firstName} {formData.lastName}</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.cardRow}>
                    <Icon name="user" size={20} color="#007cb9" />
                    <Text style={styles.label}> {formData.firstName}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Icon name="user" size={20} color="#007cb9" />
                    <Text style={styles.label}> {formData.lastName}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Icon name="envelope" size={20} color="#007cb9" />
                    <Text style={styles.label}> {formData.email}</Text>
                </View>
                <View style={styles.cardRow}>
                    <Icon name="phone" size={20} color="#007cb9" />
                    <Text style={styles.label}>{formData.contactNumber}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
                    {/* <Icon name="pencil" size={20} color="#fff" /> */}
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={isEditModalVisible}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <Image
                    source={previewImage ? { uri: previewImage } : require("../../assets/profile.png")} // Dummy profile image
                    style={styles.editProfileImage}
                />
                <View style={styles.modalContent}>
                    <Text style={styles.label}>FIRST NAME</Text>
                    <TextInput
                        style={styles.input}
                        name="firstName"
                        value={formData.firstName}
                        onChangeText={(value) => handleChange("firstName", value)}
                    />
                    {errors.firstName && (
                        <Text style={styles.errorText}>Firstname is required</Text>
                    )}

                    <Text style={styles.label}>LAST NAME</Text>
                    <TextInput
                        style={styles.input}
                        name="lastName"
                        value={formData.lastName}
                        onChangeText={(value) => handleChange("lastName", value)}
                    />
                    {errors.lastName && (
                        <Text style={styles.errorText}>Lastname is required</Text>
                    )}

                    <Text style={styles.label}>CONTACT NUMBER</Text>
                    <TextInput
                        style={styles.input}
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChangeText={(value) => handleChange("contactNumber", value)}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
                            <Text style={styles.saveText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBackground: {
        backgroundColor: '#007cb9',
        height: 340,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    profileImage: {
        width: 250,
        height: 250,
        borderRadius: 50,
        // marginBottom: 10,
    },
    profileName: {
        fontSize: 27,
        fontWeight: 'bold',
        color: 'white',
    },
    card: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: "rgba(167, 188, 185, 0.3)", // Use RGBA for background color with opacity
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
    },
    modalContent: {
        flex: 1,
        // justifyContent: 'center',
        padding: 20,

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        rowGap: 14,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center text horizontally
        backgroundColor: '#007cb9',
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    editText: {
        color: 'white',
        marginLeft: 5,
        textAlign: "center", // Center text horizontally
    },
    cancelText: {
        color: 'black',
        marginLeft: 5,
        textAlign: "center", // Center text horizontally
    },
    saveText: {
        color: 'white',
        marginLeft: 5,
        textAlign: "center", // Center text horizontally
    },
    cancelButton: {
        backgroundColor: '#f2f2f2', // Red color for cancel button
        padding: 14,
        borderRadius: 25,
        marginRight: 10, // Space between cancel and save button
    },
    saveButton: {
        backgroundColor: '#007cb9', // Green color for save button
        padding: 14,
        borderRadius: 25,
    },
    editProfileImage: {
        width: 250,
        height: 250,
        borderRadius: 50,
        marginLeft: 80,
        marginTop: 20
    }
});


export default Profile;
