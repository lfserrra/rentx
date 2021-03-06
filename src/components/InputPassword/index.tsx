import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    InputContainer,
    IconContainer,
    InputText,
    ChangePasswordVisibilityButton,
    Highlight
} from './styles';


interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function InputPassword({ iconName, value, ...rest }: Props) {
    const theme = useTheme();

    const [isPasswordHide, setIsPasswordHide] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    function handlePasswordVisibilityChange() {
        setIsPasswordHide(prevState => !prevState);
    }

    return (
        <Container>
            <InputContainer>
                <IconContainer>
                    <Feather
                        name={iconName}
                        size={24}
                        color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
                    />
                </IconContainer>

                <InputText
                    {...rest}
                    secureTextEntry={isPasswordHide}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    autoCorrect={false}
                />

                <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
                    <Feather
                        name={isPasswordHide ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </ChangePasswordVisibilityButton>
            </InputContainer>

            <Highlight isFocused={isFocused} />
        </Container>
    );
}