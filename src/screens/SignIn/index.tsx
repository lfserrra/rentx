import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Footer
} from './styles';

export function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),

      password: Yup.string()
        .required('A senha é obrigatória')
    });

    try {
      await schema.validate({ email, password })
      Alert.alert('ok');

      signIn({ email, password });
      
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('erro', error.message);
      } else {
        Alert.alert('Ocorreu um erro na autenticação');
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUp01Step');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <Title>
              Estamos{'\n'}
              quase lá.
            </Title>

            <Subtitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />

            <InputPassword
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              isLoading={false}
            />

            <Button
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              isLoading={false}
              isLight
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}