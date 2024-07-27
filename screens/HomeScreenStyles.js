// HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
        marginTop: 100,
        position: 'relative',

    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 3,
        marginTop: 30
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    propertyCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 15,
        elevation: 3,
        marginTop: 50,

    },
    propertyName: {
        fontSize: 15,
        textTransform: 'capitalize',
        paddingTop: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
    propertyImage: {
        width: '100%',
        height: 250,
        borderRadius: 20

    },
    cardDescription: {
        padding: 10,
    },
    descriptionContent: {
        marginBottom: 10,
    },
    propertyType: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#005792',
    },
    propertyDescription: {
        marginVertical: 5,
        color: '#333',
    },
    rentNowButton: {
        backgroundColor: '#5585b5',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    rentNowText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    propertyDetails: {
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 10

    },
    propertyLocation: {
        marginLeft: 5,
        color: '#005792',
        textTransform: "capitalize",
        fontSize: 14,
        marginBottom: 10,
        paddingTop: 10
    },
    propertyPrice: {
        marginLeft: 10,
        fontWeight: 'bold',
        // color: '#005792',
        marginTop: 15,
        fontSize: 18
    },
    menuButton: {
        position: 'absolute',
        top: -10,
        left: 20,
        zIndex: 3, // Ensure it's on top
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    Logo: {

        fontSize: 25,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    sideBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 250,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        zIndex: 2, // Ensure it's below the menu button
    },
    content: {
        flex: 1,
        padding: 10,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default styles;
