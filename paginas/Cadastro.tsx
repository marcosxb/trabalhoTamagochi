import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// declaração que armazena email e a senha fornecida pelo usuario
const Cadastro = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


    // valida se as duas senhas são iguais
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('As senhas não coincidem!');
      return;
    }
        // Esse try armazena senha e email no Async e solicita o registro para a API
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      await axios.post(
        `https://tamagochiapi-clpsampedro.b4a.run/register`,
        {
          email,
          password,
        }
      );
      // Alertas para informar se foi ou não realizado o cadastro
      Alert.alert('Registro bem-sucedido!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Email cadastrado ou dados invalidos!');
    }
  };
      // Conteiner principal, "tenho que estilizar melhor"
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registro</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Confirme a Senha:"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
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
  card: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#313030',
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cadastro;
