import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRequestScreen = ({ navigation }) => {
  const [item, setItem] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [rewardPoints, setRewardPoints] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddRequest = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      const response = await axios.post('https://vitamesh-assignment.onrender.com/api/requests', {
        item,
        pickupAddress,
        dropoffAddress,
        rewardPoints: Number(rewardPoints),
        userId,
      });
      setSuccess('Request added successfully!');
      setError('');
      console.log('Request added:', response.data);

      setItem('');
      setPickupAddress('');
      setDropoffAddress('');
      setRewardPoints('');
    } catch (err) {
      setError('Failed to add request');
      setSuccess('');
      console.error('Add request error:', err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Request</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Pickup Address"
        value={pickupAddress}
        onChangeText={setPickupAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Dropoff Address"
        value={dropoffAddress}
        onChangeText={setDropoffAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Reward Points"
        keyboardType="numeric"
        value={rewardPoints}
        onChangeText={setRewardPoints}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddRequest}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: { backgroundColor: '#4caf50', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 10 },
  successText: { color: 'green', textAlign: 'center', marginBottom: 10 },
});

export default AddRequestScreen;
