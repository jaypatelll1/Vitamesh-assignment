import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('No token found, please log in.');
          return;
        }

        const response = await axios.get('https://vitamesh-assignment.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch profile data');
        console.error('Error fetching profile:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.profileText}>Name: {user.name}</Text>
      <Text style={styles.profileText}>Email: {user.email}</Text>
      <Text style={styles.profileText}>Reward Points: {user.rewardPoints}</Text>
      <Text style={styles.profileText}>Completed Deliveries: {user.completedDeliveries}</Text>

      <Button title="Log out" onPress={handleLogout} />
    </View>
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#333' },
  profileText: { fontSize: 16, marginVertical: 10, color: '#555' },
  errorText: { color: 'red', textAlign: 'center', fontSize: 18, marginTop: 20 },
  loadingText: { textAlign: 'center', fontSize: 18, color: '#777' },
});

export default ProfileScreen;
