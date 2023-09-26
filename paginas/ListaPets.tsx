
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import LogoutButton from '../App';
import styled from 'styled-components/native';
import axios from 'axios';

const Button = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const ContainerAnimal = styled.View`
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 80%;
    margin: 10%;
    background: gray;
    border-radius: 14px;
    justify-content: space-between;
`

const ContainerButtonAnimal = styled.TouchableOpacity`
    background: white;
    padding: 14px;
    margin-bottom: 10px;
`

const TitleAnimal = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: black;
`

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    <Button onPress={() => {
        navigation.navigate('CadastrarPet',{
            onGoBack: () => {
                carregarListaAnimais();
            }
        })
      }}>
        <ButtonText>Cadastrar PET</ButtonText>
      </Button>

      
    {loading == false && animals.length == 0 && <Text>Nenhum pet encontrado nesta conta</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={animals}
          style={{width:"100%"}}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <ContainerAnimal>
                
                <View>
                    <TitleAnimal>{item.name}</TitleAnimal>
                    <ContainerButtonAnimal style={{ marginTop: 20 }} onPress={() => navigation.navigate(`Brincar`, { id: item.id })} >
                        <TitleAnimal>Brincar</TitleAnimal>
                    </ContainerButtonAnimal>
                </View>
                

                <View>
                    <ContainerButtonAnimal onPress={() => {
                        navigation.navigate('CadastrarPet', {
                            id: item.id,
                            onGoBack: () => carregarListaAnimais(),
                        })
                    }} >
                        <TitleAnimal>Editar</TitleAnimal>
                    </ContainerButtonAnimal>
                    <ContainerButtonAnimal onPress={async () => {
                        await axios.delete(`https://tamagochiapi-clpsampedro.b4a.run/pet/${item.id}`)
                        carregarListaAnimais();
                    }} >
                        <TitleAnimal>Deletar</TitleAnimal>
                    </ContainerButtonAnimal>
                </View>
                

            </ContainerAnimal>
          )}
        />
      )}


    </View>
  );
};

export default ListaPets;
