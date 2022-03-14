import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { parseISO, format } from 'date-fns';

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../Utils/getAccessoryIcon';
import $api from '../../services/api';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';

interface Params {
  car: CarDTO,
  dates: string[]
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = dates.length * car.price;
  const rentPeriod = dates.length > 1 ? 'diárias' : 'diária';

  async function handleConfirmRental() {
    setIsLoading(true);

    try {
      const carUrl = `/schedules_bycars/${car.id}`;
      const response = await $api.get(carUrl);

      const unavailable_dates = [
        ...response.data.unavailable_dates,
        ...dates
      ];

      await $api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: rentalPeriod.start,
        endDate: rentalPeriod.end,
      });

      await $api.put(carUrl, {
        id: car.id,
        unavailable_dates
      });

      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute: 'Home',
      })
    } catch (e) {
      setIsLoading(false);

      Alert.alert('Erro', 'Não foi possível finalizar o agendamento!');
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(parseISO(dates[0]), 'dd/MM/yyyy'),
      end: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy'),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))

          }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.button_color}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} {rentPeriod}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title='Alugar Agora'
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!isLoading}
          isLoading={isLoading}
        />
      </Footer>
    </Container>
  );
}