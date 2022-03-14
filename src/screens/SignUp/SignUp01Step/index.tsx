import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';

export function SignUp01Step() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicence] = useState('');

  function handleBack() {
    navigation.goBack();
  }

  async function handleNexStep() {
    const schema = Yup.object().shape({
      driverLicense: Yup.string()
        .required('CNH é obrigatória'),

      email: Yup.string()
        .required('E-mail obrigatório')
        .email('E-mail inválido'),

      name: Yup.string()
        .required('Nome é obrigatório')

    });

    const data = { name, email, driverLicense }

    try {
      await schema.validate(data);

      navigation.navigate('SignUp02Step', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }

  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDriverLicence}
              value={driverLicense}
            />
          </Form>

          <Button title='Próximo' onPress={handleNexStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}