import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CadastrarPet = ({ route, navigation }: any) => {
  const [nome, setNome] = useState('');
  const { onGoBack, id } = route.params;

  const carregarTela = async () => {
    if (id) {
      const response = await axios.get(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`);
      setNome(response.data.name);
    }
  };

  useEffect(() => {
    carregarTela();
  }, []);

  const handlePost = async () => {
    try {
      if (!id) {
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

      navigation.goBack();
      onGoBack();
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./../image/feliz1.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>Digite um nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome:"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Cadastrar / Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d2543',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#1caf9a',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: '#000000',
  },
  button: {
    backgroundColor: '#1caf9a',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CadastrarPet;
