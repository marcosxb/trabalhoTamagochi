import React, { useEffect, useState } from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface Pet {
  foodLevel: number;
  funLevel: number;
  restLevel: number;
}

interface RouteParams {
  onGoBack: () => void;
  id: string;
}

const Brincar: React.FC<{ route: { params: RouteParams } }> = ({ route }) => {
  const [pet, setPet] = useState<Pet | null>(null);
  const { onGoBack, id } = route.params;

  const carregarTela = async () => {
    if (id) {
      const response = await axios.get(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`);
      setPet(response.data);
    }
  };

  useEffect(() => {
    carregarTela();
  }, []);

  const handlePlay = async () => {
    const response = await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/play`);
    setPet(response.data);
  };

  const handleFeed = async () => {
    const response = await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/food`);
    setPet(response.data);
  };

  const handleRest = async () => {
    const response = await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/rest`);
    setPet(response.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tamagotchi</Text>
      <Image
        source={getPetImage()} // Chama a função getPetImage para obter a imagem apropriada
        style={styles.petImage}
      />

      <View style={styles.stats}>
        {pet && <Text style={styles.statText}>Alimentação: {pet.foodLevel.toFixed(2)}%</Text>}  
      </View>
      <View style={styles.stats}>
        {pet && <Text style={styles.statText}>Felicidade: {pet.funLevel.toFixed(2)}%</Text>}
      </View>
      <View style={styles.stats}>
        {pet && <Text style={styles.statText}>Energia: {pet.restLevel.toFixed(2)}%</Text>}
      </View>
      

      <View style={styles.buttonAnimal}>
        <Button title="Alimentar" onPress={handleFeed} />
        <Button title="Brincar" onPress={handlePlay} />
        <Button title="Descansar" onPress={handleRest} />
      </View>
    </View>
  );
  function getPetImage() {
    if (pet) {
      if (pet.funLevel >= 100) {
        return require('./../image/1.jpg');
      } else if (pet.funLevel >= 95) {
        return require('./../image/2.jpg');
      } else if (pet.funLevel >= 85) {
        return require('./../image/3.jpg');
      } else {
        return require('./../image/4.png');
      }
    }

    
    return require('./../image/4.png');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d2543',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1caf9a',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statText: {
    marginRight: 10,
    fontSize: 20,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  petImage:{
    width: 300,
    height: 300,
    borderRadius: 0,
    marginBottom: 50,
  },
  buttonAnimal:{
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
 
  },
});

export default Brincar;
