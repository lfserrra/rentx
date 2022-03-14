import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    width: ${((Dimensions.get('window').width - 48) / 3) - 5.33}px;
    height: 92px;
    
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background_primary};

    margin-bottom: 8px;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(13)}px;
`