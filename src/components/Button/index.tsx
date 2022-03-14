import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import {
    Container,
    ButtonContainer,
    Title
} from './styles';

interface Props {
    title: string;
    color?: string;
    enabled?: boolean;
    isLoading?: boolean;
    isLight?: boolean;
    onPress: () => void;
}

export function Button({ title, color, enabled = true, isLoading = false, isLight = false, onPress }: Props) {
    const theme = useTheme();

    return (
        <Container style={{ opacity: enabled && !isLoading ? 1 : .5 }}>
            <ButtonContainer
                color={color}
                onPress={onPress}
                disabled={!enabled}
            >
                {isLoading
                    ? <ActivityIndicator color={theme.colors.button_color} />
                    : <Title isLight={isLight}>{title}</Title>
                }
            </ButtonContainer>
        </Container>
    );
}