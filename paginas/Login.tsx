import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
`;

const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const Login = ({ navigation } : any) => {
  const [email, setEmail] = useState('marcosxb@marcos.com.br');
  const [password, setPassword] = useState('12345678');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/login`, {
        email,
        password
      });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      navigation.navigate('ListaPets')
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <Container>
      <Text>Registro</Text>
      <Input
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button onPress={handleLogin}>
        <ButtonText>Login</ButtonText>
      </Button>

      <Button onPress={() => {
        navigation.navigate('Cadastro')
      }}>
        <ButtonText>Registrar-se</ButtonText>
      </Button>

    </Container>
  );
};

export default Login;