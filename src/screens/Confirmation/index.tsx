import React, { useEffect } from 'react';
import { useWindowDimensions, StatusBar, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';

interface Params {
    title: string;
    message: string;
    nextScreenRoute: any;
}

export function Confirmation() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const route = useRoute();

    const {title, message, nextScreenRoute} = route.params as Params;

    function handleOK() {
        navigation.navigate(nextScreenRoute);
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        })
    }, []);

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor='transparent'
            />

            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>

                <Message>{message}</Message>
            </Content>

            <Footer>
                <ConfirmButton title='OK' onPress={handleOK} />
            </Footer>
        </Container>
    );
}