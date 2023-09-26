import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para fazer fazer o processo de login
  const handleLogin = async () => {
    try {
      // Utilizando o axios para fazer um post na API  com as credenciais de login
      const response = await axios.post(
        `https://tamagochiapi-clpsampedro.b4a.run/login`,
        {
          email,
          password,
        }
      );
      // Extrai o token de autenticação da resposta da API
      const token = response.data.token;
      // Armazena o token para no AsyncStorage
      await AsyncStorage.setItem('token', token);
      //Se o Login for bem sucedido, navega para a tela "ListaPets"
      navigation.navigate('ListaPets');
      // Retorna em caso de erro na hora de autenticar
    } catch (error) {
      Alert.alert('Erro! Email ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email:"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha:"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => {
            navigation.navigate('Cadastro');
          }}
        >
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d2543',
  },
  content: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#1caf9a',
    marginTop: 10,
  },
});

export default Login;
