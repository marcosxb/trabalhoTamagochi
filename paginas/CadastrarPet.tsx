import React, { useEffect, useState } from 'react';
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

const CadastrarPet = ({ route, navigation } : any) => {
  const [nome, setNome] = useState('Pikachu');
  const { onGoBack, id } = route.params;

  const carregarTela = async () => {
    if(id) {
        const response = await axios.get(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`);
        setNome(response.data.name);
    }
  }

  useEffect(() => {
    carregarTela();
  }, [])

  const handlePost = async () => {
    try {

      if(!id) {
        await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet`, {
            name: nome,
        });
        Alert.alert('Cadastro Efetuado!');
      } else {
        await axios.put(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`, {
            name: nome,
        });
        Alert.alert('Cadastro Atualizado!');
      }
      
      onGoBack();
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <Container>
      <Text>Registro</Text>
      <Input
        placeholder="Nome"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
      <Button onPress={handlePost}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
    </Container>
  );
};

export default CadastrarPet;