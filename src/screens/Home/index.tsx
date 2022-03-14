import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import $api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimated } from '../../components/LoadAnimated';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDatails', { car: car });
  }

  useEffect(() => {
    function fetchCars() {
      $api.get('/cars')
        .then(response => {
          setCars(response.data);
        }).finally(() => {
          setIsLoading(false);
        });
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />

          {!isLoading &&
            <TotalCars>Total de {cars.length} carros</TotalCars>
          }
        </HeaderContent>
      </Header>

      {
        isLoading
          ? <LoadAnimated />
          : <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <Car data={item} onPress={() => handleCarDetails(item)} />
            }
          />
      }
    </Container>
  );
}