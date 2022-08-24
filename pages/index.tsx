import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Box } from '@chakra-ui/core';

const Home: NextPage = () => {
  return (
    <Box h="100vh" w="100vw" p="4" bg="red.100" display="flex">
      <Head>
        <title>Calllypso coding assignemt</title>
        <meta name="description" content="Calllypso coding assignemt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading mx="auto" my="auto">
        Welcome to callypso coding assignment
      </Heading>
    </Box>
  );
};

export default Home;
