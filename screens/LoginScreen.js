import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://vitamesh-assignment.onrender.com/api/auth/login', { email, password });
      console.log('Login successful:', response.data);
  
      const { token } = response.data;
  
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', response.data.userId);
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }], 
      });
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err.response?.data || err.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 30, fontWeight: '700', textAlign: 'center', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 30, color: '#666' },
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
  linkText: { textAlign: 'center', marginTop: 20, fontSize: 14, color: '#777' },
  link: { color: '#4caf50', fontWeight: '600' },
  errorText: { color: 'red', textAlign: 'center' },
});

export default LoginScreen;
