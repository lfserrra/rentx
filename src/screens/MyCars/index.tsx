import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { LoadAnimated } from '../../components/LoadAnimated';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

import { Car as ModelCar } from '../../database/model/Car';

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

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();
  const screenIsFocus = useIsFocused();

  const [cars, setCars] = useState<DataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    function fetchCars() {
      $api.get('/rentals')
        .then(response => {
          const carFormatted = response.data.map((data: DataProps) => {
            return {
              id: data.id,
              car: data.car,
              start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
              end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
            }
          });

          setCars(carFormatted);
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
  }, [screenIsFocus]);

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
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.end_date}</CarFooterDate>
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