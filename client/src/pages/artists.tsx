import {
  Button,
  Center,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/common/Header';
import useAuth from '../data/useAuth';
import { getEnvironmentUrl } from '../data/utils';
import firebase from 'firebase/app';

// type ArtistsPageProps = {};

// const ArtistsPage: React.FC<ArtistsPageProps> = () => {
const ArtistsPage = () => {
  const { auth } = useAuth();

  const [performanceTitle, setPerformanceTitle] = useState<string>('');
  const [performanceTime, setPerformanceTime] = useState<string>('');

  async function addPerformance(
    auth: firebase.User | null,
    performanceTitle: string,
    performanceTime: string,
  ) {
    try {
      const token = await auth?.getIdToken();
      console.log(token, 'token');
      const url = getEnvironmentUrl();
      await fetch(`${url}performances/${auth?.uid}`, {
        method: 'POST',
        body: JSON.stringify({ performanceTitle, performanceTime }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log('error adding performance to user doc', error);
    }
  }

  return (
    <>
      <Flex bgColor='white' flexGrow={1} direction='column'>
        <Head>
          <title>Street Perfomers Map </title>
          <meta name='description' content='Street Perfomers Map' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Header />
        <Heading textAlign='center' mt='100px'>
          Enter Details of your Performance Artists!
        </Heading>
        <Center my='auto'>
          <chakra.form
            gap='4'
            onSubmit={async (event) => {
              console.log('clicked');
              event.preventDefault();
              await addPerformance(auth, performanceTitle, performanceTime);
            }}
            display='flex'
            alignSelf='stretch'
            flexDirection='column'
          >
            <FormControl
              // id='email'
              rounded='md'
            >
              <FormLabel>Enter Performance Title</FormLabel>
              <Input
                minW='300px'
                alignSelf='stretch'
                type='text'
                value={performanceTitle}
                onChange={(event) => setPerformanceTitle(event.target.value)}
                variant='outline'
                // placeholder={t('placeholder_email')}
                size='lg'
                isRequired
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </FormControl>
            <FormControl
              // id='password'
              rounded='md'
            >
              <FormLabel>Enter Performance Time</FormLabel>

              <Input
                minW='300px'
                value={performanceTime}
                onChange={(event) => setPerformanceTime(event.target.value)}
                variant='outline'
                size='lg'
                isRequired
                autoComplete='true'
                _focus={{
                  borderColor: 'secondary',
                }}
              />
            </FormControl>

            <Button
              color='white'
              size='lg'
              type='submit'
              pos='relative'
              minW='300px'
              variant='primary'
              bgColor='black'
            >
              Submit{' '}
            </Button>
          </chakra.form>
        </Center>
      </Flex>
      ;
    </>
  );
};
export default ArtistsPage;
