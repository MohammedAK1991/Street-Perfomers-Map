import React from 'react';
import { useLoadScript } from '@react-google-maps/api';

import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import LandingPageMap from '../components/landingPage/mapStuffs/LandingPageMap';
import Head from 'next/head';
// type landingpageProps = {

// };

export default function LandingPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded)
    return (
      <Center mx='auto' my='auto'>
        <Spinner size='xl' />
      </Center>
    );

  console.log('isLoaded', isLoaded);
  console.log('loadError', loadError);

  return (
    <>
      <Head>
        <title>Street Perfomers Map </title>
        <meta name='description' content='Street Perfomers Map' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction={['column-reverse', 'column-reverse', 'row']}>
        <Flex width={['100%', '100%', '200px']} direction='column' px='2'>
          <Text fontWeight='bold'>Todys Events!!!</Text>
          <br />
          Covent Garden
          <br />
          Trafalgar Square
          <br />
          Piccadilly Circus
          <br />
          Leicester Square
          <br />
          Oxford Circus
          <br />
          Tottenham Court Road
          <br />
        </Flex>
        <Flex
          overflow='hidden'
          //  width='100%' height='100%'
        >
          {isLoaded && <LandingPageMap isLoaded={isLoaded} />}
        </Flex>
      </Flex>
    </>
  );
}
