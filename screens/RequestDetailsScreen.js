import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestDetailsScreen = ({ route }) => {
  const { request } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>
      <Text style={styles.detail}>Item: {request.item}</Text>
      <Text style={styles.detail}>Location: {request.location}</Text>
      <Text style={styles.detail}>Reward Points: {request.points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#333' },
  detail: { fontSize: 16, marginVertical: 10, color: '#555' },
});

export default RequestDetailsScreen;
