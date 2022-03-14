import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
    color?: string;
}

interface ButtonTextProps {
    isLight: boolean;
}

export const Container = styled.View`
    width: 100%;
`;

export const ButtonContainer = styled(TouchableOpacity) <ButtonProps>`
    width: 100%;

    margin-bottom: 8px;
    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme, color }) => color
        ? color
        : theme.colors.main
    };
`;

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme, isLight }) => isLight
        ? theme.colors.header
        : theme.colors.button_color
    };
`;