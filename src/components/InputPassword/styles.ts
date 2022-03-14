import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface HighlightProps {
    isFocused: boolean;
}

export const Container = styled.View`
    width: 100%;
    margin-bottom: 6px;
`;

export const InputContainer = styled.View`
    width: 100%;
    flex-direction: row;
`;

export const IconContainer = styled.View`
    width: 55px;
    height: 56px;
    justify-content: center;
    align-items: center;

    margin-right: 2px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled.TextInput`
    flex: 1;

    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    padding: 0 23px;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
    height: 56px;
    justify-content: center;
    align-items: center;

    padding: 0 16px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const Highlight = styled.View<HighlightProps>`
    width: 100%;
    border-bottom-width: 2px;
    border-color: ${({ theme, isFocused }) => isFocused
        ? theme.colors.main
        : 'transparent'
    };
`;