import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from './appContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Sidebar = ({ navigation }) => {
    const { isLoggedIn, role } = useContext(AppContext);
    const [selected, setSelected] = useState(null);

    const handleNavigation = (route) => {
        setSelected(route);
        navigation.navigate(route);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Menu</Text>
            <TouchableOpacity
                style={[styles.menuItem, selected === 'Home' && styles.selected]}
                onPress={() => handleNavigation('Home')}
            >
                <Icon name="home-outline" size={24} color={selected === 'Home' ? '#005792' : '#000'} />
                <Text style={[styles.menuText, selected === 'Home' && styles.selectedText]}>Home</Text>
            </TouchableOpacity>

            {isLoggedIn ? (
                <>
                    {role === 'owner' && (
                        <>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'AddProperty' && styles.selected]}
                                onPress={() => handleNavigation('AddProperty')}
                            >
                                <Icon name="add-circle-outline" size={24} color={selected === 'AddProperty' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'AddProperty' && styles.selectedText]}>Add Property</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'Properties' && styles.selected]}
                                onPress={() => handleNavigation('Properties')}
                            >
                                <Icon name="list-outline" size={24} color={selected === 'Properties' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'Properties' && styles.selectedText]}>Properties</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'Notifications' && styles.selected]}
                                onPress={() => handleNavigation('Notifications')}
                            >
                                <Icon name="notifications-outline" size={24} color={selected === 'Notifications' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'Notifications' && styles.selectedText]}>Notifications</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'Profile' && styles.selected]}
                                onPress={() => handleNavigation('Profile')}
                            >
                                <Icon name="person-outline" size={24} color={selected === 'Profile' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'Profile' && styles.selectedText]}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'login' && styles.selected]}
                                onPress={() => handleNavigation('login')}
                            >
                                <Icon name="log-in-outline" size={24} color={selected === 'login' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'login' && styles.selectedText]}>Log out</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {role === 'tenant' && (
                        <>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'rentedProperties' && styles.selected]}
                                onPress={() => handleNavigation('rentedProperties')}
                            >
                                <Icon name="home-outline" size={24} color={selected === 'rentedProperties' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'rentedProperties' && styles.selectedText]}>Rented Properties</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'Notifications' && styles.selected]}
                                onPress={() => handleNavigation('Notifications')}
                            >
                                <Icon name="notifications-outline" size={24} color={selected === 'Notifications' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'Notifications' && styles.selectedText]}>Notifications</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'Profile' && styles.selected]}
                                onPress={() => handleNavigation('Profile')}
                            >
                                <Icon name="person-outline" size={24} color={selected === 'Profile' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'Profile' && styles.selectedText]}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItem, selected === 'login' && styles.selected]}
                                onPress={() => handleNavigation('login')}
                            >
                                <Icon name="log-in-outline" size={24} color={selected === 'login' ? '#005792' : '#000'} />
                                <Text style={[styles.menuText, selected === 'login' && styles.selectedText]}>Log out</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            ) : (
                <>
                    <TouchableOpacity
                        style={[styles.menuItem, selected === 'AboutUs' && styles.selected]}
                        onPress={() => handleNavigation('AboutUs')}
                    >
                        <Icon name="information-circle-outline" size={24} color={selected === 'AboutUs' ? '#005792' : '#000'} />
                        <Text style={[styles.menuText, selected === 'AboutUs' && styles.selectedText]}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, selected === 'ContactUs' && styles.selected]}
                        onPress={() => handleNavigation('ContactUs')}
                    >
                        <Icon name="mail-outline" size={24} color={selected === 'ContactUs' ? '#005792' : '#000'} />
                        <Text style={[styles.menuText, selected === 'ContactUs' && styles.selectedText]}>Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.menuItem, selected === 'login' && styles.selected]}
                        onPress={() => handleNavigation('login')}
                    >
                        <Icon name="log-in-outline" size={24} color={selected === 'login' ? '#005792' : '#000'} />
                        <Text style={[styles.menuText, selected === 'login' && styles.selectedText]}>Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        width: 250,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        zIndex: 2, // Ensure sidebar is above the content
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    menuText: {
        fontSize: 18,
        marginLeft: 10,
    },
    selected: {
        backgroundColor: '#f0f0f0',
    },
    selectedText: {
        color: '#005792',
    },
});

export default Sidebar;
