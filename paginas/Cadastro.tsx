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

const Cadastro = ({ navigation } : any) => {
  const [email, setEmail] = useState('marcosxb@marcos.com.br');
  const [password, setPassword] = useState('12345678');
  const [confirmPassword, setConfirmPassword] = useState('12345678');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('As senhas não coincidem!');
      return;
    }

    try {
      // Armazenar os dados no AsyncStorage
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/register`, {
        email,
        password
      });
      Alert.alert('Registro bem-sucedido!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Este email ja esta cadastrado')
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
      <Input
        placeholder="Confirme a Senha"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      <Button onPress={handleRegister}>
        <ButtonText>Registrar</ButtonText>
      </Button>
    </Container>
  );
};

export default Cadastro;