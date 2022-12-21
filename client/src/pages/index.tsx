import { useEffect } from 'react';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import firebase from '../data/firebase';
import Header from '../components/common/Header';
import LandingPageTabs from '../components/landingPage/tabs/LandingPageTabs';

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
        <meta name='description' content='Street Perfomers Map' />
        <link rel='icon' href='/favicon.ico' />
      </Head>


      <Flex mx={['50px', '200px']} my='200px'>
        <LandingPageTabs />
      </Flex>
    </Box>
  );
}
