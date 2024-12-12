


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetching profile data directly, no need for JWT token now
        const response = await axios.get('https://vitamesh-assignment.onrender.com/api/users/profile');
        
        if (response.data) {
          setUser(response.data);
        }
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

      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>Name:</Text>
        <Text style={styles.profileValue}>{user.name}</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>Email:</Text>
        <Text style={styles.profileValue}>{user.email}</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>Reward Points:</Text>
        <Text style={styles.profileValue}>{user.rewardPoints}</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>Completed Deliveries:</Text>
        <Text style={styles.profileValue}>{user.completedDeliveries}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );

  // Handle user logout
  const handleLogout = () => {
    // Here you can add logic to clear user session or token, if you're storing one
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileInfo: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  profileValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;
