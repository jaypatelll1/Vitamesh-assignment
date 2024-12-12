import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const DashboardScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/requests');
        setRequests(response.data);
      } catch (err) {
        setError('Failed to load requests');
        console.error('Dashboard fetch error:', err.response?.data || err.message);
      }
    };
    fetchRequests();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Requests</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RequestDetails', { request: item })}
          >
            <Text style={styles.cardTitle}>{item.item}</Text>
            <Text style={styles.cardSubtitle}>Location: {item.pickupAddress}</Text>
            <Text style={styles.cardSubtitle}>Reward: {item.rewardPoints} points</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#333' },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#4caf50' },
  cardSubtitle: { fontSize: 14, color: '#555', marginTop: 5 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
});

export default DashboardScreen;