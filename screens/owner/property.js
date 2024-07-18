import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
// r
export default function Property() {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/property`);
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 600);

    fetchData();

    return () => clearTimeout(timer);
  }, [loading]);

  const handlePropertyClick = (index) => {
    setSelectedPropertyIndex(index);
  };

  const handleRequest = (index) => {
    setShowRequests(true);
    setSelectedPropertyIndex(index);
  };

  return (
    <View style={styles.container}>
      {showRequests ? (
        <Requests
          property={properties[selectedPropertyIndex]}
          onClose={() => setSelectedPropertyIndex(null)}
        />
      ) : (
        <>
          {selectedPropertyIndex !== null && !showRequests ? (
            <>
              {properties[selectedPropertyIndex].status === 'reserved' ? (
                <PropertyDetailOwner
                  property={properties[selectedPropertyIndex]}
                  onClose={() => setSelectedPropertyIndex(null)}
                />
              ) : (
                <EditProperty
                  property={properties[selectedPropertyIndex]}
                  onClose={() => setSelectedPropertyIndex(null)}
                />
              )}
            </>
          ) : (
            <ScrollView contentContainerStyle={styles.propertyContainer}>
              <Text style={styles.header}>Added Properties</Text>
              {loading ? (
                <ActivityIndicator size="large" color="#222831" />
              ) : (
                <>
                  {properties.length === 0 ? (
                    <Text>No properties added yet.</Text>
                  ) : (
                    properties.map((property, index) => (
                      <View key={index} style={styles.propertyBox}>
                        <TouchableOpacity onPress={() => handlePropertyClick(index)}>
                          <View style={styles.propertyImage}>
                            {property.images.length > 0 ? (
                              <Image
                                source={{ uri: `data:${property.images[0].contentType};base64,${property.images[0].data}` }}
                                style={styles.image}
                              />
                            ) : (
                              <Text>No image data found for this property.</Text>
                            )}
                          </View>
                          <View style={styles.propertyDescription}>
                            <Text style={styles.propertyName}>{property.propertyName}</Text>
                            <Text>Rent amount: {property.price}/-</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moreInfoButton} onPress={() => handlePropertyClick(index)}>
                          <Text style={styles.moreInfoText}>{property.status === 'reserved' ? 'Details' : 'Edit'}</Text>
                        </TouchableOpacity>
                        {property.status === 'reserved' && (
                          <Text style={[styles.propertyStatus, { backgroundColor: 'green' }]}>
                            {property.status}
                          </Text>
                        )}
                        {property.status === "free" && (
                          <TouchableOpacity style={styles.requestButton} onPress={() => handleRequest(index)}>
                            <Text>Show Requests</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  )}
                </>
              )}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  propertyContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  propertyBox: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  propertyImage: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  propertyDescription: {
    alignItems: 'center',
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreInfoButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  moreInfoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  propertyStatus: {
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
  },
  requestButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    alignItems: 'center',
  },
});
