import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { LoadAnimated } from '../../components/LoadAnimated';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';

import $api from '../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    function fetchCars() {
      $api.get('/schedules_byuser?user_id=1')
        .then(response => {
          setCars(response.data);
        })
        .catch((e) => {
          console.log(e)
          Alert.alert('Erro', 'Houve um erro ao buscar os carros');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />

        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      {
        isLoading
          ? <LoadAnimated />
          : <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car
                    data={item.car}
                  />

                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
      }
    </Container>
  );
}