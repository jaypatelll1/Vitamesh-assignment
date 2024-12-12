import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddRequestScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Delivery Request</Text>
      <TextInput style={styles.input} placeholder="Item Name" />
      <TextInput style={styles.input} placeholder="Pickup Address" />
      <TextInput style={styles.input} placeholder="Drop-off Address" />
      <TextInput style={styles.input} placeholder="Reward Points" />
      <Button title="Add Request" onPress={() => alert('Request Added')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default AddRequestScreen;
