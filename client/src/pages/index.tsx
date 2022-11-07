import { useEffect } from 'react';
import Head from 'next/head';
import {
  Heading,
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Flex,
  Center,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import Header from '../components/Header';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
      }
    });
  }, [router]);

  return (
    <Box
      h='100vh'
      w='100vw'
      bg='white'
      display='flex'
      flexDirection='column'
      backgroundImage='./images/backgroundimage.jpeg'
    >
      <Head>
        <title>Street Perfomers Map </title>
        <meta name='description' content='Calllypso coding assignemt' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <Flex mx={['50px', '200px']} my='200px'>
        <Tabs
          isFitted
          variant='line'
          height='500px'
          width='500px'
          bg='white'
          borderRadius='20px'
          p='3'
        >
          <TabList mb='1em' height='100px'>
            <Tab>
              <Heading size='md'>Artists</Heading>
            </Tab>
            <Tab>
              <Heading size='md'>Music Lovers</Heading>
            </Tab>
            <Tab>
              <Heading size='md'>Events</Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex flexGrow={1} direction='column'>
                <Stack spacing='30px'>
                  <Heading>
                    Post your Peformance on the App and Make Money!
                  </Heading>
                  <Text>Yes without a doubt you will be making Money!</Text>
                  <Flex>
                    <Button
                      variant='primary'
                      size='lg'
                      color='white'
                      bg='black'
                    >
                      Make Money
                    </Button>
                  </Flex>
                </Stack>
              </Flex>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
}
