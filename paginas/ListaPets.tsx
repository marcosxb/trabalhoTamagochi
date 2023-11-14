
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LogoutButton from '../App';
import axios from 'axios';


const ListaPets = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);

  const carregarListaAnimais = async () =>{ 

    setLoading(true);
    const response = await axios.get('https://tamagochiapi-clpsampedro.b4a.run/pets');
    setAnimals(response.data?.pets || []);
    setLoading(false);

  }
  useEffect(() => {
    carregarListaAnimais();}, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate('CadastrarPet',{
          onGoBack: () => {
              carregarListaAnimais();
      },
      });
    }}
    >
      <Text style={styles.buttonText}>Cadastrar PET</Text>
    </TouchableOpacity> 

      
    {loading == false && animals.length == 0 && <Text>Nenhum Pet foi cadastrado ainda</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={animals}
          style={{width: '100%' }}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
              <View style={styles.containerAnimal}>
                  <Image
                   source={require('./../image/feliz1.jpg')}
                   style={styles.image}
                   />
                    <View style={styles.infoContainer}>
                    <Text style={styles.titleAnimal}>{item.name}</Text>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                     style={styles.buttonAnimal}
                        onPress={() => navigation.navigate(`Brincar`, { id: item.id} )}
                    >
                    <Text style={styles.buttonText}>Brincar</Text>
                    </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonAnimal}
                  onPress={() => {
                    navigation.navigate('CadastrarPet', {
                      id: item.id,
                      onGoBack: () => carregarListaAnimais(),
                    });
                  }}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonAnimal}
                  onPress={async () => {
                    await axios.delete(`https://tamagochiapi-clpsampedro.b4a.run/pet/${item.id}`);
                    carregarListaAnimais();
                  }}
                >
                  <Text style={styles.buttonText}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View> 
            </View>              
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d2543'
  },
  button: {
    backgroundColor: '#1caf9a',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  containerAnimal: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    margin: '1%',
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonAnimal: {
    backgroundColor: '#1caf9a',
    padding: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  titleAnimal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 125,
  },
});

export default ListaPets;