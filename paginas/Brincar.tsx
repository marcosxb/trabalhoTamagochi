import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Stats = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const StatText = styled.Text`
  margin-right: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Brincar = ({ route }: any) => {
  const [pet, setPet] = useState<any | null>(null)
  const { onGoBack, id } = route.params;

  const carregarTela = async () => {
    if(id) {
        const response = await axios.get(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`);
        setPet(response.data);
    }
  }

  useEffect(() => {
    carregarTela();
  }, [])

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
    <Container>
      <Heading>Tamagotchi</Heading>
      <Stats>
        {pet && <StatText>Hunger: {pet.foodLevel}%</StatText>}
        {pet && <StatText>Happiness: {pet.funLevel}%</StatText>}
        {pet && <StatText>Energy: {pet.restLevel}%</StatText>}

      </Stats>
      <ButtonContainer>
        <Button title="Brincar" onPress={handlePlay} />
        <Button title="Alimentar" onPress={handleFeed} />
        <Button title="Descansar" onPress={handleRest} />
      </ButtonContainer>
    </Container>
  );
};

export default Brincar;