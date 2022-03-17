import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StatusBar } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import $database from '../../database';
import $api from '../../services/api';

import { Car as ModelCar } from '../../database/model/Car';

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
import { Button } from '../../components/Button';

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDatails', { car: car });
  }

  async function offlineSynchronize() {
    console.log('[  ] sincronizando...');

    await synchronize({
      database: $database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await $api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        if (user.updated.length > 0) {
          await $api.post('/users/sync', user);
        }
      },
    });

    console.log('[OK] sincronizado');

    await fetchCars();
  }

  async function fetchCars() {
    try {
      const carCollection = $database.get<ModelCar>('cars');
      const cars = await carCollection.query().fetch();

      setCars(cars);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchCars();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(useCallback(() => {
    const syncChanges = async () => {
      if (netInfo.isConnected && !synchronizing.current) {
        synchronizing.current = true;

        try {
          await offlineSynchronize();
        }
        catch (err) {
          console.log(err);
        }
        finally {
          synchronizing.current = false;
        }
      }
    }

    syncChanges();
  }, [netInfo.isConnected]));

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

      <Button title='Sincronizar' onPress={offlineSynchronize} />

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