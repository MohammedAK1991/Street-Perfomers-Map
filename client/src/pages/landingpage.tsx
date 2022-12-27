import React from 'react';
import { useLoadScript } from '@react-google-maps/api';

import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import LandingPageMap from '../components/landingPage/mapStuffs/LandingPageMap';
import Head from 'next/head';
import { useAllPerformances } from '../data/allPerformances';
// type landingpageProps = {

// };

export default function LandingPage() {
  const { allPerformances, loading, error, mutate } = useAllPerformances();

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

  return (
    <>
      <Head>
        <title>Street Perfomers Map </title>
        <meta name='description' content='Street Perfomers Map' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction={['column', 'column', 'row']}>
        <Flex width={['100%', '100%', '300px']} px='2' direction='column'>
          <Text fontWeight='bold'>Todys Events!!!</Text>
          {allPerformances?.map((performance) => {
            return <Flex key={Math.random()}>{performance.performance}</Flex>;
          })}
        </Flex>
        <Flex
          ml={['0', '0', '50px']}
          overflow={['visible', 'visible', 'hidden']}
        >
          {isLoaded && <LandingPageMap isLoaded={isLoaded} />}
        </Flex>
      </Flex>
    </>
  );
}
