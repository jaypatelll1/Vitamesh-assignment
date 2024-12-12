import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.detail}>Name: John Doe</Text>
      <Text style={styles.detail}>Completed Deliveries: 5</Text>
      <Text style={styles.detail}>Earned Reward Points: 500</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#333' },
  detail: { fontSize: 16, marginVertical: 10, color: '#555' },
});

export default ProfileScreen;
