import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import { CarDTO } from '../../dtos/CarDTO';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer
} from './styles';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO
}

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        });
    }

    function handleBack() {
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            const startTmp = start;

            start = end;
            end = startTmp;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        setRentalPeriod({
            startFormatted: format(parseISO(start.dateString), 'dd/MM/yyyy'),
            endFormatted: format(parseISO(end.dateString), 'dd/MM/yyyy'),
        });
    }

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

                <RentalPeriod>
                    <DateInfo selected={!!rentalPeriod.startFormatted}>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo selected={!!rentalPeriod.endFormatted}>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button
                    title={!!rentalPeriod.startFormatted ? 'Continuar' : 'Selecione as datas do aluguel'}
                    onPress={handleConfirmRental}
                    enabled={!!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    );
}