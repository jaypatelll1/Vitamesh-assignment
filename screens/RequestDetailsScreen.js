import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestDetailsScreen = ({ route }) => {
  const { request } = route.params;

  if (!request) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available for this request.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>
      <Text style={styles.detail}>Item: {request.item}</Text>
      <Text style={styles.detail}>Pickup Address: {request.pickupAddress}</Text>
      <Text style={styles.detail}>Dropoff Address: {request.dropoffAddress}</Text>
      <Text style={styles.detail}>Reward Points: {request.rewardPoints}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#333' },
  detail: { fontSize: 16, marginVertical: 10, color: '#555' },
  errorText: { color: 'red', textAlign: 'center', fontSize: 18, marginTop: 20 },
});

export default RequestDetailsScreen;
