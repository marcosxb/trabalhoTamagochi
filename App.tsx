import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, useColorScheme, View, Button, TextInput, Alert,} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cadastro from './paginas/Cadastro';
import Login from './paginas/Login';
import ListaPets from './paginas/ListaPets';
import CadastrarPet from './paginas/CadastrarPet';
import Brincar from './paginas/Brincar';


const Stack = createNativeStackNavigator();

axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela de acesso" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="ListaPets" component={ListaPets} options={{ headerBackVisible: false }} />
        <Stack.Screen name="CadastrarPet" component={CadastrarPet} />
        <Stack.Screen name="Brincar" component={Brincar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LogoutButton: React.FC<{ navigation: any}> = ({ navigation }) => {
  const handleLogout = async () => {
    try{
      await AsyncStorage.removeItem('token');

      navigation.navigate('Login');
    }catch (erro) {
      console.error('Erro ao fazer logout:');
    }
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

